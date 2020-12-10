import React from 'react';
import {Ingredient} from "../types/Ingredient";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import Checkbox from "@material-ui/core/Checkbox";
import ListItem from "@material-ui/core/ListItem";
import {useRootStore} from "../contexts/RootStateContext";
import {observer} from "mobx-react-lite";

type Props = {
    ingredient: Ingredient;
    isSelected: boolean;
    onSelect(): void;
}

export const IngredientsPickerItem = ({ingredient, isSelected, onSelect}: Props) => {

    const labelId = `checkbox-list-secondary-label-${ingredient.id}`;

    return (
        <ListItem key={ingredient.id}>
            <ListItemAvatar>
                <Avatar
                    alt={`Avatar ${ingredient.name}`}
                    src={ingredient.image}
                />
            </ListItemAvatar>
            <ListItemText id={labelId}
                          primary={`${ingredient.name} (${ingredient.caloriesCount} kcal)`}/>
            <ListItemSecondaryAction>
                <Checkbox
                    edge="end"
                    onChange={() => {
                        onSelect();
                    }}
                    checked={isSelected}
                    inputProps={{'aria-labelledby': labelId}}
                />
            </ListItemSecondaryAction>
        </ListItem>
    );
}