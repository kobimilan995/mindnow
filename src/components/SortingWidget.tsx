import React from 'react';
import {useHistory} from 'react-router-dom';
import queryString from 'query-string';
import {
    SORT_ORDER_ASC,
    SORT_ORDER_DESC,
    SORTING_WIDGET_CALORIES_ASC,
    SORTING_WIDGET_CALORIES_DESC
} from "../constants/sorting";
import {Select, MenuItem, createStyles, makeStyles, Theme} from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        formControl: {
            margin: theme.spacing(1),
            minWidth: 120,
        },
        selectEmpty: {
            marginTop: theme.spacing(2),
        },
    }),
);

interface Props {
    sortBy?: string;
    order?: string;
    tags?: string;
    baseRoute: string;
}

export const SortingWidget = ({sortBy, order, tags, baseRoute}: Props) => {
    const classes = useStyles();
    const history = useHistory();
    let defaultValue = '';

    if (sortBy === 'caloriesCount' && (!order || order === SORT_ORDER_ASC)) {
        defaultValue = SORTING_WIDGET_CALORIES_ASC;
    }

    if (sortBy === 'caloriesCount' && order === SORT_ORDER_DESC) {
        defaultValue = SORTING_WIDGET_CALORIES_DESC;
    }

    const onChange = (event: React.ChangeEvent<{ name?: string; value: unknown }>) => {
        switch (event.target.value) {
            case SORTING_WIDGET_CALORIES_ASC:
                history.push(`${baseRoute}?${queryString.stringify({
                    sortBy: 'caloriesCount',
                    order: SORT_ORDER_ASC,
                    tags,
                })}`);
                break;
            case SORTING_WIDGET_CALORIES_DESC:
                history.push(`${baseRoute}?${queryString.stringify({
                    sortBy: 'caloriesCount',
                    order: SORT_ORDER_DESC,
                    tags,
                })}`)
                break;
            default:
        }
    }

    return (
        <Select
            labelId="demo-simple-select-placeholder-label-label"
            id="demo-simple-select-placeholder-label"
            value={defaultValue}
            onChange={onChange}
            displayEmpty
            className={classes.selectEmpty}
        >
            <MenuItem value="" disabled>
                <em>Choose sorting order</em>
            </MenuItem>
            <MenuItem value={SORTING_WIDGET_CALORIES_ASC}>By calories count (Low to High)</MenuItem>
            <MenuItem value={SORTING_WIDGET_CALORIES_DESC}>By calories count (High to Low)</MenuItem>
        </Select>
    );
}