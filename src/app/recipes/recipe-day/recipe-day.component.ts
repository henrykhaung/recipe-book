import {
  Component,
  OnDestroy,
  OnInit,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
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

@Component({
  selector: 'app-recipe-day',
  templateUrl: './recipe-day.component.html',
  styleUrls: ['./recipe-day.component.css'],
  encapsulation: ViewEncapsulation.None,
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
        console.log('hey');
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
