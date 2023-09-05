import { Subject } from 'rxjs';
import { Ingredient } from '../models/ingredient.model';

export class ShoppingListService {
  ingredientsChanged = new Subject<Ingredient[]>();
  edit = new Subject<number>();

  ingredientSelected = new Subject<Ingredient>();

  // private ingredients: Ingredient[] = [
  //   new Ingredient('Bananas', 5, 'lb'),
  //   new Ingredient('Oranges', 10, 'oz'),
  // ];

  private ingredients: Ingredient[] = [];

  setShoppingList(shoppingList: Ingredient[]) {
    this.ingredients = shoppingList ? shoppingList.slice() : [];
    this.ingredientsChanged.next(this.ingredients.slice());
  }

  getIngredients() {
    return this.ingredients ? this.ingredients.slice() : []
  }

  getIngredient(index: number) {
    return this.ingredients[index];
  }

  addIngredient(ingredient: Ingredient) {
    for (let index = 0; index < this.ingredients.length; index++) {
      const element = this.ingredients[index];
      if (
        element.name === ingredient.name &&
        element.unit === ingredient.unit
      ) {
        element.amount += ingredient.amount;
        this.updateIngredient(index, element);
        return;
      }
    }
    this.ingredients.push(ingredient);
    this.ingredientsChanged.next(this.ingredients.slice());
  }

  addIngredients(ingredientsToAdd: Ingredient[]) {
    let i = 0;
    while (i < ingredientsToAdd.length) {
      let ingredientToAdd = { ...ingredientsToAdd[i] };
      if (!ingredientToAdd) continue;
      let update = false;
      for (let index = 0; index < this.ingredients.length; index++) {
        const ingredient = this.ingredients[index];
        if (
          ingredient.name === ingredientToAdd.name &&
          ingredient.unit === ingredientToAdd.unit
        ) {
          ingredient.amount += ingredientToAdd.amount;
          this.ingredients[index] = ingredient;
          update = true;
          break;
        }
      }
      if (!update) {
        this.ingredients.push(ingredientToAdd);
      }

      i++;
    }
    this.ingredientsChanged.next(this.ingredients.slice());
  }

  deleteIngredient(index: number) {
    this.ingredients.splice(index, 1);
    this.ingredientsChanged.next(this.ingredients.slice());
  }

  clearShoppingList() {
    this.ingredients = [];
    this.ingredientsChanged.next(this.ingredients.slice());
  }

  updateIngredient(index: number, updateIngredient: Ingredient) {
    this.ingredients[index] = updateIngredient;
    this.ingredientsChanged.next(this.ingredients.slice());
  }

  updateIngredients(ingredients: Ingredient[]) {
    this.ingredients = ingredients;
    this.ingredientsChanged.next(this.ingredients.slice());
  }

  toJson(ingredient: Ingredient) {
    return {
      name: ingredient.name,
      amount: ingredient.amount,
      unit: ingredient.unit,
    };
  }
}
