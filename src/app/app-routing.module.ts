import { NgModule } from "@angular/core";
import { Routes, RouterModule, Router } from "@angular/router";
import { RecipeDetailComponent } from "./recipes/recipe-detail/recipe-detail.component";
import { RecipeEditComponent } from "./recipes/recipe-edit/recipe-edit.component";
import { RecipesStartComponent } from "./recipes/recipes-start/recipes-start.component";
import { RecipesComponent } from "./recipes/recipes.component";
import { ShoppingListComponent } from "./shopping-list/shopping-list.component";

const appRoutes: Routes = [
    { path: '', redirectTo: '/recipes', pathMatch: 'full' },
    { path: 'recipes', component: RecipesComponent, children: [
        { path: '', component: RecipesStartComponent },
        { path: 'add', component: RecipeEditComponent},
        { path: ':name', component: RecipeDetailComponent },
        { path: ':name/edit', component: RecipeEditComponent}
    ]},
    { path: 'shopping-list', component: ShoppingListComponent },
    { path: 'not-found', component: RecipesComponent }, // TODO: change this to an actual 404 page
    { path: '**', redirectTo:'not-found', pathMatch: 'full' }
];

@NgModule({
    imports: [
        RouterModule.forRoot(appRoutes)
    ],
    exports: [RouterModule]
})
export class AppRoutingModule {

}