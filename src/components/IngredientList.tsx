import React, {useEffect} from 'react';
import queryString from 'query-string';
import {Link, useHistory, useLocation} from 'react-router-dom';
import {observer} from "mobx-react-lite";
import {IngredientListItem} from "./IngredientListItem";
import {INGREDIENTS_PAGE_ROUTE} from "../constants/routes";
import {SORT_ORDER_ASC, SORT_ORDER_DESC} from "../constants/sorting";
import {Ingredient} from "../types/Ingredient";


type Props = {
    ingredients: Ingredient[];
    order?: typeof SORT_ORDER_DESC | typeof SORT_ORDER_ASC;
    sortBy?: string;
}

export const IngredientList = observer(({ingredients, order, sortBy}: Props) => {
    const history = useHistory();

    return (
        <div className="container">
            <div className="row">
                {ingredients.map(ingredient => {
                    return <IngredientListItem key={ingredient.id} ingredient={ingredient} onTagSelect={(tag) => {
                        history.push(`${INGREDIENTS_PAGE_ROUTE}?${queryString.stringify({order, sortBy, tags: tag})}`);
                    }}/>
                })}
            </div>
        </div>
    );
});

