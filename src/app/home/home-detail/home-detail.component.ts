import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Recipe } from '../../models/recipe.model';
import { RecipeService } from '../../services/recipe.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-home-detail',
  templateUrl: './home-detail.component.html',
  styleUrls: ['./home-detail.component.css'],
})
export class HomeDetailComponent implements OnInit {
  recipe: Recipe;
  name: string;

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.name = params['name'];
      this.recipe = this.recipeService.getRecipe(params['name']);
      console.log(
        'Recipe:',
        this.recipeService.getRecipe(params['name']),
        this.name
      );
    });
  }

  constructor(
    private recipeService: RecipeService,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService
  ) {}

  onAddIngredientsToShoppingList() {
    if (this.authService.isLoggedIn()) {
      this.recipeService.addToShoppingList(this.recipe.ingredients);
    } else {
      this.router.navigate(['/auth']);
    }
  }

  onEditRecipe() {
    if (this.authService.isLoggedIn()) {
      this.router.navigate(['edit'], { relativeTo: this.route });
    } else {
      this.router.navigate(['/auth']);
    }
  }

  onDeleteRecipe() {
    if (this.authService.isLoggedIn()) {
      this.recipeService.deleteRecipe(this.name);
      this.router.navigate(['/recipes']);
    } else {
      this.router.navigate(['/auth']);
    }
  }
}
