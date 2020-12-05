import React from 'react';
import {useParams} from 'react-router-dom';
import {IngredientList} from "../components";

export const IngredientsPage = () => {
    const {tag} = useParams<{tag?: string}>();
    return (
        <div>
            <IngredientList selectedTag={tag}/>
        </div>
    );
}