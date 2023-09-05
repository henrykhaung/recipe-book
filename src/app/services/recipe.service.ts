import { Injectable, OnDestroy, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subject, Subscription } from 'rxjs';
import { Ingredient } from '../models/ingredient.model';
import { ShoppingListService } from './shopping-list.service';
import { Recipe } from '../models/recipe.model';

@Injectable()
export class RecipeService {
  recipesChanged = new Subject<Recipe[]>();

  private recipes: Recipe[] = [];

  //   private recipes: Recipe[] = [
  //     new Recipe(
  //       'Best Chicken NA',
  //       'hella good',
  //       'https://images.squarespace-cdn.com/content/v1/5b147abd506fbebc59fd001d/1587441432211-AXBWWRXA77619V7Q78HW/half+chix.jpg?format=500w',
  //       [new Ingredient('buy from BirdHouse', 1, 'lb')]
  //     ),

  //     new Recipe(
  //       'Test recipe',
  //       'test 123 write very long description, write very long description, write very long description, write very long description',
  //       'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAQMAAADCCAMAAAB6zFdcAAAAtFBMVEUTExMAAMDAwMDAAMAAwMAAwADAwADAAAD///8AIUwyAGodHR0JCQm8vL27uwC/vAAAwMUBugDAAMW8AQAAAAATAAAQFAcWFhYAADzX2Nybka4lAGQsB1wAIkbDw8AAFY1+fn5cXMCZXMBcmcCZmcAAxsBfDw8BExNfXw8PXw8BARMTARMMfn4AEwCnp6clDEfhpeGFAJkTEwAMGzVYXQAAXABdAAAAAyqNjpCuXrchDj4YAF8sQZGEAAAB20lEQVR4nO3U2U5UQRSG0ZKeRA8ynSOCMik4t4oyKe//XsSEdFo73fV3AlesL3W9k1q1U2UlaO3FsN76Rr/exuag3mYvaGt7VG/7SVJhwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDxug4OkgGA47J8GBQSDQWQQEIxGmcFx0vnHeudvky4+1bt4l3T5vt7lSVKJpNrP9drk9Xrtl3pdtFHth3pttOWZwc9Sb7yVGIyDSV3wsfT7XTCpTX67FQYMGDBgwIABAwYMGDC4J4N2QQlBb/xybg9icJAYHCb9uuvq+tv8fsz0+2ym7/P7MzH4mtQ1pSl/T2ma6XvvTFWOksp+0updr3afLtPezev/eza/N5NN6JKaqf4xeD7Vor2dVFaXaVmDRVdeYBAVGWSjGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABgwc0uAXDiRaQ6Hk/NgAAAABJRU5ErkJggg==',
  //       [
  //         new Ingredient('test ingredient', 1, 'tbsp'),
  //         new Ingredient('test ingredient', 2, 'tsp'),
  //       ]
  //     ),

  //     new Recipe(
  //       '炸酱面',
  //       'chinese dish',
  //       'https://www.forkknifeswoon.com/wp-content/uploads/2014/10/simple-homemade-chicken-ramen-fork-knife-swoon-01.jpg',
  //       [new Ingredient('Meat', 1, 'oz'), new Ingredient('Lettuce', 1, 'lb')]
  //     ),

  //     new Recipe(
  //       'test',
  //       'test description',
  //       'https://www.justonecookbook.com/wp-content/uploads/2023/04/Spicy-Shoyu-Ramen-8055-I.jpg',
  //       [new Ingredient('test ingredient1', 1, 'cup')]
  //     ),

  //     new Recipe(
  //       'testrecipe',
  //       'test 123',
  //       'https://s23209.pcdn.co/wp-content/uploads/2014/10/220602_DD_Homemade-Ramen_572.jpg',
  //       [new Ingredient('testtesttest', 1, 'lb')]
  //     ),

  //     new Recipe(
  //       'ramen',
  //       'raw men?',
  //       'https://www.chilipeppermadness.com/wp-content/uploads/2023/01/Buldak-Ramen-SQ-500x500.jpg',
  //       [new Ingredient('ramen', 1, 'lb')]
  //     ),

  //     new Recipe(
  //       'Test recipe1',
  //       'test 123 write very long description, write very long description, write very long description, write very long description',
  //       'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAQMAAADCCAMAAAB6zFdcAAAAtFBMVEUTExMAAMDAwMDAAMAAwMAAwADAwADAAAD///8AIUwyAGodHR0JCQm8vL27uwC/vAAAwMUBugDAAMW8AQAAAAATAAAQFAcWFhYAADzX2Nybka4lAGQsB1wAIkbDw8AAFY1+fn5cXMCZXMBcmcCZmcAAxsBfDw8BExNfXw8PXw8BARMTARMMfn4AEwCnp6clDEfhpeGFAJkTEwAMGzVYXQAAXABdAAAAAyqNjpCuXrchDj4YAF8sQZGEAAAB20lEQVR4nO3U2U5UQRSG0ZKeRA8ynSOCMik4t4oyKe//XsSEdFo73fV3AlesL3W9k1q1U2UlaO3FsN76Rr/exuag3mYvaGt7VG/7SVJhwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDxug4OkgGA47J8GBQSDQWQQEIxGmcFx0vnHeudvky4+1bt4l3T5vt7lSVKJpNrP9drk9Xrtl3pdtFHth3pttOWZwc9Sb7yVGIyDSV3wsfT7XTCpTX67FQYMGDBgwIABAwYMGDC4J4N2QQlBb/xybg9icJAYHCb9uuvq+tv8fsz0+2ym7/P7MzH4mtQ1pSl/T2ma6XvvTFWOksp+0updr3afLtPezev/eza/N5NN6JKaqf4xeD7Vor2dVFaXaVmDRVdeYBAVGWSjGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABgwc0uAXDiRaQ6Hk/NgAAAABJRU5ErkJggg==',
  //       [
  //         new Ingredient('test ingredient', 1, 'tbsp'),
  //         new Ingredient('test ingredient', 2, 'tsp'),
  //       ]
  //     ),

  //     new Recipe(
  //       'Test recipe2',
  //       'test 123 write very long description, write very long description, write very long description, write very long description',
  //       'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAQMAAADCCAMAAAB6zFdcAAAAtFBMVEUTExMAAMDAwMDAAMAAwMAAwADAwADAAAD///8AIUwyAGodHR0JCQm8vL27uwC/vAAAwMUBugDAAMW8AQAAAAATAAAQFAcWFhYAADzX2Nybka4lAGQsB1wAIkbDw8AAFY1+fn5cXMCZXMBcmcCZmcAAxsBfDw8BExNfXw8PXw8BARMTARMMfn4AEwCnp6clDEfhpeGFAJkTEwAMGzVYXQAAXABdAAAAAyqNjpCuXrchDj4YAF8sQZGEAAAB20lEQVR4nO3U2U5UQRSG0ZKeRA8ynSOCMik4t4oyKe//XsSEdFo73fV3AlesL3W9k1q1U2UlaO3FsN76Rr/exuag3mYvaGt7VG/7SVJhwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDxug4OkgGA47J8GBQSDQWQQEIxGmcFx0vnHeudvky4+1bt4l3T5vt7lSVKJpNrP9drk9Xrtl3pdtFHth3pttOWZwc9Sb7yVGIyDSV3wsfT7XTCpTX67FQYMGDBgwIABAwYMGDC4J4N2QQlBb/xybg9icJAYHCb9uuvq+tv8fsz0+2ym7/P7MzH4mtQ1pSl/T2ma6XvvTFWOksp+0updr3afLtPezev/eza/N5NN6JKaqf4xeD7Vor2dVFaXaVmDRVdeYBAVGWSjGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABgwc0uAXDiRaQ6Hk/NgAAAABJRU5ErkJggg==',
  //       [
  //         new Ingredient('test ingredient', 1, 'tbsp'),
  //         new Ingredient('test ingredient', 2, 'tsp'),
  //       ]
  //     ),

  //     new Recipe(
  //       'Test recipe3',
  //       'test 123 write very long description, write very long description, write very long description, write very long description',
  //       'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAQMAAADCCAMAAAB6zFdcAAAAtFBMVEUTExMAAMDAwMDAAMAAwMAAwADAwADAAAD///8AIUwyAGodHR0JCQm8vL27uwC/vAAAwMUBugDAAMW8AQAAAAATAAAQFAcWFhYAADzX2Nybka4lAGQsB1wAIkbDw8AAFY1+fn5cXMCZXMBcmcCZmcAAxsBfDw8BExNfXw8PXw8BARMTARMMfn4AEwCnp6clDEfhpeGFAJkTEwAMGzVYXQAAXABdAAAAAyqNjpCuXrchDj4YAF8sQZGEAAAB20lEQVR4nO3U2U5UQRSG0ZKeRA8ynSOCMik4t4oyKe//XsSEdFo73fV3AlesL3W9k1q1U2UlaO3FsN76Rr/exuag3mYvaGt7VG/7SVJhwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDxug4OkgGA47J8GBQSDQWQQEIxGmcFx0vnHeudvky4+1bt4l3T5vt7lSVKJpNrP9drk9Xrtl3pdtFHth3pttOWZwc9Sb7yVGIyDSV3wsfT7XTCpTX67FQYMGDBgwIABAwYMGDC4J4N2QQlBb/xybg9icJAYHCb9uuvq+tv8fsz0+2ym7/P7MzH4mtQ1pSl/T2ma6XvvTFWOksp+0updr3afLtPezev/eza/N5NN6JKaqf4xeD7Vor2dVFaXaVmDRVdeYBAVGWSjGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABgwc0uAXDiRaQ6Hk/NgAAAABJRU5ErkJggg==',
  //       [
  //         new Ingredient('test ingredient', 1, 'tbsp'),
  //         new Ingredient('test ingredient', 2, 'tsp'),
  //       ]
  //     ),
  //   ];

  constructor(
    private shoppinglistService: ShoppingListService,
    private modalService: NgbModal
  ) {}

  getRecipes() {
    return this.recipes.slice();
  }

  getRecipe(name: string) {
    return this.recipes.find((recipe) => {
      return recipe.name === name;
    });
  }

  setRecipes(recipes: Recipe[]) {
    this.recipes = recipes ? recipes.slice() : [];
    this.recipesChanged.next(this.recipes.slice());
  }

  addRecipe(recipe: Recipe) {
    if (
      this.recipes.find((existingRecipe) => existingRecipe.name === recipe.name)
    ) {
      this.openErrorModal('You cannot add a recipe with the same name.');
    } else {
      this.recipes.push(recipe);
      this.recipesChanged.next(this.recipes.slice());
    }
  }

  deleteRecipe(name: string) {
    const index = this.recipes.findIndex((recipe) => recipe.name === name);
    if (index !== -1) {
      this.recipes.splice(index, 1);
      this.recipesChanged.next(this.recipes.slice());
    }
  }

  updateRecipe(name: string, recipe: Recipe) {
    const index = this.recipes.findIndex(
      (existingRecipe) => existingRecipe.name === name
    );
    if (index !== -1) {
      this.recipes[index] = recipe;
      this.recipesChanged.next(this.recipes.slice());
    }
  }

  /* For list reorder */
  updateRecipes(recipes: Recipe[]) {
    this.recipes = recipes.slice();
    this.recipesChanged.next(this.recipes.slice());
  }

  addToShoppingList(ingredients: Ingredient[]) {
    this.shoppinglistService.addIngredients(ingredients);
  }

  openErrorModal(content: string) {
    this.modalService.open(content);
  }

  toJson(recipe: Recipe) {
    return {
      name: recipe.name,
      desc: recipe.description,
      imgPath: recipe.imagePath,
      ingredients: recipe.ingredients.map((ingredient) =>
        this.shoppinglistService.toJson(ingredient)
      ),
    };
  }

  getEmptyRecipesList() {
    return [];
  }
}
