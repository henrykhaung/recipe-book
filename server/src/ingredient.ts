import * as mongodb from 'mongodb';

export interface Ingredient {
  name: string;
  amount: number;
  unit: string;
  _id?: mongodb.ObjectId;
}
