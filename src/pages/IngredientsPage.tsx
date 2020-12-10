import React, {useEffect, useState} from 'react';
import {useHistory} from 'react-router-dom';
import {IngredientList, LoadingSpinner, SortingWidget} from "../components";
import {useRootStore} from "../contexts/RootStateContext";
import {observer} from "mobx-react-lite";
import {INGREDIENT_DETAILS_ROUTE, INGREDIENTS_PAGE_ROUTE, NEW_INGREDIENT_PAGE_ROUTE} from "../constants/routes";
import {useQuery} from "../hooks";
import {Box, Button, Grid} from "@material-ui/core";

export const IngredientsPage = observer(() => {
    const {ingredientsStore, ingredientDetailsStore} = useRootStore();
    const {getIngredients, ingredients} = ingredientsStore;
    const query = useQuery();
    const history = useHistory();
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        setIsLoading(true);
        const {order, sortBy, tags} = query;
        getIngredients({order, sortBy, tags})
            .then(() => {
                setIsLoading(false);
            })
    }, [query.tags, query.order, query.sortBy]);
    const {tags, order, sortBy} = query;

    return (
        <div>
            <SortingWidget
                baseRoute={INGREDIENTS_PAGE_ROUTE}
                order={order}
                sortBy={sortBy}
                tags={tags}
            />
            <Box component="span" ml={2}>
                <Button
                    size="small"
                    onClick={() => history.push(NEW_INGREDIENT_PAGE_ROUTE)}
                    variant="contained"
                    color="primary"
                >
                    Create new ingredient
                </Button>
            </Box>
            {isLoading ? (
                <LoadingSpinner/>
            ) : (
                <Box mt={5}>
                    <IngredientList
                        onIngredientClick={(ingredient) => {
                            ingredientDetailsStore.setIngredient(ingredient);
                            history.push(INGREDIENT_DETAILS_ROUTE(ingredient.id));
                        }}
                        ingredients={ingredients}
                        sortBy={sortBy}
                        order={order}
                    />
                </Box>
            )}
        </div>
    );
})