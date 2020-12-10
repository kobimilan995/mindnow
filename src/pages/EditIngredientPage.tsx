import React, {useEffect, useState} from "react";
import {useParams} from 'react-router-dom';
import {observer} from "mobx-react-lite";
import {useRootStore} from "../contexts/RootStateContext";
import {Ingredient} from "../types/Ingredient";
import {CreateAndEditIngredientForm} from "../components";
import {Box, CircularProgress} from "@material-ui/core";
import {Alert} from "@material-ui/lab";

export const EditIngredientPage = observer(() => {
    const {ingredientDetailsStore} = useRootStore();
    const [isSubmitDisabled, setIsSubmitDisabled] = useState<boolean>(false);
    const [showSuccessAlert, setShowSuccessAlert] = useState<boolean>(false);
    const {id} = useParams<{ id: string }>();

    const [hasRequestFailed, setHasRequestFailed] = useState<boolean>(false);

    const {ingredient, isLoading, getIngredient, updateIngredient} = ingredientDetailsStore;
    useEffect(() => {
        if (!ingredient) {
            getIngredient({id})
                .catch(() => {
                    setHasRequestFailed(true);
                });
        }
    }, []);

    const onFormSubmit = ({tags, caloriesCount, name, image}: Omit<Ingredient, 'id'>) => {
        setIsSubmitDisabled(true);
        updateIngredient({
            ingredient: {
                tags,
                caloriesCount,
                name,
                image
            },
            id: id
        }).then(() => {
            setIsSubmitDisabled(false);
            setShowSuccessAlert(true);
        });
    }

    if (hasRequestFailed) {
        return (
            <Box mt={3}>
                <Alert severity="error">Requested ingredient could not be found.</Alert>
            </Box>
        );
    }

    if (!ingredient || isLoading) {
        return (
            <Box display="flex">
                <Box m="auto" mt={6}>
                    <CircularProgress/>
                </Box>
            </Box>
        )
    }
    return (
        <>
            <CreateAndEditIngredientForm
                ingredient={ingredient}
                onFormSubmit={onFormSubmit}
                isSubmitDisabled={isSubmitDisabled}
                showSuccessAlert={showSuccessAlert}
            />
        </>
    );
})