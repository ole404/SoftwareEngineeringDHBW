import { Schema, model } from 'mongoose';

import { Tree } from '../api/interfaces';

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

// Duplicate the ID field.
treeSchema.virtual('id').get(function () {
  return this._id.toHexString();
});

// Ensure virtual fields are serialised.
treeSchema.set('toJSON', { virtuals: true });

//Creating a model from the tree schema
export const treeModel = model<Tree>('Tree', treeSchema);
