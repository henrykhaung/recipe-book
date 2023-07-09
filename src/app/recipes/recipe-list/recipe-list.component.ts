import { Component, OnInit } from '@angular/core';
import { Recipe } from '../recipe.model';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { RecipeService } from '../recipe.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {
  recipes: Recipe[] = [];
  selectedRecipes = {};
  deleteForm: FormGroup;
  
  constructor(
    private recipeService: RecipeService, 
    private router: Router, 
    private route: ActivatedRoute,
    private modalService: NgbModal,
    private fb: FormBuilder) { }

  ngOnInit() {
    this.recipeService.recipesChanged.subscribe(
      (recipes: Recipe[]) => {
        this.recipes = recipes;
      }
    )
    this.recipes = this.recipeService.getRecipes();

    this.deleteForm = this.fb.group({
      recipes: this.fb.array([])
    });
    this.recipes.forEach(() => this.recipesArray.push(this.fb.control(false)));
  }

  isView: boolean = true;
  toggleView() {
    this.isView = !this.isView;
  }

  get recipesArray() {
    return this.deleteForm.controls.recipes as FormArray;
  }

  onDeleteOpen(content: string) {
    this.modalService.open(content, {centered: true});
  }

  toggleSelection(index) {
    this.selectedRecipes[index] = !this.selectedRecipes[index];
  }
  
  onDeleteOpenSubmit() {
    const selectedRecipeIndexes = this.deleteForm.value.recipes.map(
      (checked, i) => checked ? i : null
      ).filter(
        v => v !== null
        );

    this.recipes = this.recipes.filter((recipe, i) => !selectedRecipeIndexes.includes(i));
    this.deleteForm.reset();
    this.modalService.dismissAll();
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
