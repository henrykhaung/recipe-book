import { Subject } from "rxjs";
import { Ingredient } from "../shared/ingredient.model";

export class ShoppingListService {
    ingredientsChanged = new Subject<Ingredient[]>();
    ingredientSelected = new Subject<Ingredient>();
    
    private ingredients: Ingredient[] = [
        new Ingredient('Bananas', 5, 'lb'),
        new Ingredient('Oranges', 10, 'oz')
    ];
    
    getIngredients() {
        return this.ingredients.slice();
    }

    addIngredient(ingredient: Ingredient) {
        this.ingredients.push(ingredient);
        this.ingredientsChanged.next(this.ingredients.slice());
    }

    addIngredients(ingredients: Ingredient[]) {
        this.ingredients.push(...ingredients);
        this.ingredientsChanged.next(this.ingredients.slice());
    }

    deleteIngredient(index: number) {
        // this.ingredients.splice(index, 1);
        // this.ingredientsChanged.next(this.ingredients.slice());
    }
    
    clearShoppingList() {
        this.ingredients = [];
        this.ingredientsChanged.next(this.ingredients.slice());
    }    

}