import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Recipe } from '../../recipe.model';

@Component({
  selector: 'app-recipe-item',
  templateUrl: './recipe-item.component.html',
  styleUrls: ['./recipe-item.component.css']
})
export class RecipeItemComponent {
  @Input() recipe: Recipe;
  @Output() recipeSelected = new EventEmitter<void>();

  recipes: Recipe[] = [
    new Recipe('Test recipe', 'test 123 write very long description, write very long description, write very long description, write very long description', 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAQMAAADCCAMAAAB6zFdcAAAAtFBMVEUTExMAAMDAwMDAAMAAwMAAwADAwADAAAD///8AIUwyAGodHR0JCQm8vL27uwC/vAAAwMUBugDAAMW8AQAAAAATAAAQFAcWFhYAADzX2Nybka4lAGQsB1wAIkbDw8AAFY1+fn5cXMCZXMBcmcCZmcAAxsBfDw8BExNfXw8PXw8BARMTARMMfn4AEwCnp6clDEfhpeGFAJkTEwAMGzVYXQAAXABdAAAAAyqNjpCuXrchDj4YAF8sQZGEAAAB20lEQVR4nO3U2U5UQRSG0ZKeRA8ynSOCMik4t4oyKe//XsSEdFo73fV3AlesL3W9k1q1U2UlaO3FsN76Rr/exuag3mYvaGt7VG/7SVJhwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDxug4OkgGA47J8GBQSDQWQQEIxGmcFx0vnHeudvky4+1bt4l3T5vt7lSVKJpNrP9drk9Xrtl3pdtFHth3pttOWZwc9Sb7yVGIyDSV3wsfT7XTCpTX67FQYMGDBgwIABAwYMGDC4J4N2QQlBb/xybg9icJAYHCb9uuvq+tv8fsz0+2ym7/P7MzH4mtQ1pSl/T2ma6XvvTFWOksp+0updr3afLtPezev/eza/N5NN6JKaqf4xeD7Vor2dVFaXaVmDRVdeYBAVGWSjGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABgwc0uAXDiRaQ6Hk/NgAAAABJRU5ErkJggg==')
  ];

  onSelected() {
    this.recipeSelected.emit();
  }

}
