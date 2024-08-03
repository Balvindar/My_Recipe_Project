import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { Observable } from "rxjs";
import { DataStorageService } from "../shared/data-storage.service";
import { Recipe } from "./recipe.model";
import { RecipeService } from "./recipe.service";


@Injectable({
    providedIn: 'root'
})
export class RecipesResolver implements Resolve<Recipe[]>{

    constructor(private dataStorageService: DataStorageService, private recipeService: RecipeService) { }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Recipe[] | Observable<Recipe[]> | Promise<Recipe[]> {
        const recipe = this.recipeService.getRecipes();

        if (recipe.length === 0) {
            return this.dataStorageService.fetchRecipes();
        } else {
            return recipe;
        }

    }
}