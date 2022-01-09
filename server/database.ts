import mongoose, { model } from 'mongoose';
import { treeSchema, Tree } from './Schemas/treeSchema';
class database {
  databaseUri: string;
  treeModel: any;

  constructor(databaseUri: string) {
    this.databaseUri = databaseUri;
    this.treeModel = model<Tree>('Tree', treeSchema);
  }

  async connectDb() {
    await mongoose.connect('mongodb://localhost:27017/test');
  }

  async insertTree(tree: Tree) {
    const newTree = new this.treeModel(tree);
    await newTree.save(function (err: Error) {
      if (err) return err;
    });
  }

  async deleteTree(TreeIdToDelete: string) {
    await this.treeModel.deleteOne(
      { treeId: TreeIdToDelete },
      function (err: Error) {
        if (err) return err;
      }
    );
  }

  async updateScore(treeIdToUpdate: string, newScore: number) {
    await this.treeModel.updateOne(
      { treeId: treeIdToUpdate },
      { eloRating: newScore },
      function (err: Error) {
        if (err) return err;
      }
    );
  }

  async getTree(TreeIdToFind: string): Promise<Tree> {
    const soughtTree = await this.treeModel.findById(TreeIdToFind).exec();
    return soughtTree;
  }
}
