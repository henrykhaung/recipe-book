import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { HomeModule } from './home/home.module';
import { HeaderModule } from './header/header.module';
import { RecipesModule } from './recipes/recipes.module';
import { ShoppingListModule } from './shopping-list/shopping-list.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxMasonryModule } from 'ngx-masonry';
import { NgbCarouselModule } from '@ng-bootstrap/ng-bootstrap';

import { AppComponent } from './app.component';
import { LoadingSpinnerComponent } from '../assets/loading-spinner/loading-spinner.component';
import { AuthComponent } from './auth/auth.component';
import { NotFoundComponent } from './not-found/not-found.component';

import { RecipeService } from './services/recipe.service';
import { ShoppingListService } from 'src/app/services/shopping-list.service';
import { DataService } from './services/data.service';
import { AuthService } from './services/auth.service';

import { AuthGuard } from './auth/auth.guard';
import { RecipesRoutingModule } from './recipes/recipes-routing.module';

@NgModule({
  declarations: [
    AppComponent,
    AuthComponent,
    LoadingSpinnerComponent,
    NotFoundComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    HeaderModule,
    HomeModule,
    RecipesModule,
    RecipesRoutingModule,
    ShoppingListModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    NgxMasonryModule,
    NgbCarouselModule,
  ],
  providers: [
    RecipeService,
    ShoppingListService,
    DataService,
    AuthService,
    AuthGuard,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
