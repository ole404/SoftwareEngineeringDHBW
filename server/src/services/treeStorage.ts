import mongoose from 'mongoose';
import { treeModel } from '../Schemas/treeSchema';
import { NewTree, Tree } from '../api/interfaces';

export class TreeStorage {
  private static instance: TreeStorage;
  databaseUri: string | undefined;
  connection: typeof mongoose | undefined;

  /**
   * Singleton for the Database instance
   *
   * @returns An instance of the Database
   */
  public static getInstance(): TreeStorage {
    if (this.instance === undefined) this.instance = new TreeStorage();
    return this.instance;
  }
  /**
   * Connects to our MongoDB database
   * @param databaseUri - The URI of our database
   */
  static async connectDb(databaseUri: string) {
    this.instance.connection = await mongoose.connect(databaseUri);
  }
  /**
   * Inserts a tree object into the database
   *
   * @param tree - The tree id to be added
   */
  async insertTree(tree: NewTree) {
    await treeModel.create({
      ...tree,
      eloRating: 1000,
    });
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
    await treeModel.updateOne({ _id: treeIdToUpdate }, { eloRating: newScore });
  }
  /**
   * Returns all trees in the database
   *
   * @returns All trees of the database in an array
   */
  async getAllTrees() {
    return (await treeModel.find({})).map(
      (o) =>
        ({
          id: o._id,
          treeName: o.treeName,
          userName: o.userName,
          eloRating: o.eloRating,
          geo: o.geo,
        } as Tree)
    );
  }
  /**
   * Returns two random trees from the database
   *
   * @returns Two random trees from the database
   */
  async getTwoRandomTrees() {
    const queriedTrees = await treeModel.aggregate([{ $sample: { size: 2 } }]);
    if (queriedTrees.length !== 2) throw Error('meeeep');
    const treeLeft: Tree = {
      id: queriedTrees[0]._id,
      userName: queriedTrees[0].userName,
      treeName: queriedTrees[0].treeName,
      eloRating: queriedTrees[0].eloRating,
      geo: queriedTrees[0].geo,
    };
    const treeRight: Tree = {
      id: queriedTrees[1]._id,
      userName: queriedTrees[1].userName,
      treeName: queriedTrees[1].treeName,
      eloRating: queriedTrees[1].eloRating,
      geo: queriedTrees[1].geo,
    };
    return { treeLeft, treeRight };
  }
  /**
   * Returns a specific single tree from the database
   *
   * @param treeId - The id of the tree to be return from the database
   * @returns A tree object
   */
  async oneTree(treeId: string) {
    const queriedTree = await treeModel.findById(treeId);
    if (!queriedTree) throw Error('Meeeep');
    const tree: Tree = {
      id: queriedTree._id,
      userName: queriedTree.userName,
      treeName: queriedTree.treeName,
      eloRating: queriedTree.eloRating,
      geo: queriedTree.geo,
    };
    return tree;
  }
  /**
   * Returns the image from a specific single tree from the database
   *
   * @param treeId - The id of the tree to be return from the database
   * @returns A tree object
   */
  async oneImage(treeId: string) {
    const queriedTree = await treeModel.findById(treeId);
    if (!queriedTree) throw Error('Meeeep');
    return queriedTree.image;
  }
  /**
   * Returns the trees with the highest ELO-Ratings
   *
   * @param numberOfTrees - The number of trees to be returned
   * @returns Ten tree objects as an array
   */
  async getTopTrees(numberOfTrees: number) {
    const topTrees = await treeModel
      .find()
      .sort('-eloRating')
      .limit(numberOfTrees);
    return topTrees.map(
      (o) =>
        ({
          id: o._id,
          treeName: o.treeName,
          userName: o.userName,
          eloRating: o.eloRating,
          geo: o.geo,
        } as Tree)
    );
  }
}
