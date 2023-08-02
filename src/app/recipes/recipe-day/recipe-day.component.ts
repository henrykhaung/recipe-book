import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  trigger,
  query,
  style,
  animate,
  transition,
} from '@angular/animations';
import { RecipeService } from '../recipe.service';
import { Recipe } from '../recipe.model';
import { ActivatedRoute, Params } from '@angular/router';
import { DataService } from 'src/app/shared/data.service';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';

export const fadeAnimation = trigger('fadeAnimation', [
  transition('* => *', [
    query(':enter', [style({ opacity: 0, position: 'absolute' })], {
      optional: true,
    }),
    query(
      ':leave',
      [
        style({ opacity: 1 }),
        animate('0.3s', style({ opacity: 0, position: 'absolute' })),
      ],
      { optional: true }
    ),
    query(
      ':enter',
      [
        style({ opacity: 0 }),
        animate('0.3s', style({ opacity: 1, position: 'relative' })),
      ],
      { optional: true }
    ),
  ]),
]);

@Component({
  selector: 'app-recipe-day',
  templateUrl: './recipe-day.component.html',
  styleUrls: ['./recipe-day.component.css'],
  animations: [fadeAnimation],
})
export class RecipeDayComponent implements OnInit, OnDestroy {
  recipes: Recipe[];
  recipename: string;
  activeSlideIndex = 0;
  autoplayInterval: any;
  carouselState = true;

  userSubscription: Subscription;
  isLoading = true;

  constructor(
    private recipeService: RecipeService,
    private route: ActivatedRoute,
    private data: DataService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.recipename = params['name'];
    });

    this.userSubscription = this.authService.user.subscribe((user) => {
      if (user) {
        this.data.fetchRecipes().subscribe((recipes) => {
          this.recipes = this.recipeService.getRecipes();
          if (this.recipes.length > 0) {
            this.isLoading = false;
            this.startAutoplay();
          }
        });
      } else {
        this.data.fetchServerRecipes().subscribe((recipes) => {
          this.recipes = this.recipeService.getRecipes();
          if (this.recipes.length > 0) {
            this.isLoading = false;
          }
        });
      }
    });
  }

  ngOnDestroy() {
    this.stopAutoplay();
    this.userSubscription.unsubscribe();
  }

  startAutoplay() {
    this.autoplayInterval = setInterval(() => {
      this.next();
    }, 5000);
  }

  stopAutoplay() {
    clearInterval(this.autoplayInterval);
  }

  getActiveRecipes() {
    return this.recipes.slice(
      this.activeSlideIndex * 3,
      this.activeSlideIndex * 3 + 3
    );
  }

  next() {
    this.activeSlideIndex++;
    if (this.activeSlideIndex > this.recipes.length / 3 - 1) {
      this.activeSlideIndex = 0;
    }
  }

  prev() {
    this.activeSlideIndex--;
    if (this.activeSlideIndex < 0) {
      this.activeSlideIndex = this.recipes.length / 3 - 1;
    }
  }
}
