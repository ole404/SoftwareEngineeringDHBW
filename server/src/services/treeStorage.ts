import mongoose from 'mongoose';
import { Tree, treeModel } from '../Schemas/treeSchema';

export class TreeStorage {
  private static instance: TreeStorage;

  public static async initInstance(databaseUri: string): Promise<TreeStorage> {
    if (this.instance === undefined) {
      this.instance = new TreeStorage(databaseUri);
      await this.instance.connectDb();
      return this.instance;
    } else return this.instance;
  }
  public static getInstance(): TreeStorage {
    return this.instance;
  }

  databaseUri: string;
  /**
   * Constructor of the TreeStorage class
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
    tree.eloRating = 1000;
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
    return await treeModel.find({});
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
    const trees = await treeModel.find({ $sample: { size: 2 } });
    return { tree1: trees[0], tree2: trees[1] };
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
   * Returns the trees with the highest ELO-Ratings
   *
   * @param numberOfTrees - The number of trees to be returned
   * @returns Ten tree objects as an array
   */
  async getTopTrees(numberOfTrees: number): Promise<Tree[]> {
    const topTrees = await treeModel
      .find()
      .sort('-eloRating')
      .limit(numberOfTrees);
    return topTrees;
  }
}