import Express, { Request, Response } from 'express';
import { query, param, validationResult, check, body } from 'express-validator';

import { Tree, NewTree } from './interfaces';
import { calculateNewElo } from '../services/eloLogic';
import { Treecognition } from '../services/treecognition';
import { TreeStorage } from '../services/treeStorage';

//Creating a router for the express api
const router = Express.Router();

const storage = TreeStorage.getInstance();

//get api either getting all trees or as many trees as the query parameter specifies
router.get(
  '/many',
  query('max').isInt().optional(),
  async (req: Request, res: Response) => {
    const numberOfTrees = req.query.max as string;
    const max = parseInt(numberOfTrees);
    //if the query parameter is empty, all trees are returned
    if (max == 0 || numberOfTrees == null) {
      const trees = await storage.getAllTrees();
      res.json(trees);
      // else only the specified amount of trees are returned
    } else {
      const trees = await storage.getTopTrees(max);
      res.json(trees);
    }
  }
);

//get api returning two randwom trees
router.get('/random', async (req: Request, res: Response) => {
  const trees = await storage.getTwoRandomTrees();
  res.json(trees);
});

//get api only returning the image of the tree specified by the id
router.get(
  '/image/:treeId',
  param('treeId').isMongoId(),
  async (req: Request, res: Response) => {
    console.log(`Params looks like ${req.params.treeId}`);
    console.log('was successful');
    if (!validationResult(req).isEmpty()) {
      return res.status(400).json('Invalid treeId');
    }
    console.log('I go so far');
    const tree = (await storage.oneTree(req.params.treeId)) as Tree;
    console.log('And got so far now!');
    res.contentType('jpeg');
    const image = Buffer.from(tree.image, 'base64');

    //converting the base64 tree image into a png
    res.writeHead(200, { 'Content-Length': image.length });
    res.end(image);
  }
);

//get api returning the tree specified by its id
router.get(
  '/single/:treeId',
  param('treeId').isMongoId(),
  async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json('Invalid treeId');
    const tree = await storage.oneTree(req.params.treeId);
    res.json(tree);
  }
);

//post api changing the elo scores of the trees specified
router.post('/vote', async (req: Request, res: Response) => {
  query('loserId').isMongoId();
  query('winnerId').isMongoId();
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const loserId = req.query.loserId as string;
  const winnerId = req.query.winnerId as string;

  //getting the specified trees info from the database
  const looserTree = await storage.oneTree(loserId);
  const winnerTree = await storage.oneTree(winnerId);
  if (looserTree == null || winnerTree == null) {
    return res.sendStatus(400).json({ errors: [{ msg: 'Tree not found' }] });
  }
  //calculating the new elo score
  const { newEloWinnerTree, newEloLooserTree } = calculateNewElo(
    winnerTree.eloRating,
    looserTree.eloRating
  );
  storage.updateScore(winnerId, newEloWinnerTree);
  storage.updateScore(loserId, newEloLooserTree);

  res.sendStatus(200);
});

//post api uploading a new tree to the database
router.post(
  '/upload',
  [
    body('treeName').isString(),
    body('userName').isString(),
    check('image').isBase64().bail(),
    check('image').custom(async (value: string) => {
      //checking wether the image to be uploaded is actually a tree
      const treeValidator = new Treecognition('gcloud.json');
      const isTree = await treeValidator.checkForTree(value);
      if (!isTree) {
        throw new Error('Not a tree');
      }
    }),
    check('geo.lat').isFloat(),
    check('geo.lon').isFloat(),
  ],
  async (req: Request, res: Response) => {
    const tree = req.body as NewTree;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.sendStatus(400).json({
        errors: errors.array().map((val) => ({
          msg: val.msg,
          location: val.location,
          param: val.param,
        })),
      });
    }
    await storage.insertTree(tree);
    res.sendStatus(200);
  }
);

export default router;
