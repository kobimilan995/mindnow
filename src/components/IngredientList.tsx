import React, {useEffect} from 'react';
import {Link} from 'react-router-dom';
import {observer} from "mobx-react-lite";
import {IngredientListItem} from "./IngredientListItem";
import {useRootStore} from "../contexts/RootStateContext";
import {SortingWidget} from "./SortingWidget";
import {
    SORT_ORDER_ASC,
    SORT_ORDER_DESC,
    SORTING_WIDGET_CALORIES_ASC,
    SORTING_WIDGET_CALORIES_DESC
} from "../constants/sorting";
import {NEW_INGREDIENT_PAGE} from "../constants/routes";

export const IngredientList = observer(() => {
    const {ingredientsStore} = useRootStore();
    const {getIngredients, setSortingValues, setSelectedTag, sortingValues, selectedTag, ingredients} = ingredientsStore;

    useEffect(() => {
        getIngredients();
    }, [selectedTag, sortingValues]);

    const onSortingOptionChange = (data: React.ChangeEvent<HTMLSelectElement>) => {
        switch (data.target.value) {
            case SORTING_WIDGET_CALORIES_DESC:
                setSortingValues({sortBy: 'caloriesCount', sortOrder: SORT_ORDER_DESC});
                break;
            case SORTING_WIDGET_CALORIES_ASC:
                setSortingValues({sortBy: 'caloriesCount', sortOrder: SORT_ORDER_ASC});
                break;
            default:
        }
    }

    return (
        <div className="container">
            <div className="d-flex row align-items-center justify-content-between">
                <SortingWidget onSortingOptionChange={onSortingOptionChange}/>
                <Link to={NEW_INGREDIENT_PAGE} className="btn btn-primary mt-4 mb-4">New Ingredient</Link>
            </div>
            <div className="row">
                {ingredients.map(ingredient => {
                    return <IngredientListItem key={ingredient.id} ingredient={ingredient} onTagSelect={setSelectedTag}/>
                })}
            </div>
        </div>
    );
});

