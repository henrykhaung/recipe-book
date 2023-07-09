import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { ShoppingListService } from '../shopping-list.service';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit {
  @ViewChild('nameInput', {static: false}) nameInputRef: ElementRef;
  @ViewChild('amountInput', {static: false}) amountInputRef: ElementRef;
  @ViewChild('unitInput', {static: false}) unitInputRef: ElementRef;

  ingredients: Ingredient[] = [];
  selectedIngredients = {};
  ingredientForm: FormGroup;
  deleteForm: FormGroup;

  constructor(
    private shoppinglistService: ShoppingListService,
    private router: Router,
    private route: ActivatedRoute,
    private modalService: NgbModal,
    ) {}

  ngOnInit() {
    this.shoppinglistService.ingredientsChanged.subscribe(
      (ingredients: Ingredient[]) => {
        this.ingredients = ingredients;
      }
    )
    this.ingredients = this.shoppinglistService.getIngredients();
    this.initForm();
  }

  private initForm() {
    let name = '';
    let amount = '';
    let unit = '';

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
    this.modalService.open(content, {centered:true});
  }

  onSubmit() {
    const newIngredient = new Ingredient(
      this.ingredientForm.value['name'],
      this.ingredientForm.value['amount'],
      this.ingredientForm.value['unit']
    );

    const existingIngredient = this.ingredients.find(ingredient => ingredient.name === newIngredient.name);
    if (existingIngredient) {
      if (existingIngredient.unit === newIngredient.unit) {
        existingIngredient.amount += newIngredient.amount;
      } else {
        this.shoppinglistService.addIngredient(newIngredient);
      }
    } else {
      this.shoppinglistService.addIngredient(newIngredient);
    }

    this.router.navigate(['/shopping-list'], {relativeTo: this.route});
  }

  onClear() {
    this.shoppinglistService.clearShoppingList();
  }

}
