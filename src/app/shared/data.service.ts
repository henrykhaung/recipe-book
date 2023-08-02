import { ChangeDetectorRef, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RecipeService } from '../recipes/recipe.service';
import { exhaustMap, map, of, switchMap, take, tap } from 'rxjs';
import { Recipe } from '../recipes/recipe.model';
import { AuthService } from '../auth/auth.service';
import { Router } from '@angular/router';

@Injectable()
export class DataService {
  constructor(
    private httpClient: HttpClient,
    private recipeService: RecipeService,
    private authService: AuthService,
    private route: Router
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

  // this fetches a user's recipes
  fetchRecipes() {
    return this.authService.user.pipe(
      take(1),
      exhaustMap((user) => {
        if (user) {
          // Fetch the user's recipes by their ID
          return this.httpClient
            .get<Recipe[]>(
              `https://recipe-book-8c0fb-default-rtdb.firebaseio.com/user-recipes/${user.id}.json?auth=${user.token}`
            )
            .pipe(
              // Check if the user has recipes. If not, then return an
              // empty list
              map((userRecipes) => {
                console.log(userRecipes);
                if (userRecipes === null) {
                  return this.recipeService.getEmptyRecipesList();
                } else {
                  return userRecipes;
                }
              })
            );
        } else {
          // Continue to fetch default recipes if no user is logged in
          return this.httpClient.get<Recipe[]>(
            'https://recipe-book-8c0fb-default-rtdb.firebaseio.com/serverrecipes.json'
          );
        }
      }),
      map((recipes) => {
        // Handle the EMPTY_RECIPE_LIST case
        if (recipes === this.recipeService.getEmptyRecipesList()) {
          return [];
        }

        return recipes.map((recipe) => {
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
  }
}
