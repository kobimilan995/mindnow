import React from 'react';
import {useParams} from 'react-router-dom';
import {IngredientList} from "../components";

export const IngredientsPage = () => {
    const {tag} = useParams<{tag?: string}>();
    console.log({tag});
    return (
        <div>
            <IngredientList selectedTag={tag}/>
        </div>
    );
}