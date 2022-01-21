import Express, { Request, Response } from 'express';
import { query, param, validationResult } from 'express-validator';
import { calculateNewElo } from './EloService';
import { Tree } from './Schemas/treeSchema';

import { TreeService } from './TreeService';
const router = Express.Router();

router.get('/tree/:treeId', async (req: Request, res: Response) => {
  param('treeId').isMongoId();
  const tree = await TreeService.getInstance().oneTree(req.params.treeId);
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  res.send(tree);
});



router.post('/vote', async (req: Request, res: Response) => {
  query('loserId').isMongoId();
  query('winnerId').isMongoId();
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const loserId: string = req.query.loserId as string;
  const winnerId: string = req.query.winnerId as string;

  const looserTree: Tree | null = await TreeService.getInstance().oneTree(
    loserId
  );
  const winnerTree: Tree | null = await TreeService.getInstance().oneTree(
    winnerId
  );
  if (looserTree == null || winnerTree == null) {
    return res.status(400).json({ errors: [{ msg: 'Tree not found' }] });
  }
  const { newEloWinnerTree, newEloLooserTree } = calculateNewElo(
    winnerTree.eloRating,
    looserTree.eloRating
  );
  TreeService.getInstance().updateScore(winnerId, newEloWinnerTree);
  TreeService.getInstance().updateScore(loserId, newEloLooserTree);

  res.send(200);
});
export default router;
