import { Component, Input } from '@angular/core';
import { ActivatedRoute, Params, Router, RouterStateSnapshot } from '@angular/router';
import { RouterTestingHarness } from '@angular/router/testing';
import { ShoppingListService } from 'src/app/shopping-list/shopping-list.service';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent {
  recipe!: Recipe;
  id!: number;
  constructor(private recipeService: RecipeService, private route: ActivatedRoute, private router: Router) { }


  ngOnInit() {
    this.route.params.subscribe((param: Params) => {
      this.id = +param['id'];
      this.recipe = this.recipeService.getRecipe(this.id);
    })
    console.log('Data before resolve', this.route);
    console.log('Routers', this.router);
    console.log('Final data', this.route.snapshot.data['recipeResolver']);
  }

  onAddToShoppingList() {
    this.recipeService.addIngredientsToShoppingList(this.recipe.ingredients);
  }

  onDeleteRecipe() {
    this.recipeService.deleteRecipe(this.id);
    this.router.navigate(['/recipes']);
  }

  onEditRecipe() {
    this.router.navigate(['edit'], { relativeTo: this.route });
    // this.router.navigate(['../', this.id, 'edit'], { relativeTo: this.route }); another way
  }

}
