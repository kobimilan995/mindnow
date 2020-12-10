import React from 'react';
import {useHistory} from 'react-router-dom';
import {Salad} from "../types/Salad";
import {SALADS_PAGE_ROUTE} from "../constants/routes";
import queryString from "query-string";
import {SaladListItem} from "./SaladListItem";
import {SORT_ORDER_ASC, SORT_ORDER_DESC} from "../constants/sorting";
import {Box, Grid, Typography} from "@material-ui/core";

type Props = {
    salads: Salad[];
    order?: typeof SORT_ORDER_DESC | typeof SORT_ORDER_ASC;
    sortBy?: string;
}


export const SaladList = ({salads, order, sortBy}: Props) => {
    const history = useHistory();

    if (salads.length === 0) {
        return (
            <Box display="flex" justifyContent="center" alignItems="center">
                <Typography variant="h5">No salads found. Feel free to create some!</Typography>
            </Box>
        );
    }

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