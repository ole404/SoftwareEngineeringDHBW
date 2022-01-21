import Express from 'express';
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

export default router;
