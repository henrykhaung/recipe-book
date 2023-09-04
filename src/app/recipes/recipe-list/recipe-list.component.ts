import { Component, OnDestroy, OnInit } from '@angular/core';
import { Recipe } from '../../models/recipe.model';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { RecipeService } from '../../services/recipe.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css'],
})
export class RecipeListComponent implements OnInit, OnDestroy {
  recipes: Recipe[] = [];
  subscription: Subscription;
  selectedRecipes = {};
  deleteForm: FormGroup;

  constructor(
    private recipeService: RecipeService,
    private data: DataService,
    private router: Router,
    private route: ActivatedRoute,
    private modalService: NgbModal,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.subscription = this.recipeService.recipesChanged.subscribe(
      (recipes: Recipe[]) => {
        this.recipes = recipes;
      }
    );
    this.recipes = this.recipeService.getRecipes();
    console.log('in recipe list', this.recipes);

    this.deleteForm = this.fb.group({
      recipes: this.fb.array([]),
    });
    this.recipes.forEach(() => this.recipesArray.push(this.fb.control(false)));
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  isView: boolean = true;
  toggleView() {
    this.isView = !this.isView;
  }

  get recipesArray() {
    return this.deleteForm.controls.recipes as FormArray;
  }

  onDeleteOpen(content: string) {
    this.modalService.open(content, { centered: true });
  }

  toggleSelection(index) {
    this.selectedRecipes[index] = !this.selectedRecipes[index];
  }

  onDeleteOpenSubmit() {
    const selectedRecipeIndexes = this.deleteForm.value.recipes
      .map((checked, i) => (checked ? i : null))
      .filter((v) => v !== null);

    this.recipes = this.recipes.filter(
      (recipe, i) => !selectedRecipeIndexes.includes(i)
    );
    this.deleteForm.reset();
    this.modalService.dismissAll();
  }

  isReorder: boolean = false;

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.recipes, event.previousIndex, event.currentIndex);
    this.recipeService.updateRecipes(this.recipes);
  }

  onNewRecipe() {
    this.router.navigate(['add'], { relativeTo: this.route });
  }
}
