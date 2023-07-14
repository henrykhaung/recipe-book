import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { ShoppingListService } from '../shopping-list.service';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  editSubscription: Subscription;
  editMode = false;
  editedIngredientIndex: number;
  editedIngredient: Ingredient;

  ingredients: Ingredient[] = [];
  selectedIngredients = {};
  ingredientForm: FormGroup;
  deleteForm: FormGroup;

  constructor(
    private shoppinglistService: ShoppingListService,
    private modalService: NgbModal,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit() {
    this.editSubscription = this.shoppinglistService.edit.subscribe(
      (index: number) => {
        this.editedIngredientIndex = index;
        this.editMode = true;
        this.editedIngredient = this.shoppinglistService.getIngredient(index);
        this.initForm();
      }
    );

    if (!this.editMode) {
      this.initForm();
    }
    // this.ingredients = this.shoppinglistService.getIngredients();
  }

  ngOnDestroy() {
    
  }

  private initForm() {
    let name = null;
    let amount = null;
    let unit = null;

    if (this.editMode) {
      name = this.editedIngredient.name;
      amount = this.editedIngredient.amount;
      unit = this.editedIngredient.unit;
    }

    this.ingredientForm = new FormGroup({
      'name': new FormControl(name, Validators.required),
      'amount': new FormControl(amount, [Validators.required, Validators.pattern(/^[1-9]+[0-9]*$/)]),
      'unit': new FormControl(unit, Validators.required)
    });
  }

  /*
    same logic as deleting recipe(s) from recipe list
    see recipe-list.component.ts 
  */
  onDeleteOpen(content: string) {
    this.deleteForm = this.formBuilder.group({
      ingredients: new FormArray(this.ingredients.map(() => new FormControl(false)))
    });
    console.log(this.ingredients);
    this.modalService.open(content, {centered: true});
  }

  onDeleteSubmit() {
    const selectedIngredients = this.deleteForm.value.ingredients;
    this.ingredients = this.ingredients.filter((ingredient, index) => !selectedIngredients[index]);
    this.shoppinglistService.updateIngredients(this.ingredients);
    this.modalService.dismissAll();
  }

  onClearShoppingList() {
    this.shoppinglistService.clearShoppingList();
  }

  onSubmit() {
    const newIngredient = new Ingredient(
      this.ingredientForm.value['name'],
      this.ingredientForm.value['amount'],
      this.ingredientForm.value['unit']
    );

    if (this.editMode) {
      this.shoppinglistService.updateIngredient(this.editedIngredientIndex, newIngredient);
    } else {
      this.shoppinglistService.addIngredient(newIngredient);
    }

    this.editMode = false;
    this.ingredientForm.reset();
  }

  onDelete() {
    this.shoppinglistService.deleteIngredient(this.editedIngredientIndex);
    this.onClear();
  }

  onClear() {
    this.ingredientForm.reset();
    this.editMode = false;
  }



}
