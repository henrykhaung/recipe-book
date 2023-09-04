import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { Recipe } from 'src/app/models/recipe.model';
import { ActivatedRoute, Params } from '@angular/router';
import {
  NgbCarousel,
  NgbCarouselConfig,
  NgbSlideEvent,
  NgbSlideEventSource,
} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-daily-recipes',
  templateUrl: './daily-recipes.component.html',
  styleUrls: ['./daily-recipes.component.css'],
})
export class DailyRecipesComponent implements OnInit {
  @Input() todayRecipes: Recipe[];
  recipename: string;

  paused = false;
  unpauseOnArrow = false;
  pauseOnHover = true;
  pauseOnFocus = true;
  isLoading = true;

  constructor(
    private route: ActivatedRoute,
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
    console.log('daily', this.todayRecipes);
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
