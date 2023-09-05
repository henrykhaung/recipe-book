import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Recipe } from 'src/app/models/recipe.model';

import { ActivatedRoute, Params, Data } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { NgxMasonryOptions } from 'ngx-masonry';

@Component({
  selector: 'app-masonry-recipes',
  templateUrl: './masonry-recipes.component.html',
  styleUrls: ['./masonry-recipes.component.css'],
})
export class MasonryRecipesComponent implements OnInit, OnDestroy {
  @Input() todayRecipes: Recipe[];
  @Input() recipes: Recipe[];
  recipename: string;

  masonryOptions: NgxMasonryOptions = {
    fitWidth: true,
    gutter: 30,
    columnWidth: 320,
  };

  userSubscription: Subscription;
  loggedIn = false;
  isLoading = true;

  constructor(private route: ActivatedRoute, public authService: AuthService) {}
  // authService must be public to resolve issue of user logging out and home page not displaying correct headers

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.recipename = params['name'];
    });

    this.userSubscription = this.authService.user.subscribe((user) => {
      if (user) {
        this.loggedIn = true;
        this.isLoading = false;
      } else {
        this.isLoading = false;
        this.recipes = this.todayRecipes.slice();
      }
    });

    console.log('masonry', this.recipes, this.todayRecipes);
  }

  ngOnDestroy() {
    this.userSubscription.unsubscribe();
  }
}
