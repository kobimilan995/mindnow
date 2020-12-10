import React, {useEffect, useState} from 'react';
import queryString from 'query-string';
import {useParams, useHistory} from 'react-router-dom';
import {observer} from "mobx-react-lite";
import {useRootStore} from "../contexts/RootStateContext";
import {IngredientList, LoadingSpinner} from "../components";
import {Box, Chip, Divider, Grid, Typography} from "@material-ui/core";
import {Alert} from "@material-ui/lab";
import {INGREDIENT_DETAILS_ROUTE, SALADS_PAGE_ROUTE} from "../constants/routes";

export const SaladDetailsPage = observer(() => {
    const {saladDetailsStore, ingredientDetailsStore} = useRootStore();
    const {id} = useParams<{ id: string }>();
    const {salad, ingredients} = saladDetailsStore;
    const [hasRequestFailed, setHasRequestFailed] = useState<boolean>(false);
    const history = useHistory();

    useEffect(() => {
        if (!salad) {
            saladDetailsStore.getSalad({id})
                .catch(() => {
                    setHasRequestFailed(true);
                });
        } else {
            saladDetailsStore.getSaladIngredients({ids: salad.ingredientIds});
        }
    }, [])

    if (hasRequestFailed) {
        return (
            <Box mt={3}>
                <Alert severity="error">Requested salad could not be found.</Alert>
            </Box>
        );
    }

    if (!salad) {
        return <LoadingSpinner/>
    }

    return (
        <Box mt={5}>
            <Grid container>
                <Grid item md={4} xs={12}>
                    <Box m={2} display="flex" justifyContent="space-between">
                        <Typography variant="subtitle1">Salad name</Typography>
                        <Typography variant="h6">{salad.name}</Typography>
                    </Box>
                    <Divider/>
                    <Box m={2} display="flex" justifyContent="space-between">
                        <Typography variant="subtitle1">Calories count</Typography>
                        <Typography variant="h6">{salad.caloriesCount}</Typography>
                    </Box>
                    <Divider/>
                    <Box m={2} display="flex" justifyContent="space-between">
                        <Typography variant="subtitle1">Tags</Typography>
                        <Box display="flex" flexWrap="wrap" maxWidth={300}>
                            {salad.tags.map(tag => {
                                return (
                                    <Box key={tag} ml={1} mb={1}>
                                        <Chip label={tag} clickable onClick={() => {
                                            history.push(`${SALADS_PAGE_ROUTE}?${queryString.stringify({
                                                tags: tag
                                            })}`)
                                        }}/>
                                    </Box>
                                )
                            })}
                        </Box>
                    </Box>
                </Grid>
                <Grid item md={8} xs={12}>
                    <IngredientList ingredients={ingredients} onIngredientClick={(ingredient) => {
                        ingredientDetailsStore.setIngredient(ingredient);
                        history.push(INGREDIENT_DETAILS_ROUTE(ingredient.id))
                    }}/>
                </Grid>
            </Grid>
        </Box>
    );
})
