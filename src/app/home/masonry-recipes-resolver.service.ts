import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot,
} from '@angular/router';
import { DataService } from 'src/app/services/data.service';
import { Recipe } from 'src/app/models/recipe.model';
import { RecipeService } from 'src/app/services/recipe.service';
import { AuthService } from 'src/app/services/auth.service';

@Injectable()
export class MasonryRecipesResolver implements Resolve<Recipe[]> {
  constructor(
    private recipeService: RecipeService,
    private dataService: DataService,
    private authService: AuthService
  ) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const recipes = this.recipeService.getRecipes();
    const user = this.authService.user.getValue();
    if (user) {
      console.log('fetching user recipes');
      return this.dataService.fetchRecipes();
    }
    console.log('fetched no user recipes', recipes);
    return recipes;
  }
}
