import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderRoutingModule } from './header-routing.module';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';

import { HeaderComponent } from './header.component';

@NgModule({
  declarations: [HeaderComponent],
  imports: [CommonModule, HeaderRoutingModule, NgbDropdownModule],
  exports: [HeaderComponent],
})
export class HeaderModule {}
