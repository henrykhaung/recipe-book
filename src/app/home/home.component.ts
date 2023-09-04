import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Recipe } from '../models/recipe.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  recipes: Recipe[];
  todayRecipes: Recipe[];

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.data.subscribe(
      (data: { recipes: Recipe[]; todayRecipes: Recipe[] }) => {
        this.recipes = data.recipes;
        this.todayRecipes = data.todayRecipes;
      }
    );
  }
}
