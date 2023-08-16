import * as mongodb from 'mongodb';
import { Ingredient } from './ingredient';
import { Recipe } from './recipe';

export interface User {
  email: string;
  _token: string;
  _tokenExpirationDate: Date;
  _id?: mongodb.ObjectId;
  recipes: Recipe[];
  shoppinglist: Ingredient[];
}
