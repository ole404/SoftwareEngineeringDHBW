import Express, { Request, Response } from 'express';
import { query, param, validationResult, check, body } from 'express-validator';

import { Tree } from '../Schemas/treeSchema';
import { calculateNewElo } from '../services/eloLogic';
import { Treecognition } from '../services/treecognition';
import { TreeStorage } from '../services/treeStorage';

//Creating a router for the express api
const router = Express.Router();

//get api either getting all trees or as many trees as the query parameter specifies
router.get('/', async (req: Request, res: Response) => {
  query('max').isInt().optional();
  const numberOfTrees: string = req.query.max as string;
  const max = parseInt(numberOfTrees);
  //if the query parameter is empty, all trees are returned
  if (max == 0 || numberOfTrees == null) {
    const trees = await TreeStorage.getInstance().getAllTrees();
    res.json(trees);
    // else only the specified amount of trees are returned
  } else {
    const trees = await TreeStorage.getInstance().getTopTrees(max);
    res.json(trees);
  }
});

//get api returning two randwom trees
router.get('/random', async (req: Request, res: Response) => {
  const trees = await TreeStorage.getInstance().getTwoRandomTrees();
  res.send(trees);
});

//get api returning the tree specified by its id
router.get('/:treeId', async (req: Request, res: Response) => {
  param('treeId').isMongoId();
  const tree = await TreeStorage.getInstance().oneTree(req.params.treeId);
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  res.send(tree);
});

//get api only returning the image of the tree specified by the id
router.get('/image/:treeId', async (req: Request, res: Response) => {
  param('treeId').isMongoId();
  if (!validationResult(req).isEmpty()) {
    return res.status(400).json('Invalid treeId');
  }
  const tree = (await TreeStorage.getInstance().oneTree(
    req.params.treeId
  )) as Tree;
  res.contentType('png');
  const image = Buffer.from(tree.image, 'base64');

  //converting the base64 tree image into an png
  res.writeHead(200, {
    'Content-Type': 'image/png',
    'Content-Length': image.length,
  });
  res.end(image);
});

//post api changing the elo scores of the trees specified
router.post('/vote', async (req: Request, res: Response) => {
  query('loserId').isMongoId();
  query('winnerId').isMongoId();
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const loserId: string = req.query.loserId as string;
  const winnerId: string = req.query.winnerId as string;

  //getting the specified trees info from the database
  const looserTree: Tree | null = await TreeStorage.getInstance().oneTree(
    loserId
  );
  const winnerTree: Tree | null = await TreeStorage.getInstance().oneTree(
    winnerId
  );
  if (looserTree == null || winnerTree == null) {
    return res.status(400).json({ errors: [{ msg: 'Tree not found' }] });
  }
  //calculating the new elo score
  const { newEloWinnerTree, newEloLooserTree } = calculateNewElo(
    winnerTree.eloRating,
    looserTree.eloRating
  );
  TreeStorage.getInstance().updateScore(winnerId, newEloWinnerTree);
  TreeStorage.getInstance().updateScore(loserId, newEloLooserTree);

  res.send(200);
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
    const tree: Tree = req.body as Tree;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array().map((val: validationResult) => ({
          msg: val.msg,
          location: val.location,
          param: val.param,
        })),
      });
    }
    await TreeStorage.getInstance().insertTree(tree);
    res.send(200);
  }
);

export default router;
