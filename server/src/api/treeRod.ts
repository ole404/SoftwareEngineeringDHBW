import Express, { Request, Response } from 'express';
import { query, param, validationResult, check, body } from 'express-validator';

import { Tree, NewTree } from './interfaces';
import { calculateNewElo } from '../services/eloLogic';
import { Treecognition } from '../services/treecognition';
import { Forest } from '../services/forest';

//Creating a router for the express api
const router = Express.Router();

const storage = Forest.getInstance();

//get api either getting all trees or as many trees as the query parameter specifies
router.get(
  '/many',
  query('max').isInt().optional(),
  async (req: Request, res: Response<Tree[]>) => {
    const max = parseInt(req.query.max as string) || 0;
    //if the query parameter is empty, all trees are returned
    if (max === 0) {
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
router.get(
  '/random',
  async (req: Request, res: Response<{ treeLeft: Tree; treeRight: Tree }>) => {
    const trees = await storage.getTwoRandomTrees().catch(() => {
      res.sendStatus(579);
      return null;
    });
    if (!trees) return;

    res.json(trees);
  }
);

//get api only returning the image of the tree specified by the id
router.get(
  '/image/:treeId',
  param('treeId').isMongoId(),
  async (req: Request, res: Response<Buffer>) => {
    if (!validationResult(req).isEmpty()) return res.sendStatus(400);

    const image = await storage.oneImage(req.params.treeId).catch(() => {
      res.sendStatus(400);
      return null;
    });
    if (!image) return;
    const buffer = Buffer.from(image, 'base64');

    //converting the base64 tree image into a png
    res.contentType('jpeg');
    res.writeHead(200, { 'Content-Length': buffer.length });
    res.end(buffer);
  }
);

//get api returning the tree specified by its id
router.get(
  '/single/:treeId',
  param('treeId').isMongoId(),
  async (req: Request, res: Response<Tree>) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.sendStatus(400);
    const tree = await storage.oneTree(req.params.treeId).catch(() => {
      res.sendStatus(400);
      return null;
    });
    if (!tree) return;
    res.json(tree);
  }
);

//post api changing the elo scores of the trees specified
router.post(
  '/vote',
  [query('loserId').isMongoId(), query('winnerId').isMongoId()],
  async (req: Request, res: Response) => {
    const errors = validationResult(req);
    let looserTree: Tree;
    let winnerTree: Tree;

    if (!errors.isEmpty())
      return res.status(400).json({ errors: errors.array() });

    const loserId = req.query.loserId as string;
    const winnerId = req.query.winnerId as string;

    //getting the specified trees info from the database
    try {
      looserTree = await storage.oneTree(loserId);
      winnerTree = await storage.oneTree(winnerId);
    } catch {
      return res.sendStatus(400);
    }
    //calculating the new elo score
    const { newEloWinnerTree, newEloLooserTree } = calculateNewElo(
      winnerTree.eloRating,
      looserTree.eloRating
    );
    try {
      storage.updateScore(winnerId, newEloWinnerTree);
      storage.updateScore(loserId, newEloLooserTree);
    } catch {
      return res.sendStatus(400);
    }

    res.sendStatus(200);
  }
);

//post api uploading a new tree to the database
router.post(
  '/upload',
  [
    body('treeName').isString(),
    body('userName').isString(),
    check('image').isBase64().bail(),
    check('geo.lat').isFloat(),
    check('geo.lon').isFloat(),
  ],
  async (req: Request, res: Response) => {
    const tree = req.body as NewTree;
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res.status(400).json({
        errors: errors.array().map((val) => ({
          msg: val.msg,
          location: val.location,
          param: val.param,
        })),
      });
    //checking wether the image to be uploaded is actually a tree
    const treeValidator = new Treecognition('gcloud.json');
    const isTree = await treeValidator.checkForTree(tree.image);
    if (!isTree) {
      return res.status(489).send('Not a Tree');
    }
    await storage.insertTree(tree);
    res.sendStatus(200);
  }
);

export default router;
