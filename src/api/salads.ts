import axios, {AxiosPromise} from 'axios';
import {ENDPOINT} from "../constants/api";
import {SORT_ORDER_ASC, SORT_ORDER_DESC} from "../constants/sorting";
import {Salad} from "../types/Salad";

const route = 'salad';

export type GetSaladsArgumentsType = {
    tags?: string;
    sortBy?: string;
    order?: typeof SORT_ORDER_ASC | typeof SORT_ORDER_DESC;
}

export const getSalads = (params: GetSaladsArgumentsType): AxiosPromise<Salad[]> => {
    return axios.get(`${ENDPOINT}${route}`, {
        params
    })
}
//
// export const storeIngredient = ({name, image, caloriesCount, tags}: Omit<Ingredient, 'id'>): AxiosPromise<void> => {
//     return axios.post(`${ENDPOINT}${route}`, {
//         name,
//         image,
//         caloriesCount,
//         tags
//     })
// }