import axios, {AxiosPromise} from 'axios';
import {ENDPOINT} from "../constants/api";
import {Ingredient} from "../types/Ingredient";

const route = 'ingredient';

export const getIngredients = (): AxiosPromise<Ingredient[]> => {
    return axios.get(`${ENDPOINT}${route}`)
}