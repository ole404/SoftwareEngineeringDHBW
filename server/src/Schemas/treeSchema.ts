import mongoose from 'mongoose';
const { Schema, model } = mongoose;
/**
 * Interface for our GeoInformation
 */
interface Geo {
  lat: number;
  lon: number;
}
/**
 * Interface for our trees
 */
export interface Tree {
  userName: string;
  treeName: string;
  eloRating: number;
  geo: Geo;
  image: string;
}
/**
 * Mongoose schema for the MongoDB
 */
export const treeSchema = new Schema<Tree>({
  userName: String,
  treeName: String,
  eloRating: Number,
  geo: { lat: Number, lon: Number },
  image: String,
});
//Creating a model from the tree schema
export const treeModel = model<Tree>('Tree', treeSchema);
