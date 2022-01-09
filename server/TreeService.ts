import mongoose, { Document, Query } from 'mongoose';
import { Tree, treeModel } from './Schemas/treeSchema';

class TreeService {
  databaseUri: string;
  /**
   * Constructor of the TreeService class
   *
   * @param databaseUri - The URI of our database
   */
  constructor(databaseUri: string) {
    this.databaseUri = databaseUri;
  }
  /**
   * Connects to our MongoDB database
   */
  async connectDb() {
    await mongoose.connect(this.databaseUri);
  }
  /**
   * Inserts a tree object into the database
   *
   * @param tree - The tree id to be added
   */
  async insertTree(tree: Tree) {
    await treeModel.create(tree);
  }
  /**
   * Deletes a tree from the database
   *
   * @param treeIdToDelete - The tree id to be deleted
   */
  async deleteTree(treeIdToDelete: string) {
    await treeModel.deleteOne({ _id: treeIdToDelete }, function (err: Error) {
      if (err) throw err;
      console.log('Tree deleted');
    });
  }
  /**
   * Updates the ELO-Ranking of a tree in the database
   *
   * @param treeIdToUpdate - The tree id to be updated
   * @param newScore - The new ELO-Ranking of the tree
   */
  async updateScore(treeIdToUpdate: string, newScore: number) {
    await treeModel.updateOne(
      { _id: treeIdToUpdate },
      { eloRating: newScore },
      function (err: Error) {
        if (err) throw err;
        console.log('Elo-Rating updated');
      }
    );
  }
  /**
   * Returns all trees in the database
   *
   * @returns All trees of the database in an array
   */
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
  /**
   * Returns two random trees from the database
   *
   * @returns Two random trees from the database
   */
  async getTwoRandomTrees(): Promise<{
    tree1: Tree | null;
    tree2: Tree | null;
  }> {
    // A random tree is taken out of the first and second half of the database to ensure uniqueness
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
  /**
   * Returns a specific single tree from the database
   *
   * @param treeId - The id of the tree to be return from the database
   * @returns A tree object
   */
  async oneTree(treeId: string): Promise<Tree | null> {
    return await treeModel.findById(treeId);
  }
  /**
   * Returns the ten trees with the highest ELO-Ratings
   *
   * @returns Ten tree objects as an array
   */
  async getTopTenTrees(): Promise<Tree[]> {
    const topTrees = await treeModel.find().sort('-eloRating').limit(10);
    return topTrees;
  }
}
