import { Component, Input, OnInit } from '@angular/core';
import { Recipe } from '../../../models/recipe.model';

@Component({
  selector: 'app-recipe-item',
  templateUrl: './recipe-item.component.html',
  styleUrls: ['./recipe-item.component.css'],
})
export class RecipeItemComponent implements OnInit {
  @Input() recipe: Recipe;
  @Input() recipename: string;

  ngOnInit() {
    console.log('Recipe:', this.recipe);
    console.log('Recipename:', this.recipename);
  }
}
