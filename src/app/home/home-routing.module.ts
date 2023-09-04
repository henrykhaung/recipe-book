import { NgModule, OnInit } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DailyRecipesResolver } from './daily-recipes-resolver.service';
import { MasonryRecipesResolver } from './masonry-recipes-resolver.service';
import { HomeComponent } from './home.component';
import { AuthGuard } from '../auth/auth.guard';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    resolve: {
      recipes: MasonryRecipesResolver,
      todayRecipes: DailyRecipesResolver,
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomeRoutingModule implements OnInit {
  ngOnInit() {}
}
