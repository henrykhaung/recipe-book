import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RecipeService } from './recipe.service';
import { switchMap, map, take, tap, throwError } from 'rxjs';
import { Recipe } from '../models/recipe.model';
import { AuthService } from './auth.service';
import { ShoppingListService } from './shopping-list.service';
import { Ingredient } from '../models/ingredient.model';

@Injectable()
export class DataService {
  constructor(
    private httpClient: HttpClient,
    private recipeService: RecipeService,
    private shoppingListService: ShoppingListService,
    private authService: AuthService
  ) {}

  // only to be used once when the app is initialized/nothing is in database
  // currently not implemented in app
  // Server recipes is used for the recipes of the day and when user is not logged in
  storeServerRecipes() {
    const recipes = this.recipeService.getRecipes();
    this.httpClient
      .put(
        'https://recipe-book-8c0fb-default-rtdb.firebaseio.com/serverrecipes.json',
        recipes
      )
      .subscribe((response) => {
        console.log(response);
      });
  }

  // this stores a user's recipes
  storeRecipes() {
    this.authService.user.pipe(take(1)).subscribe((user) => {
      if (user) {
        const recipes = this.recipeService.getRecipes();
        this.httpClient
          .put(
            `https://recipe-book-8c0fb-default-rtdb.firebaseio.com/user-recipes/${user.id}.json?auth=${user.token}`,
            recipes
          )
          .subscribe((response) => {
            console.log(response);
          });
      } else {
        console.log('No user is logged in');
      }
    });
  }

  fetchServerRecipes() {
    return this.httpClient
      .get<Recipe[]>(
        'https://recipe-book-8c0fb-default-rtdb.firebaseio.com/serverrecipes.json'
      )
      .pipe(
        map((recipes: Recipe[]) => {
          return recipes.map((recipe) => {
            return {
              ...recipe,
              ingredients: recipe.ingredients ? recipe.ingredients : [],
            };
          });
        }),
        tap((recipes: Recipe[]) => {
          this.recipeService.setRecipes(recipes);
        })
      );
  }

  // this fetches a user's recipes or server recipes
  fetchRecipes() {
    return this.authService.user.pipe(
      take(1),
      tap((user) => {}),
      switchMap((user) => {
        if (user === null) {
          return throwError('User is null');
        }

        return this.httpClient
          .get<Recipe[]>(
            `https://recipe-book-8c0fb-default-rtdb.firebaseio.com/user-recipes/${user.id}.json?auth=${user.token}`
          )
          .pipe(
            map((recipes) => {
              return recipes?.map((recipe) => {
                return {
                  ...recipe,
                  ingredients: recipe.ingredients ? recipe.ingredients : [],
                };
              });
            }),
            tap((recipes) => {
              this.recipeService.setRecipes(recipes);
            })
          );
      })
    );
  }

  // for shopping list, store/fetch ingredients since a shoppinglist consists of only ingredients
  storeShoppingList() {
    this.authService.user.pipe(take(1)).subscribe((user) => {
      if (user) {
        const shoppingList = this.shoppingListService.getIngredients();
        this.httpClient
          .put(
            `https://recipe-book-8c0fb-default-rtdb.firebaseio.com/user-shopping-list/${user.id}.json?auth=${user.token}`,
            shoppingList
          )
          .subscribe((response) => {
            console.log(response);
          });
      } else {
        console.log('No user is logged in');
      }
    });
  }

  fetchShoppingList() {
    return this.authService.user.pipe(
      take(1),
      tap((user) => {}),
      switchMap((user) => {
        if (user === null) {
          return throwError('User is null');
        }
  
        return this.httpClient
          .get<Ingredient[]>(
            `https://recipe-book-8c0fb-default-rtdb.firebaseio.com/user-shopping-list/${user.id}.json?auth=${user.token}`
          )
          .pipe(
            map((shoppingList) => {
              return shoppingList?.map((ingredient) => {
                return new Ingredient(
                  ingredient.name,
                  ingredient.amount,
                  ingredient.unit
                );
              });
            }),
            tap((shoppingList) => {
              this.shoppingListService.setShoppingList(shoppingList);
            })
          );
      })
    );
  }  
}
