import { Component, OnInit } from '@angular/core';
import { Recipe } from '../recipe.model';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { RecipeService } from '../recipe.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {
  recipes: Recipe[] = [];
  
  constructor(
    private recipeService: RecipeService, 
    private router: Router, 
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.recipeService.recipesChanged.subscribe(
      (recipes: Recipe[]) => {
        this.recipes = recipes;
      }
    )
    this.recipes = this.recipeService.getRecipes();
  }

  isView: boolean = true;
  toggleView() {
    this.isView = !this.isView;
  }

  onDeleteRecipe() {
    // TODO
  }

  isReorder: boolean = false;

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.recipes, event.previousIndex, event.currentIndex);
    this.recipeService.updateRecipes(this.recipes);
  }

  onNewRecipe() {
    this.router.navigate(['add'], {relativeTo: this.route});
  }

}
