import * as mongodb from 'mongodb';
import { Ingredient } from './ingredient';

export interface Recipe {
  name: string;
  description: string;
  imagePath: string;
  ingredients: Ingredient[];
  _id?: mongodb.ObjectId;
}
