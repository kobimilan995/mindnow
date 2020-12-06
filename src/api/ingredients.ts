import axios, {AxiosPromise} from 'axios';
import {ENDPOINT} from "../constants/api";
import {Ingredient} from "../types/Ingredient";
import {SORT_ORDER_ASC, SORT_ORDER_DESC} from "../constants/sorting";

const route = 'ingredient';

export type GetIngredientsArgumentsType = {
    tags?: string;
    sortBy?: string;
    order?: typeof SORT_ORDER_ASC | typeof SORT_ORDER_DESC;
}

export const getIngredients = (params: GetIngredientsArgumentsType): AxiosPromise<Ingredient[]> => {
    return axios.get(`${ENDPOINT}${route}`, {
        params
    })
}