import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ShoppingListComponent } from './shopping-list.component';
import { ShoppingListResolver } from './shopping-list-resolver.service';

const routes: Routes = [{ path: '', component: ShoppingListComponent, resolve: {shoppingList: ShoppingListResolver}}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ShoppingListRoutingModule { }
