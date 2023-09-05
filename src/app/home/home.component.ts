import { Component } from '@angular/core';
import {
  ActivatedRoute,
  NavigationEnd,
  Router,
  UrlSegment,
} from '@angular/router';
import { Recipe } from '../models/recipe.model';
import { BehaviorSubject, filter } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  recipes: Recipe[];
  todayRecipes: Recipe[];

  isHomeDetail$ = new BehaviorSubject<boolean>(false);

  constructor(private router: Router, private route: ActivatedRoute) {
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        const result =
          event.urlAfterRedirects.includes('today-recipe') ||
          event.urlAfterRedirects.includes('more-recipe');
        this.isHomeDetail$.next(result);
      });
  }

  ngOnInit() {
    this.route.data.subscribe(
      (data: { recipes: Recipe[]; todayRecipes: Recipe[] }) => {
        this.recipes = data.recipes;
        this.todayRecipes = data.todayRecipes;
      }
    );
  }
}
