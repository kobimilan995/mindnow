import React from 'react';
import {createStyles, makeStyles, Theme} from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Checkbox from '@material-ui/core/Checkbox';
import Avatar from '@material-ui/core/Avatar';
import {Ingredient} from "../types/Ingredient";
import {Box} from "@material-ui/core";
import {IngredientsPickerItem} from "./IngredientsPickerItem";
import {observer} from "mobx-react-lite";
import {useRootStore} from "../contexts/RootStateContext";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            width: '100%',
            backgroundColor: theme.palette.background.paper,
        },
    }),
);

type Props = {
    ingredients: (Ingredient)[];
}

export const IngredientsPicker = observer(({ingredients}: Props) => {
    const {createSaladStore} = useRootStore();
    const {selectionDictionary, toggleIngredientSelection} = createSaladStore;
    const classes = useStyles();

    return (
        <Box display="flex">
            <List dense className={classes.root}>
                {ingredients.map((ingredient) => {
                    return (
                        <IngredientsPickerItem
                            key={ingredient.id}
                            ingredient={ingredient}
                            isSelected={selectionDictionary[ingredient.id] || false}
                            onSelect={() => toggleIngredientSelection(ingredient.id)}
                        />
                    );
                })}
            </List>
        </Box>
    );
})