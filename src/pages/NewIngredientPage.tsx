import React, {useState} from "react";
import {useHistory} from 'react-router-dom';
import {observer} from "mobx-react-lite";
import {useRootStore} from "../contexts/RootStateContext";
import {CreateAndEditIngredientForm} from "../components/CreateAndEditIngredientForm";
import {Ingredient} from "../types/Ingredient";

export const NewIngredientPage = observer(() => {
    const {ingredientsStore} = useRootStore();
    const [isSubmitDisabled, setIsSubmitDisabled] = useState<boolean>(false);
    const history = useHistory();

    const onFormSubmit = ({tags, caloriesCount, name, image}: Omit<Ingredient, 'id'>) => {
        setIsSubmitDisabled(true);
        ingredientsStore.storeIngredient({
            tags,
            caloriesCount,
            name,
            image
        }).then(() => {
            setIsSubmitDisabled(false);
            history.goBack();
        });
    }
    return (
        <CreateAndEditIngredientForm onFormSubmit={onFormSubmit} isSubmitDisabled={isSubmitDisabled}/>
    );
})