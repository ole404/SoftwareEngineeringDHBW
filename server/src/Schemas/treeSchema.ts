import { Schema, model, Types, Document } from 'mongoose';

import { GeoInfo } from '../api/interfaces';

interface MongoTree {
  image: string;
  userName: string;
  treeName: string;
  eloRating: number;
  geo: GeoInfo;
}

/**
 * Mongoose schema for the MongoDB
 */
export const treeSchema = new Schema<MongoTree>(
  {
    userName: String,
    treeName: String,
    eloRating: Number,
    geo: { lat: Number, lon: Number },
    image: String,
  },
  {
    versionKey: false,
  }
);

//Creating a model from the tree schema
export const treeModel = model<MongoTree>('Tree', treeSchema);

// Duplicate the ID field.
treeSchema
  .virtual('id')
  .get(function (
    this: Document<unknown, unknown, MongoTree> &
      MongoTree & { _id: Types.ObjectId }
  ) {
    return this._id.toHexString();
  });

// Ensure virtual fields are serialised.
treeSchema.set('toJSON', { virtuals: true });
