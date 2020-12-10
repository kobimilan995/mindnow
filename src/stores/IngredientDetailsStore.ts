import {makeObservable, observable, action} from 'mobx';
import {Ingredient} from "../types/Ingredient";
import * as ingredientsApi from "../api/ingredients";

export class IngredientDetailsStore {
    constructor() {
        makeObservable(this)
    }

    @observable ingredient: Ingredient | null = null;
    @observable isLoading: boolean = false;
    @observable deletedFlag: boolean = false;

    @action
    setIngredient = (ingredient: Ingredient | null) => {
        this.ingredient = ingredient;
    }

    @action
    setIsLoading = (value: boolean) => {
        this.isLoading = value;
    }

    @action
    setDeletedFlag = (value: boolean) => {
        this.deletedFlag = value;
    }

    getIngredient = ({id}: { id: string }) => {
        this.setIsLoading(true);
        return ingredientsApi.getIngredient({id})
            .then(response => {
                this.setIngredient(response.data);
                this.setIsLoading(false);
            });
    }

    updateIngredient = ({id, ingredient}: { id: string, ingredient: Omit<Ingredient, 'id'> }) => {
        return ingredientsApi.updateIngredient({id, ingredient})
            .then(response => {
                this.setIngredient(response.data);
                return Promise.resolve();
            })
            .catch(error => {
                console.log({error});
            })
    }

    deleteIngredient = ({id}: {id: string}) => {
        return ingredientsApi.deleteIngredient({id})
            .then(() => {
                this.setDeletedFlag(true);
                this.setIngredient(null);
                return Promise.resolve();
            });
    }
}