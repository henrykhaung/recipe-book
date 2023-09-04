import {
  Component,
  EventEmitter,
  OnDestroy,
  OnInit,
  Output,
  TemplateRef,
} from '@angular/core';
import { NgbOffcanvas } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from '../services/auth.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  isAuthenticated = false;
  private userSubscription: Subscription;

  /* search bar START */
  collapsed = true;
  searchVisible = false;
  toggleSearch() {
    this.searchVisible = !this.searchVisible;
  }
  /* search bar END */

  /* offcanvas START */
  constructor(
    private offcanvasService: NgbOffcanvas,
    private authService: AuthService,
    private route: Router
  ) {}

  openOffcanvas(content: TemplateRef<any>) {
    this.offcanvasService.open(content, {
      position: 'end',
      scroll: true,
      animation: true,
    });
  }
  /* offcanvas END */

  /* links START*/
  @Output() featureSelected = new EventEmitter<string>();

  onSelect(feature: string) {
    this.featureSelected.emit(feature);
  }
  /* links END*/

  ngOnInit() {
    this.userSubscription = this.authService.user.subscribe((user) => {
      this.isAuthenticated = user ? true : false;
    });
  }

  ngOnDestroy() {
    this.userSubscription.unsubscribe();
  }

  onLogin() {
    this.route.navigate(['/auth']);
  }

  onLogout() {
    this.authService.logout();
  }
}
