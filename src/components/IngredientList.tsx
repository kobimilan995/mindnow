import React from 'react';
import queryString from 'query-string';
import {useHistory} from 'react-router-dom';
import {Theme, createStyles, makeStyles} from '@material-ui/core/styles';
import {Box, Button, GridList, Typography} from '@material-ui/core';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import {Ingredient} from "../types/Ingredient";
import {SORT_ORDER_ASC, SORT_ORDER_DESC} from "../constants/sorting";
import {INGREDIENTS_PAGE_ROUTE} from "../constants/routes";
import {TagsPopover} from "./TagsPopover";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'space-around',
            overflow: 'hidden',
            backgroundColor: theme.palette.background.paper,
        },
        gridList: {
            width: 900,
        },
        icon: {
            color: 'rgba(255, 255, 255, 0.54)',
        },
        formControl: {
            minWidth: 120,
        },
        typography: {
            padding: theme.spacing(2),
        },
    }),
);

type Props = {
    ingredients: Ingredient[];
    sortBy?: string;
    order?: typeof SORT_ORDER_ASC | typeof SORT_ORDER_DESC;
    onIngredientClick(ingredient: Ingredient): void;
}

export const IngredientList = ({ingredients, order, sortBy, onIngredientClick}: Props) => {
    const classes = useStyles();
    const history = useHistory();

    if (ingredients.length === 0) {
        return (
            <Box display="flex" justifyContent="center" alignItems="center">
                <Typography variant="h5">No ingredients found. Feel free to create some!</Typography>
            </Box>
        );
    }

    return (
        <div className={classes.root}>
            <GridList cols={2} cellHeight={240} className={classes.gridList}>
                {ingredients.map((ingredient) => (
                    <GridListTile key={ingredient.id}>
                        <img src={ingredient.image} alt={ingredient.name}/>
                        <GridListTileBar
                            title={
                                <Button
                                    variant="text"
                                    style={{color: 'white', padding: 0}}
                                    onClick={() => {
                                        onIngredientClick(ingredient);
                                    }}>
                                    {ingredient.name}
                                </Button>
                            }
                            subtitle={
                                <div>
                                    <span>Calories: {ingredient.caloriesCount}</span>
                                </div>
                            }
                            actionIcon={
                                ingredient.tags.length > 0 &&
                                <TagsPopover tags={ingredient.tags} id={ingredient.id} onTagSelect={(tag) => {
                                    history.push(`${INGREDIENTS_PAGE_ROUTE}?${queryString.stringify({
                                        order,
                                        sortBy,
                                        tags: tag
                                    })}`);
                                }}/>
                            }
                        />
                    </GridListTile>
                ))}
            </GridList>
        </div>
    );
}