import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot,
} from '@angular/router';
import { DataService } from 'src/app/services/data.service';
import { Ingredient } from '../models/ingredient.model';

@Injectable()
export class ShoppingListResolver implements Resolve<Ingredient[]> {
  constructor(
    private dataService: DataService
  ) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.dataService.fetchShoppingList();
  }
}
