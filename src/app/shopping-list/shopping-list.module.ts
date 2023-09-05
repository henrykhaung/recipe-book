import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HeaderModule } from '../header/header.module';
import { ShoppingListRoutingModule } from './shopping-list-routing.module';

import { ShoppingListComponent } from './shopping-list.component';
import { ShoppingEditComponent } from './shopping-edit/shopping-edit.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ShoppingListResolver } from './shopping-list-resolver.service';

@NgModule({
  declarations: [ShoppingListComponent, ShoppingEditComponent],
  imports: [
    CommonModule,
    HeaderModule,
    ShoppingListRoutingModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [ShoppingListResolver]
})
export class ShoppingListModule {}
