import mongoose from 'mongoose';
const { Schema, model } = mongoose;

interface GeoInfo {
  address: string;
  lat: number;
  lon: number;
}

export interface Tree {
  treeId: string;
  userName: string;
  treeName: string;
  eloRating: number;
  geoInfo: GeoInfo;
  image: string;
}

export const treeSchema = new Schema<Tree>({
  treeId: String,
  userName: String,
  treeName: String,
  eloRating: Number,
  geoInfo: { address: String, lat: Number, lon: Number },
  image: String,
});

export const treeModel = model<Tree>('Tree', treeSchema);
