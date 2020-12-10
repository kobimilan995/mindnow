import axios, {AxiosPromise} from 'axios';
import qs from 'qs';
import {ENDPOINT} from "../constants/api";
import {Ingredient} from "../types/Ingredient";
import {SORT_ORDER_ASC, SORT_ORDER_DESC} from "../constants/sorting";

const route = 'ingredient';

export type GetIngredientsArgumentsType = {
    tags?: string;
    sortBy?: string;
    order?: typeof SORT_ORDER_ASC | typeof SORT_ORDER_DESC;
    id?: string[]
}

export const getIngredients = (params: GetIngredientsArgumentsType): AxiosPromise<Ingredient[]> => {
    let ingredientsEndpoint = `${ENDPOINT}${route}`;
    if (params.id) {
        ingredientsEndpoint = `${ingredientsEndpoint}?id=[${params.id.join(',')}]`
    }
    return axios.get(ingredientsEndpoint, {
        params,
        paramsSerializer: params => {
            return qs.stringify(params)
        }
    })
}

export const storeIngredient = ({name, image, caloriesCount, tags}: Omit<Ingredient, 'id'>): AxiosPromise<void> => {
    return axios.post(`${ENDPOINT}${route}`, {
        name,
        image,
        caloriesCount,
        tags
    })
}

export const getIngredient = ({id}: { id: string }): AxiosPromise<Ingredient> => {
    return axios.get(`${ENDPOINT}${route}/${id}`)
}
export const updateIngredient = ({id, ingredient}: { id: string, ingredient: Omit<Ingredient, 'id'> }): AxiosPromise<Ingredient> => {
    return axios.put(`${ENDPOINT}${route}/${id}`, ingredient);
}
export const deleteIngredient = ({id}: { id: string }): AxiosPromise<void> => {
    return axios.delete(`${ENDPOINT}${route}/${id}`)
}