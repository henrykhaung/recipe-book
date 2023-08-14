import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import {
  trigger,
  query,
  style,
  animate,
  transition,
} from '@angular/animations';
import { RecipeService } from '../recipe.service';
import { Recipe } from '../recipe.model';
import { ActivatedRoute, Params } from '@angular/router';
import { DataService } from 'src/app/shared/data.service';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';
import {
  NgbCarousel,
  NgbCarouselConfig,
  NgbSlideEvent,
  NgbSlideEventSource,
} from '@ng-bootstrap/ng-bootstrap';
import { NgxMasonryOptions } from 'ngx-masonry';
import { auto } from '@popperjs/core';

export const fadeAnimation = trigger('fadeAnimation', [
  transition('* => *', [
    query(':enter', [style({ opacity: 0 })], { optional: true }),
    query(':enter', [style({ position: 'absolute' })], { optional: true }),
    query(
      ':leave',
      [
        style({ opacity: 1 }),
        animate('0.3s', style({ opacity: 0 })),
        style({ position: 'absolute' }),
      ],
      { optional: true }
    ),
    query(
      ':enter',
      [
        style({ opacity: 0 }),
        animate('0.3s', style({ opacity: 1 })),
        style({ position: 'relative' }),
      ],
      { optional: true }
    ),
  ]),
]);

@Component({
  selector: 'app-recipe-day',
  templateUrl: './recipe-day.component.html',
  styleUrls: ['./recipe-day.component.css'],
  animations: [fadeAnimation],
})
export class RecipeDayComponent implements OnInit, OnDestroy {
  masonryOptions: NgxMasonryOptions = {
    fitWidth: true,
    gutter: 30,
    columnWidth: 320,
  };
  recipes: Recipe[];
  todayRecipes: Recipe[];
  recipename: string;

  paused = false;
  unpauseOnArrow = false;
  pauseOnHover = true;
  pauseOnFocus = true;

  userSubscription: Subscription;
  loggedIn = false;
  isLoading = true;

  constructor(
    private recipeService: RecipeService,
    private route: ActivatedRoute,
    private data: DataService,
    private authService: AuthService,
    private carouselConfig: NgbCarouselConfig
  ) {
    carouselConfig.showNavigationArrows = true;
    carouselConfig.showNavigationIndicators = true;
    carouselConfig.interval = 5000;
  }

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.recipename = params['name'];
    });

    this.userSubscription = this.authService.user.subscribe((user) => {
      if (user) {
        this.loggedIn = true;
        this.data.fetchRecipes().subscribe((recipes) => {
          this.recipes = this.recipeService.getRecipes();
        });
      }
      this.data.fetchServerRecipes().subscribe((recipes) => {
        this.todayRecipes = this.recipeService.getRecipes();
      });
      this.isLoading = false;
    });
  }

  ngOnDestroy() {
    this.userSubscription.unsubscribe();
  }

  @ViewChild('carousel', { static: true }) carousel: NgbCarousel;

  togglePaused() {
    if (this.paused) {
      this.carousel.cycle();
    } else {
      this.carousel.pause();
    }
    this.paused = !this.paused;
  }

  onSlide(slideEvent: NgbSlideEvent) {
    if (
      this.unpauseOnArrow &&
      slideEvent.paused &&
      (slideEvent.source === NgbSlideEventSource.ARROW_LEFT ||
        slideEvent.source === NgbSlideEventSource.ARROW_RIGHT)
    ) {
      this.togglePaused();
    }
    if (!slideEvent.paused) {
      this.togglePaused();
    }
  }
}
