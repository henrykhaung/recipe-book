import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Recipe } from '../../models/recipe.model';
import { RecipeService } from '../../services/recipe.service';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css'],
})
export class RecipeEditComponent implements OnInit {
  recipeName: string;
  editMode = false;
  recipeForm: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private recipeService: RecipeService,
    private router: Router,
    private data: DataService
  ) {}

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.recipeName = params['name'];
      this.editMode = params['name'] != null;
    });
    this.initForm();
  }

  private initForm() {
    let name = '';
    let imagePath = '';
    let description = '';
    let ingredients = new FormArray([]);

    if (this.editMode) {
      const recipe = this.recipeService.getRecipe(this.recipeName);
      name = recipe.name;
      imagePath = recipe.imagePath;
      description = recipe.description;
      if (recipe['ingredients']) {
        for (let ingredient of recipe.ingredients) {
          ingredients.push(
            new FormGroup({
              name: new FormControl(ingredient.name, Validators.required),
              amount: new FormControl(ingredient.amount, [
                Validators.required,
                Validators.pattern(/^[1-9]+[0-9]*$/),
              ]),
              unit: new FormControl(ingredient.unit, Validators.required),
            })
          );
        }
      }
    } else {
      ingredients.push(
        new FormGroup({
          name: new FormControl(null, Validators.required),
          amount: new FormControl(null, [
            Validators.required,
            Validators.pattern(/^[1-9]+[0-9]*$/),
          ]),
          unit: new FormControl(null, Validators.required),
        })
      );
    }

    this.recipeForm = new FormGroup({
      name: new FormControl(name, Validators.required),
      imagePath: new FormControl(imagePath, Validators.required),
      description: new FormControl(description, Validators.required),
      ingredients: ingredients,
    });
  }

  get controls() {
    return (<FormArray>this.recipeForm.get('ingredients')).controls;
  }

  onAddIngredient() {
    let name = 'Enter an ingredient';

    (<FormArray>this.recipeForm.get('ingredients')).push(
      new FormGroup({
        name: new FormControl(name, Validators.required),
        amount: new FormControl(null, [
          Validators.required,
          Validators.pattern(/^[1-9]+[0-9]*$/),
        ]),
        unit: new FormControl(null, Validators.required),
      })
    );
  }

  onDeleteIngredient(index: number) {
    (<FormArray>this.recipeForm.get('ingredients')).removeAt(index);
  }

  onSubmit() {
    const newRecipe = new Recipe(
      this.recipeForm.value['name'],
      this.recipeForm.value['description'],
      this.recipeForm.value['imagePath'],
      this.recipeForm.value['ingredients']
    );
    if (this.editMode) {
      this.recipeService.updateRecipe(newRecipe.name, newRecipe);
    } else {
      this.recipeService.addRecipe(newRecipe);
    }
    this.data.storeRecipes();
    this.onCancel();
  }

  onCancel() {
    this.router.navigate(['../'], { relativeTo: this.route });
  }
}
