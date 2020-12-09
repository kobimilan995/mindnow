import React, {useEffect} from 'react';
import {IngredientList, SortingWidget} from "../components";
import {Link} from "react-router-dom";
import {useRootStore} from "../contexts/RootStateContext";
import {observer} from "mobx-react-lite";
import {INGREDIENTS_PAGE_ROUTE, NEW_INGREDIENT_PAGE_ROUTE} from "../constants/routes";
import {useQuery} from "../hooks";

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
                <SortingWidget baseRoute={INGREDIENTS_PAGE_ROUTE} order={order} sortBy={sortBy} tags={tags}/>
                <Link to={NEW_INGREDIENT_PAGE_ROUTE} className="btn btn-primary mt-4 mb-4">New Ingredient</Link>
            </div>
            <IngredientList ingredients={ingredients} sortBy={sortBy} order={order}/>
        </div>
    );
})