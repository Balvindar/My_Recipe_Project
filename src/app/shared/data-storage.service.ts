import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map, tap } from "rxjs/operators";
import { Recipe } from "../recipes/recipe.model";
import { RecipeService } from "../recipes/recipe.service";

@Injectable({
    providedIn: 'root'
})
export class DataStorageService {

    constructor(private http: HttpClient,
        private recipeService: RecipeService) { }


    // storing recipes
    storeRecipes() {
        const recipes = this.recipeService.getRecipes();
        this.http.put('https://ng-complete-guide-5499e-default-rtdb.firebaseio.com/recipes.json', recipes).subscribe(response => {
            console.log('this is my response', response);
        })
    }

    // fetching recipes
    fetchRecipes() {
        return this.http.get<Recipe[]>('https://ng-complete-guide-5499e-default-rtdb.firebaseio.com/recipes.json')
            .pipe((map(response => {
                return response.map(recipe => {
                    const recipeObj = {
                        ...recipe,
                        ingredients: recipe.ingredients ? recipe.ingredients : []
                    }
                    return recipeObj;
                })
            })), tap((recipes: any) => {
                this.recipeService.setRecipes(recipes);
            }))
    }
}