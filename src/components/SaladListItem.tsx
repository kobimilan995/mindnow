import React from 'react';
import {useHistory} from 'react-router-dom';
import {Salad} from "../types/Salad";
import {SALAD_DETAILS_ROUTE} from "../constants/routes";
import {observer} from "mobx-react-lite";
import {useRootStore} from "../contexts/RootStateContext";
import {Box, Button, Chip, Grid, Typography} from "@material-ui/core";

type Props = {
    salad: Salad;
    onTagSelect(tag: string): void;
}

export const SaladListItem = observer(({salad, onTagSelect}: Props) => {
    const {saladDetailsStore} = useRootStore();

    const history = useHistory();

    const onSaladListItemClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault();
        saladDetailsStore.setSalad(salad);
        history.push(SALAD_DETAILS_ROUTE(salad.id));
    }

    return (
        <Box border={1} borderColor="#E1E1E1" p={3} mb={1} borderRadius={3}>
            <Grid container spacing={2} alignItems="center" justify="space-between">
                <Grid item>
                    <Typography variant="h6">{salad.name}</Typography>
                    <Typography variant="subtitle2">{salad.caloriesCount} calories</Typography>
                </Grid>
                <Grid item>
                    <Button color="primary" size="small" variant="contained" onClick={onSaladListItemClick}>View details</Button>
                </Grid>
            </Grid>
        </Box>
    );
})