import { Component, Injectable, OnInit } from '@angular/core';
import { Recipe } from './recipes/recipe.model';
import { RecipeService } from './recipes/recipe.service';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { DataService } from './shared/data.service';
import { AuthService } from './auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
@Injectable()
export class AppComponent implements OnInit {
  // signup/login page will not show header
  displayHeader = true;

  setShowHeader(flag: boolean) {
    this.displayHeader = flag;
  }

  constructor(
    private recipeService: RecipeService,
    private authService: AuthService // private store: AngularFirestore
  ) {}

  ngOnInit(): void {
    this.authService.autoLogin();
  }

  //   addRecipes(recipes: Recipe[]) {
  //     recipes.forEach((recipe) => {
  //       this.store.collection('recipes').add(this.recipeService.toJson(recipe));
  //     });
  //   }
}
