import axios, {AxiosPromise} from 'axios';
import {ENDPOINT} from "../constants/api";
import {Ingredient} from "../types/Ingredient";

const route = 'ingredient';

export const getIngredients = ({selectedTag}: {selectedTag?: string}): AxiosPromise<Ingredient[]> => {

    const params: {[key: string]: string} = {};

    if (selectedTag) {
        params.tags = selectedTag;
    }
    return axios.get(`${ENDPOINT}${route}`, {
        params
    })
}