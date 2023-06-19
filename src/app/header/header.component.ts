import { Component, EventEmitter, Output, TemplateRef } from '@angular/core';
import { NgbOffcanvas } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})

export class HeaderComponent {  
  /* search bar START */
  collapsed = true;
  searchVisible = false;
  toggleSearch() {
    this.searchVisible = !this.searchVisible;
  }
  /* search bar END */

  /* offcanvas START */
  constructor(private offcanvasService: NgbOffcanvas) {}
  openOffcanvas(content: TemplateRef<any>) {
    this.offcanvasService.open(content, { position: 'end', scroll: true, animation: true });
  }
  /* offcanvas END */

  /* links START*/
  @Output() featureSelected = new EventEmitter<string>();

  onSelect(feature: string) {
    this.featureSelected.emit(feature);
  }
  /* links END*/

}
