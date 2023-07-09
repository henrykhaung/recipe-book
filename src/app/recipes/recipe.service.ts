import { Injectable } from "@angular/core";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { Subject } from "rxjs";
import { Ingredient } from "../shared/ingredient.model";
import { ShoppingListService } from "../shopping-list/shopping-list.service";
import { Recipe } from "./recipe.model";

@Injectable()
export class RecipeService {
    recipesChanged = new Subject<Recipe[]>();

    private recipes: Recipe[] = [
        new Recipe(
            'Test recipe', 
            'test 123 write very long description, write very long description, write very long description, write very long description', 
            'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAQMAAADCCAMAAAB6zFdcAAAAtFBMVEUTExMAAMDAwMDAAMAAwMAAwADAwADAAAD///8AIUwyAGodHR0JCQm8vL27uwC/vAAAwMUBugDAAMW8AQAAAAATAAAQFAcWFhYAADzX2Nybka4lAGQsB1wAIkbDw8AAFY1+fn5cXMCZXMBcmcCZmcAAxsBfDw8BExNfXw8PXw8BARMTARMMfn4AEwCnp6clDEfhpeGFAJkTEwAMGzVYXQAAXABdAAAAAyqNjpCuXrchDj4YAF8sQZGEAAAB20lEQVR4nO3U2U5UQRSG0ZKeRA8ynSOCMik4t4oyKe//XsSEdFo73fV3AlesL3W9k1q1U2UlaO3FsN76Rr/exuag3mYvaGt7VG/7SVJhwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDxug4OkgGA47J8GBQSDQWQQEIxGmcFx0vnHeudvky4+1bt4l3T5vt7lSVKJpNrP9drk9Xrtl3pdtFHth3pttOWZwc9Sb7yVGIyDSV3wsfT7XTCpTX67FQYMGDBgwIABAwYMGDC4J4N2QQlBb/xybg9icJAYHCb9uuvq+tv8fsz0+2ym7/P7MzH4mtQ1pSl/T2ma6XvvTFWOksp+0updr3afLtPezev/eza/N5NN6JKaqf4xeD7Vor2dVFaXaVmDRVdeYBAVGWSjGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABgwc0uAXDiRaQ6Hk/NgAAAABJRU5ErkJggg==',
            [
                new Ingredient('test ingredient', 1, 'tbsp'),
                new Ingredient('test ingredient', 2, 'tsp')
            ]),

        new Recipe(
            '炸酱面',
            'chinese dish',
            '',
            [
                new Ingredient('Meat', 1, 'oz'),
                new Ingredient('Lettuce', 1, 'lb')
            ]),

        new Recipe(
            'test',
            'test description',
            '',
            [
                new Ingredient('test ingredient1', 1, 'cup')
            ]),

        new Recipe(
            'testrecipe',
            'test 123',
            '',
            [
                new Ingredient('testtesttest', 1, 'lb')
            ]),
    ];

    constructor(private shoppinglistService: ShoppingListService, private modalService: NgbModal) {}

    getRecipes() {
        return this.recipes.slice();
    }

    getRecipe(name: string) {
        return this.recipes.find((recipe) => {
          return recipe.name === name;
        });
    }

    addRecipe(recipe: Recipe) {
        if(this.recipes.find(existingRecipe => existingRecipe.name === recipe.name)) {
            this.openErrorModal("You cannot add a recipe with the same name.");
        } else {
            this.recipes.push(recipe);
            this.recipesChanged.next(this.recipes.slice());
        }
    }

    deleteRecipe(name: string) {
        const index = this.recipes.findIndex(recipe => recipe.name === name);
        if (index !== -1) {
            this.recipes.splice(index, 1);
            this.recipesChanged.next(this.recipes.slice());
        }
    }

    updateRecipe(name: string, recipe: Recipe) {
        const index = this.recipes.findIndex(existingRecipe => existingRecipe.name === name);
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
}