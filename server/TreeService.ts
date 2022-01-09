import mongoose, { Document, model, Query } from 'mongoose';
import { Tree, treeModel } from './Schemas/treeSchema';

class TreeService {
  databaseUri: string;

  constructor(databaseUri: string) {
    this.databaseUri = databaseUri;
  }

  async connectDb() {
    await mongoose.connect(this.databaseUri);
  }

  async insertTree(tree: Tree) {
    await treeModel.create(tree);
  }

  async deleteTree(TreeIdToDelete: string) {
    await treeModel.deleteOne(
      { treeId: TreeIdToDelete },
      function (err: Error) {
        if (err) throw err;
        console.log('Tree deleted');
      }
    );
  }

  async updateScore(treeIdToUpdate: string, newScore: number) {
    await treeModel.updateOne(
      { treeId: treeIdToUpdate },
      { eloRating: newScore },
      function (err: Error) {
        if (err) throw err;
        console.log('Elo-Rating updated');
      }
    );
  }

  async getAllTrees(): Promise<Tree[]> {
    const soughtTrees = await treeModel.find(function (
      err: Error,
      soughtTrees: Query<any, Document<Tree>>
    ) {
      if (err) throw err;
      console.log('Trees found.');
      return soughtTrees.exec();
    });
    return soughtTrees;
  }

  async getTwoRandomTrees(): Promise<{
    tree1: Tree | null;
    tree2: Tree | null;
  }> {
    const treeAmount: number = await treeModel.count();
    const treeNumber1 = Math.floor(
      (Math.random() * treeAmount) % (treeAmount / 2)
    );
    const treeNumber2 = Math.floor(
      ((Math.random() * treeAmount) % (treeAmount / 2)) + treeAmount / 2
    );
    const tree1: Tree | null = await treeModel
      .findOne()
      .limit(-1)
      .skip(treeNumber1);
    const tree2: Tree | null = await treeModel
      .findOne()
      .limit(-1)
      .skip(treeNumber2);
    return { tree1, tree2 };
  }

  async oneTree(treeId: string): Promise<Tree | null> {
    return await treeModel.findById(treeId);
  }

  async getTopTenTrees(): Promise<Tree[]> {
    const topTrees = await treeModel.find().sort('-eloRating').limit(10);
    return topTrees;
  }
}
