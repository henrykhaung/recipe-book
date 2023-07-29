import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { RecipeService } from "../recipes/recipe.service";

@Injectable()
export class DataService {
    constructor(
        private httpClient: HttpClient,
        private recipeService: RecipeService) {}

    // storeRecipes() {
    //     const recipes = this.recipeService.getRecipes();
    //     this.httpClient.put
    // }
}
