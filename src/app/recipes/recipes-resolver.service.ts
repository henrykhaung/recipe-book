import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot,
} from '@angular/router';
import { DataService } from 'src/app/services/data.service';
import { Recipe } from 'src/app/models/recipe.model';

@Injectable()
export class RecipeResolver implements Resolve<Recipe[]> {
  constructor(
    private dataService: DataService
  ) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.dataService.fetchRecipes();
  }
}
