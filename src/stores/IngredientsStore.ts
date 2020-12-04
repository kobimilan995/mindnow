import {makeObservable, observable, action} from 'mobx';
import {Ingredient} from "../types/Ingredient";
import {getIngredients} from "../api/ingredients";

export class IngredientsStore {
    constructor() {
        makeObservable(this)
    }
    @observable ingredients: Ingredient[] = [];

    @action
    getIngredients = async () => {
        // this.ingredients = [{id: 'asd', name: 'asd', image: 'asd', caloriesCount: 123}];
        try {
            const response = await getIngredients();
            console.log({response})
            this.ingredients = response.data;
        } catch (e) {
            console.error(e);
        }
    }

    @action
    addIngredient = (ingredient: Ingredient) => {
        // post request to store ingredient
        // add to array
    }
}