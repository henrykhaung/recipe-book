import { Component, Input } from '@angular/core';
import { Recipe } from '../recipe.model';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent {
  @Input() recipe: Recipe;
  
}

// import { Component } from '@angular/core';
// import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';

// @Component({
// 	selector: 'ngbd-dropdown-basic',
// 	standalone: true,
// 	imports: [NgbDropdownModule],
// 	templateUrl: './dropdown-basic.html',
// })
// export class NgbdDropdownBasic {}