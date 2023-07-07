import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-recipe-add',
  templateUrl: './recipe-add.component.html',
  styleUrls: ['./recipe-add.component.css']
})
export class RecipeAddComponent implements OnInit {
  recipeName: any;
  constructor(private route: ActivatedRoute, private recipeService: RecipeService) {}
  
  ngOnInit() {
    this.route.params.subscribe(
      (params: Params) => {
        this.recipeName = params['name'];
      }
    );
  }

}
