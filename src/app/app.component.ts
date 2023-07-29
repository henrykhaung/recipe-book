import { Component, Injectable } from '@angular/core';
import { Recipe } from './recipes/recipe.model';
import { RecipeService } from './recipes/recipe.service';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
@Injectable()
export class AppComponent {
  // signup/login page will not show header
  displayHeader = true;
  
  setShowHeader(flag: boolean) {
    this.displayHeader = flag;
  }

  constructor(
    private recipeService: RecipeService,
    private store: AngularFirestore) {};

  addRecipes(recipes: Recipe[]) {
    recipes.forEach(recipe => {
      this.store.collection('recipes').add(this.recipeService.toJson(recipe));
    });
  }

}
