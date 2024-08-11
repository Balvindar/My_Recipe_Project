import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map, tap, take, exhaustMap } from "rxjs/operators";
import { AuthService } from "../auth/auth.service";
import { Recipe } from "../recipes/recipe.model";
import { RecipeService } from "../recipes/recipe.service";

@Injectable({
    providedIn: 'root'
})
export class DataStorageService {

    constructor(private http: HttpClient,
        private recipeService: RecipeService, private authService: AuthService) { }


    // storing recipes
    storeRecipes() {
        const recipes = this.recipeService.getRecipes();
        this.http.put('https://ng-course-recipe-book-95628-default-rtdb.firebaseio.com/recipes.json', recipes).subscribe(response => {
            console.log('this is my response', response);
        })
    }

    // fetching recipes
    fetchRecipes() {

        return this.authService.user.pipe(take(1), exhaustMap(user => {
            return this.http.get<Recipe[]>('https://ng-course-recipe-book-95628-default-rtdb.firebaseio.com/recipes.json',
                {
                    params: new HttpParams().set('auth', user.token)
                })
        }), (map(response => {
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