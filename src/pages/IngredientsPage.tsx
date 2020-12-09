import React, {useEffect} from 'react';
import {IngredientList, SortingWidget} from "../components";
import {SORT_ORDER_ASC, SORT_ORDER_DESC} from "../constants/sorting";
import queryString from "query-string";
import {Link, useLocation} from "react-router-dom";
import {useRootStore} from "../contexts/RootStateContext";
import {observer} from "mobx-react-lite";
import {NEW_INGREDIENT_PAGE} from "../constants/routes";


const useQuery = ():{
    order?: typeof SORT_ORDER_ASC | typeof SORT_ORDER_DESC,
    sortBy?: string,
    tags?: string
}  => {
    return queryString.parse(useLocation().search);
}


export const IngredientsPage = observer(() => {
    const {ingredientsStore} = useRootStore();
    const {getIngredients, ingredients} = ingredientsStore;
    const query = useQuery();
    useEffect(() => {
        const {order, sortBy, tags} = query;
        getIngredients({order, sortBy, tags});
    }, [query.tags, query.order, query.sortBy]);
    const {tags, order, sortBy} = query;

    return (
        <div>
            <div className="d-flex row align-items-center justify-content-between">
                <SortingWidget order={order} sortBy={sortBy} tags={tags}/>
                <Link to={NEW_INGREDIENT_PAGE} className="btn btn-primary mt-4 mb-4">New Ingredient</Link>
            </div>
            <IngredientList ingredients={ingredients} sortBy={sortBy} order={order}/>
        </div>
    );
})