import Express, { Request, Response } from 'express';
import { query, param, validationResult } from 'express-validator';
import { calculateNewElo } from './EloService';
import { Tree } from './Schemas/treeSchema';
import { WinningTree } from './interfaces/WinningTree';
import TreeService from './TreeService';
const router = Express.Router();

router.get('/tree/:treeId', async (req: Request, res: Response) => {
  param('treeId').isMongoId();
  const tree = await TreeService.oneTree(req.params.treeId);
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  res.send(tree);
});

router.post('/vote', async (req: Request, res: Response) => {
  query('loserId').isMongoId();
  query('winnerId').isMongoId();
  res.status(400).json({ errors: validationResult(req).array() });

  const looserTree: Tree = await TreeService.oneTree(req.query.loserId);
  const winnerTree: Tree = await TreeService.oneTree(req.query.winnerId);

  const { newEloWinnerTree, newEloLooserTree } = calculateNewElo(
    winnerTree.eloRating,
    looserTree.eloRating
  );
  TreeService.updateScore(req.query.winnerId, newEloWinnerTree);
  TreeService.updateScore(req.query.loserId, newEloLooserTree);

  res.send(200);
});
export default router;
