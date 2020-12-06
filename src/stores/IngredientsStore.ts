import {makeObservable, observable, action} from 'mobx';
import {Ingredient} from "../types/Ingredient";
import {getIngredients, GetIngredientsArgumentsType} from "../api/ingredients";
import {SortingValuesType} from "../types/Sorting";

export class IngredientsStore {
    constructor() {
        makeObservable(this)
    }

    @observable ingredients: Ingredient[] = [];
    @observable sortingValues: SortingValuesType = null;
    @observable selectedTag: string | null = null;

    @action
    setIngredients = (ingredients: Ingredient[]) => {
        this.ingredients = ingredients;
    }

    @action
    setSortingValues = (sortingValues: SortingValuesType) => {
        this.sortingValues = sortingValues;
    }

    @action
    setSelectedTag = (selectedTag: string) => {
        this.selectedTag = selectedTag;
    }

    getIngredients = () => {
        const requestData: {[key: string]: string} = {};
        const {selectedTag, sortingValues} = this;
        if (selectedTag) {
            requestData.tags = selectedTag;
        }
        if (sortingValues && sortingValues.sortBy) {
            requestData.sortBy = sortingValues.sortBy;
            if (sortingValues.sortOrder) {
                requestData.order = sortingValues.sortOrder;
            }
        }
        console.log(requestData);
        getIngredients(requestData as GetIngredientsArgumentsType)
            .then(response => {
                this.setIngredients(response.data);
            })
    }

    @action
    addIngredient = (ingredient: Ingredient) => {
        // post request to store ingredient
        // add to array
    }
}