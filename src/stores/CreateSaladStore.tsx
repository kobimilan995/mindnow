import {makeObservable, observable, action, computed} from 'mobx';
import {Ingredient} from "../types/Ingredient";
import * as ingredientsApi from "../api/ingredients";
import {
    SORT_ORDER_ASC,
    SORT_ORDER_DESC,
    SORTING_WIDGET_CALORIES_ASC,
    SORTING_WIDGET_CALORIES_DESC
} from "../constants/sorting";
import {Salad} from "../types/Salad";
import * as saladsApi from "../api/salads";

export class CreateSaladStore {
    constructor() {
        makeObservable(this)
    }

    @observable ingredients: Ingredient[] = [];
    @observable ingredientsById: { [key: string]: Ingredient } = {};
    @observable searchQuery: string = '';
    @observable selectionDictionary: { [key: string]: boolean } = {}
    @observable sortingValue: typeof SORTING_WIDGET_CALORIES_ASC | typeof SORTING_WIDGET_CALORIES_DESC | "" = "";

    @action
    setIngredients = (ingredients: Ingredient[], ingredientsById: { [key: string]: Ingredient }) => {
        this.ingredients = ingredients;
        this.ingredientsById = ingredientsById;
    }

    @action
    setSearchQuery = (query: string) => {
        this.searchQuery = query;
    }

    @action
    setSortingValue = ({sortingValue}: { sortingValue: typeof SORTING_WIDGET_CALORIES_ASC | typeof SORTING_WIDGET_CALORIES_DESC | "" }) => {
        this.sortingValue = sortingValue;
    }

    @computed
    get filteredIngredients() {
        const ingredientIds = this.ingredients.filter(ingredient => {
            return (ingredient.name.toLocaleLowerCase()).includes(this.searchQuery.toLocaleLowerCase());
        });
        if (this.sortingValue) {
            ingredientIds.sort((a, b) => {
                if (a.caloriesCount < b.caloriesCount) {
                    return this.sortingValue === SORTING_WIDGET_CALORIES_ASC ? -1 : 1;
                } else {
                    return this.sortingValue === SORTING_WIDGET_CALORIES_ASC ? 1 : -1;
                }
            });
        }

        return ingredientIds;
    }

    @computed
    get selectedIngredientIds() {
        return Object.keys(this.selectionDictionary).filter((ingredientId) => this.selectionDictionary[ingredientId]);
    }

    @computed
    get caloriesCount(): number {
        if (this.selectedIngredientIds.length === 0) {
            return 0;
        }
        let caloriesCount = 0;
        this.selectedIngredientIds.forEach(selectedIngredientId => {
            caloriesCount += this.ingredientsById[selectedIngredientId].caloriesCount;
        })

        return caloriesCount;
    }

    @action
    toggleIngredientSelection = (ingredientId: string) => {
        const selectionDictionaryCopy = {...this.selectionDictionary};
        if (typeof selectionDictionaryCopy[ingredientId] === "undefined") {
            selectionDictionaryCopy[ingredientId] = true;
        } else {
            selectionDictionaryCopy[ingredientId] = !selectionDictionaryCopy[ingredientId];
        }
        this.selectionDictionary = selectionDictionaryCopy;
    }

    getIngredients = (args: {
        order?: typeof SORT_ORDER_ASC | typeof SORT_ORDER_DESC,
        sortBy?: string,
        tags?: string
    }) => {
        const ingredientsById: { [key: string]: Ingredient } = {};
        return ingredientsApi.getIngredients(args)
            .then(response => {
                response.data.forEach(ingredient => {
                    ingredientsById[ingredient.id] = ingredient;
                })
                this.setIngredients(response.data, ingredientsById);
                return Promise.resolve();
            })
    }

    storeSalad = (salad: Omit<Salad, 'id'>) => {
        return saladsApi.storeSalad({salad});
    }
}