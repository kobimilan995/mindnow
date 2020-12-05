import React, {useEffect} from 'react';
import {IngredientListItem} from "./IngredientListItem";
import {observer} from "mobx-react-lite";
import {useRootStore} from "../contexts/RootStateContext";

export const IngredientList = observer(() => {
    const {ingredientsStore} = useRootStore();
    const {ingredients, getIngredients} = ingredientsStore;

    useEffect(() => {
        getIngredients();
    }, [getIngredients]);
    return (
        <div className="container">
            <div className="row">
                {ingredients.map(ingredient => {
                    return <IngredientListItem key={ingredient.id} ingredient={ingredient}/>
                })}
            </div>
        </div>
    );
});

