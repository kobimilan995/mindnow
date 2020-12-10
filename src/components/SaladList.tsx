import React from 'react';
import {useHistory} from 'react-router-dom';
import {Salad} from "../types/Salad";
import {SALADS_PAGE_ROUTE} from "../constants/routes";
import queryString from "query-string";
import {SaladListItem} from "./SaladListItem";
import {SORT_ORDER_ASC, SORT_ORDER_DESC} from "../constants/sorting";
import {createStyles, Grid, List, makeStyles, Theme, Paper, ListItem, ListItemText, Box} from "@material-ui/core";

type Props = {
    salads: Salad[];
    order?: typeof SORT_ORDER_DESC | typeof SORT_ORDER_ASC;
    sortBy?: string;
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            flexGrow: 1,
        },
        paper: {
            padding: theme.spacing(1),
            textAlign: 'center',
            color: theme.palette.text.secondary,
        },
    }),
);


export const SaladList = ({salads, order, sortBy}: Props) => {
    const history = useHistory();
    const classes = useStyles();

    return (

        <Grid item md={8} xs={12}>
            {salads.map(salad => {
                return (
                    <SaladListItem key={salad.id} salad={salad} onTagSelect={(tag) => {
                        history.push(`${SALADS_PAGE_ROUTE}?${queryString.stringify({order, sortBy, tags: tag})}`);
                    }}/>
                );
            })}
        </Grid>
    );
}