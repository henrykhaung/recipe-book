import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Ingredient } from '../models/ingredient.model';
import { ShoppingListService } from '../services/shopping-list.service';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css'],
})
export class ShoppingListComponent implements OnInit, OnDestroy {
  ingredients: Ingredient[] = [];
  private ingredientChangedSub: Subscription;

  constructor(private shoppinglistService: ShoppingListService) {}

  ngOnInit() {
    this.ingredients = this.shoppinglistService.getIngredients();
    console.log('fetching shoppinglist:', this.ingredients);
    this.ingredientChangedSub =
      this.shoppinglistService.ingredientsChanged.subscribe(
        (ingredients: Ingredient[]) => {
          this.ingredients = ingredients;
        }
      );
  }

  ngOnDestroy() {
    this.ingredientChangedSub.unsubscribe();
  }

  onEditIngredient(index: number) {
    this.shoppinglistService.edit.next(index);
  }
}
