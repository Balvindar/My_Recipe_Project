import { SlicePipe } from "@angular/common";
import { EventEmitter, Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { Ingredient } from "../shared/ingredient.model";
import { ShoppingListService } from "../shopping-list/shopping-list.service";
import { RecipeEditComponent } from "./recipe-edit/recipe-edit.component";
import { Recipe } from "./recipe.model";

@Injectable()

export class RecipeService {

    recipesChanged = new EventEmitter<Recipe[]>();


    // recipes: Recipe[] = [
    //     new Recipe('A Test Recipe', 'This is simply a Test', 'https://hips.hearstapps.com/hmg-prod/images/crepes-index-64347419e3c7a.jpg?crop=0.888888888888889xw:1xh;center,top&resize=1200:*',
    //         [
    //             new Ingredient('Meat', 1),
    //             new Ingredient('Friench Friesh', 20)
    //         ]),
    //     new Recipe('A Recipe', 'This is simply a Test', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQavHdVCUMoC90NPUobdxx66qJcSEHNnCiQb9IODfLi7w&s',
    //         [
    //             new Ingredient('Buns', 2),
    //             new Ingredient('Meat', 1)
    //         ])
    // ]


    recipes: Recipe[] = [];

    constructor(private slService: ShoppingListService) { }

    setRecipes(recipes: Recipe[]) {
        this.recipes = recipes;
        this.recipesChanged.next(this.recipes.slice());
    }

    getRecipes() {
        return this.recipes.slice();
    }

    getRecipe(index: number) {
        return this.recipes[index];
    }

    addIngredientsToShoppingList(ingredients: Ingredient[]) {
        this.slService.addIngredients(ingredients)
    }

    addRecipe(newRecipe: Recipe) {
        this.recipes.push(newRecipe);
        this.recipesChanged.next(this.recipes.slice());
    }

    updateRecipe(index: number, newRecipe: Recipe) {
        this.recipes[index] = newRecipe;
        this.recipesChanged.next(this.recipes.slice());
    }

    deleteRecipe(index: number) {
        this.recipes.splice(index, 1);
        this.recipesChanged.next(this.recipes.slice());
    }

}