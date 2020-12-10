import {makeObservable, observable, action} from 'mobx';
import {Salad} from "../types/Salad";
import * as saladsApi from "../api/salads";
import * as ingredientsApi from "../api/ingredients";
import {Ingredient} from "../types/Ingredient";

export class SaladDetailsStore {
    constructor() {
        makeObservable(this)
    }

    @observable salad: Salad | null = null;
    @observable isLoading: boolean = false;
    @observable ingredients: Ingredient[] = [];

    @action
    setSalad = (salad: Salad | null) => {
        this.salad = salad;
    }

    @action
    setIsLoading = (isLoading: boolean) => {
        this.isLoading = isLoading;
    }

    @action
    setIngredients = (ingredients: Ingredient[]) => {
        this.ingredients = ingredients;
    }

    getSalad = ({id}: { id: string }) => {
        this.setIsLoading(true);
        return saladsApi.getSalad({id})
            .then((response) => {
                this.setSalad(response.data);
                this.setIsLoading(false);
                this.getSaladIngredients({ids: response.data.ingredientIds});
                return Promise.resolve();
            });
    }

    getSaladIngredients = ({ids}: { ids: string[] }) => {
        ingredientsApi.getIngredients({id: ids})
            .then(response => {
                this.setIngredients(response.data);
            })
    }
}