import {makeObservable, observable, action} from 'mobx';
import {Ingredient} from "../types/Ingredient";
import * as ingredientsApi from "../api/ingredients";
import {SORT_ORDER_ASC, SORT_ORDER_DESC} from "../constants/sorting";
import {AxiosPromise} from "axios";

export class IngredientsStore {
    constructor() {
        makeObservable(this)
    }

    @observable ingredients: Ingredient[] = [];

    @action
    setIngredients = (ingredients: Ingredient[]) => {
        this.ingredients = ingredients;
    }

    getIngredients = (args: {
        order?: typeof SORT_ORDER_ASC | typeof SORT_ORDER_DESC,
        sortBy?: string,
        tags?: string
    }) => {
        return ingredientsApi.getIngredients(args)
            .then(response => {
                this.setIngredients(response.data);
                return Promise.resolve();
            })
    }

    storeIngredient = (ingredient: Omit<Ingredient, 'id'>): AxiosPromise<void> => {
        return ingredientsApi.storeIngredient(ingredient);
    }
}