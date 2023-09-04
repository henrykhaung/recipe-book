import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot,
} from '@angular/router';
import { DataService } from 'src/app/services/data.service';
import { RecipeService } from 'src/app/services/recipe.service';
import { Recipe } from 'src/app/models/recipe.model';

@Injectable()
export class RecipeResolver implements Resolve<Recipe[]> {
  constructor(
    private recipeService: RecipeService,
    private dataService: DataService
  ) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const recipes = this.recipeService.getRecipes();

    if (recipes.length === 0) {
      return this.dataService.fetchRecipes();
    } else {
      return recipes;
    }
  }
}
