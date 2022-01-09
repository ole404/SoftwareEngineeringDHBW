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
    await newTree.save();
  }

  async updateScore(treeId: string, newScore: number) {
    await this.treeModel.findByIdAndUpdate(treeId, { eloRating: newScore });
  }
}
