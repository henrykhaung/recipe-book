import { NgModule, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';

import { HeaderModule } from '../header/header.module';
import { HomeRoutingModule } from './home-routing.module';
import { NgbCarouselModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxMasonryModule } from 'ngx-masonry';

import { MasonryRecipesResolver } from './masonry-recipes-resolver.service';
import { DailyRecipesResolver } from './daily-recipes-resolver.service';
import { ActivatedRoute } from '@angular/router';
import { Recipe } from '../models/recipe.model';
import { MasonryRecipesComponent } from './masonry-recipes/masonry-recipes.component';
import { DailyRecipesComponent } from './daily-recipes/daily-recipes.component';

@NgModule({
  declarations: [HomeComponent, MasonryRecipesComponent, DailyRecipesComponent],
  imports: [
    CommonModule,
    HeaderModule,
    HomeRoutingModule,
    NgxMasonryModule,
    NgbCarouselModule,
  ],
  providers: [DailyRecipesResolver, MasonryRecipesResolver],
})
export class HomeModule implements OnInit {
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
