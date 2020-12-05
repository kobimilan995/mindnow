import React, {useEffect} from 'react';
import {IngredientListItem} from "./IngredientListItem";
import {observer} from "mobx-react-lite";
import {useRootStore} from "../contexts/RootStateContext";

type Props = {
    selectedTag?: string;
}

export const IngredientList = observer(({selectedTag}: Props) => {
    const {ingredientsStore} = useRootStore();
    const {ingredients, getIngredients} = ingredientsStore;

    useEffect(() => {
        getIngredients({selectedTag});
    }, [getIngredients, selectedTag]);

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

