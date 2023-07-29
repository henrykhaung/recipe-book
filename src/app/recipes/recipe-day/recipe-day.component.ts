import { Component, OnDestroy, OnInit } from '@angular/core';
import { trigger, query, style, animate, transition } from '@angular/animations';
import { RecipeService } from '../recipe.service';
import { Recipe } from '../recipe.model';
import { ActivatedRoute, Params } from '@angular/router';

export const fadeAnimation = trigger('fadeAnimation', [
  transition('* => *', [
    query(':enter', [style({ opacity: 0, position: 'absolute' })], { optional: true }),
    query(':leave', [style({ opacity: 1 }), animate('0.3s', style({ opacity: 0, position: 'absolute' }))], { optional: true }),
    query(':enter', [style({ opacity: 0 }), animate('0.3s', style({ opacity: 1, position: 'relative' }))], { optional: true })
  ]),
]);

@Component({
  selector: 'app-recipe-day',
  templateUrl: './recipe-day.component.html',
  styleUrls: ['./recipe-day.component.css'],
  animations: [fadeAnimation]
})
export class RecipeDayComponent implements OnInit, OnDestroy {
  recipes: Recipe[];
  recipename: string;
  activeSlideIndex = 0;
  autoplayInterval: any;
  carouselState = true;

  constructor(
    private recipeService: RecipeService,
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params.subscribe(
      (params: Params) => {
        this.recipename = params['name'];
      }
    );
    this.startAutoplay();
    this.recipes = this.recipeService.getRecipes();
  }

  ngOnDestroy() {
    this.stopAutoplay();
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
    return this.recipes.slice(this.activeSlideIndex*3, (this.activeSlideIndex*3)+3);
  }

  next() {
    this.activeSlideIndex++;
    if (this.activeSlideIndex > this.recipes.length / 3 - 1){
      this.activeSlideIndex = 0;
    }
}

  prev() {
    this.activeSlideIndex--;
    if (this.activeSlideIndex < 0){
      this.activeSlideIndex = (this.recipes.length / 3 - 1);
    }
  }
  
}

