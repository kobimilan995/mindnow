import {makeObservable, observable, action} from 'mobx';
import {Ingredient} from "../types/Ingredient";
import * as ingredientsApi from "../api/ingredients";
import {SORT_ORDER_ASC, SORT_ORDER_DESC} from "../constants/sorting";

export class IngredientsStore {
    constructor() {
        makeObservable(this)
    }

    @observable ingredients: Ingredient[] = [];

    @action
    setIngredients = (ingredients: Ingredient[]) => {
        this.ingredients = ingredients;
    }

    getIngredients = ({order, sortBy, tags}: {
        order?: typeof SORT_ORDER_ASC | typeof SORT_ORDER_DESC,
        sortBy?: string,
        tags?: string
    }) => {
        ingredientsApi.getIngredients({order, sortBy, tags})
            .then(response => {
                this.setIngredients(response.data);
            })
    }
}