import React, {useEffect} from 'react';
import queryString from 'query-string';
import {Link, useHistory, useLocation} from 'react-router-dom';
import {observer} from "mobx-react-lite";
import {IngredientListItem} from "./IngredientListItem";
import {useRootStore} from "../contexts/RootStateContext";
import {SortingWidget} from "./SortingWidget";
import {INGREDIENTS_PAGE_ROUTE, NEW_INGREDIENT_PAGE} from "../constants/routes";
import {SORT_ORDER_ASC, SORT_ORDER_DESC} from "../constants/sorting";

const useQuery = ():{
    order?: typeof SORT_ORDER_ASC | typeof SORT_ORDER_DESC,
    sortBy?: string,
    tags?: string
}  => {
    return queryString.parse(useLocation().search);
}


export const IngredientList = observer(() => {
    const {ingredientsStore} = useRootStore();
    const {getIngredients, ingredients} = ingredientsStore;
    const query = useQuery();
    const history = useHistory();
    useEffect(() => {
        const {order, sortBy, tags} = query;
        getIngredients({order, sortBy, tags});
        console.log('called');
    }, [query.tags, query.order, query.sortBy]);
    const {tags, order, sortBy} = query;
    return (
        <div className="container">
            <div className="d-flex row align-items-center justify-content-between">
                <SortingWidget order={order} sortBy={sortBy} tags={tags}/>
                <Link to={NEW_INGREDIENT_PAGE} className="btn btn-primary mt-4 mb-4">New Ingredient</Link>
            </div>
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

