import {makeObservable, observable, action} from 'mobx';
import {Ingredient} from "../types/Ingredient";
import {getIngredients} from "../api/ingredients";

export class IngredientsStore {
    constructor() {
        makeObservable(this)
    }
    @observable ingredients: Ingredient[] = [];

    @action
    setIngredients = (ingredients: Ingredient[]) => {
        this.ingredients = ingredients;
    }

    getIngredients = async () => {
        try {
            const response = await getIngredients();
            this.setIngredients(response.data);
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