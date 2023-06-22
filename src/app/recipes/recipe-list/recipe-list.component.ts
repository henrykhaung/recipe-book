import { Component, OnInit } from '@angular/core';
import { Recipe } from '../recipe.model';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {
  recipes: Recipe[] = [];
  
  constructor(private recipeService: RecipeService) { }

  ngOnInit() {
    this.recipes = this.recipeService.getRecipes();
  }

  isView: boolean = true;
  toggleView() {
    this.isView = !this.isView;
  }

  addRecipe() {
  //   this.recipes.push(new Recipe('Test recipe1', 'test 1234', 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAQMAAADCCAMAAAB6zFdcAAAAtFBMVEUTExMAAMDAwMDAAMAAwMAAwADAwADAAAD///8AIUwyAGodHR0JCQm8vL27uwC/vAAAwMUBugDAAMW8AQAAAAATAAAQFAcWFhYAADzX2Nybka4lAGQsB1wAIkbDw8AAFY1+fn5cXMCZXMBcmcCZmcAAxsBfDw8BExNfXw8PXw8BARMTARMMfn4AEwCnp6clDEfhpeGFAJkTEwAMGzVYXQAAXABdAAAAAyqNjpCuXrchDj4YAF8sQZGEAAAB20lEQVR4nO3U2U5UQRSG0ZKeRA8ynSOCMik4t4oyKe//XsSEdFo73fV3AlesL3W9k1q1U2UlaO3FsN76Rr/exuag3mYvaGt7VG/7SVJhwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDxug4OkgGA47J8GBQSDQWQQEIxGmcFx0vnHeudvky4+1bt4l3T5vt7lSVKJpNrP9drk9Xrtl3pdtFHth3pttOWZwc9Sb7yVGIyDSV3wsfT7XTCpTX67FQYMGDBgwIABAwYMGDC4J4N2QQlBb/xybg9icJAYHCb9uuvq+tv8fsz0+2ym7/P7MzH4mtQ1pSl/T2ma6XvvTFWOksp+0updr3afLtPezev/eza/N5NN6JKaqf4xeD7Vor2dVFaXaVmDRVdeYBAVGWSjGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABgwc0uAXDiRaQ6Hk/NgAAAABJRU5ErkJggg=='));
  
  }

  isReorder: boolean = false;

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.recipes, event.previousIndex, event.currentIndex);
  }

  
}
