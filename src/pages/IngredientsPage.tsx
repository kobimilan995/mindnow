import React from 'react';
import {useParams} from 'react-router-dom';
import {IngredientList} from "../components";

export const IngredientsPage = () => {
    const params = useParams();
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    console.log({
        sortBy: urlParams.get('sortBy'),
        selectedTag: urlParams.get('tag'),
        order: urlParams.get('order'),
    });
    return (
        <div>
            <IngredientList/>
        </div>
    );
}