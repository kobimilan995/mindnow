import React, {useEffect, useState} from 'react';
import {useHistory} from 'react-router-dom';
import queryString from 'query-string';
import {
    Box,
    CardMedia,
    CircularProgress,
    Card,
    CardActionArea,
    makeStyles,
    Typography,
    Chip,
    Button, Grid
} from "@material-ui/core";
import {Alert} from '@material-ui/lab';
import {useParams} from 'react-router-dom';
import {observer} from "mobx-react-lite";
import {useRootStore,} from "../contexts/RootStateContext";
import {EDIT_INGREDIENT_PAGE, INGREDIENTS_PAGE_ROUTE} from "../constants/routes";
import {ConfirmationDialog} from "../components";
import {Ingredient} from "../types/Ingredient";

const useStyles = makeStyles({
    root: {
        maxWidth: 345,
    },
});

export const IngredientDetailsPage = observer(() => {

    const classes = useStyles();
    let {id} = useParams<{ id: string }>();

    const {ingredientDetailsStore} = useRootStore();
    const {ingredient, isLoading, deleteIngredient, deletedFlag} = ingredientDetailsStore;
    const [hasRequestFailed, setHasRequestFailed] = useState<boolean>(false);
    const [isDeleteDialogVisible, setIsDeleteDialogVisible] = React.useState(false);
    const [isBeingDeleted, setIsBeingDeleted] = React.useState(false);

    const history = useHistory();

    useEffect(() => {
        if (!ingredient) {
            ingredientDetailsStore.getIngredient({id})
                .catch(() => {
                    setHasRequestFailed(true);
                });
        } else {
            ingredientDetailsStore.setIsLoading(false);
        }
    }, []);

    const openDeleteDialog = () => {
        setIsDeleteDialogVisible(true);
    };

    const closeDeleteDialog = () => {
        setIsDeleteDialogVisible(false);
    };

    const onDelete = (ingredient: Ingredient) => {
        setIsBeingDeleted(true);
        deleteIngredient({id: ingredient.id})
            .then(() => {
                setIsBeingDeleted(false);
            });
    }

    if (hasRequestFailed) {
        return (
            <Box mt={3}>
                <Alert severity="error">Requested ingredient could not be found.</Alert>
            </Box>
        );
    }

    if (deletedFlag) {
        return (
            <Box mt={3}>
                <Alert severity="success">Ingredient successfully deleted.</Alert>
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
        <Box mt={4}>
            <Grid container spacing={3} alignItems="center">
                <Grid item md={4} xs={12}>
                    <Card className={classes.root}>
                        <CardActionArea>
                            <CardMedia
                                component="img"
                                image={ingredient.image}
                            />
                        </CardActionArea>
                    </Card>
                </Grid>

                <Grid item md={8} xs={12}>
                    <Typography variant="h4" gutterBottom>
                        {ingredient.name}
                    </Typography>
                    <Box mb={2}>
                        <Typography variant="subtitle1" gutterBottom>
                            {ingredient.caloriesCount} calories
                        </Typography>
                    </Box>
                    {ingredient.tags.length > 0 && (
                        <Typography variant="subtitle1" gutterBottom>
                            Tags
                        </Typography>
                    )}
                    {ingredient.tags.map(tag => (
                        <Box key={tag} component="span" mr={1} mb={1}>
                            <Chip label={tag} clickable
                                  onClick={() => history.push(`${INGREDIENTS_PAGE_ROUTE}?${queryString.stringify({tags: tag})}`)}/>
                        </Box>
                    ))}
                    <Box display="flex" mt={2}>
                        <Box component="span" mr={2}>
                            <Button disabled={isBeingDeleted} variant="contained" color="primary" onClick={() => {
                                history.push(EDIT_INGREDIENT_PAGE(ingredient!.id));
                            }}>Edit ingredient</Button>
                        </Box>
                        <Button disabled={isBeingDeleted} variant="contained" onClick={() => openDeleteDialog()}
                                color="secondary">Delete
                            ingredient</Button>
                        <ConfirmationDialog
                            mainText="You are about to delete an ingredient. Are you sure?"
                            handleClose={closeDeleteDialog}
                            isVisible={isDeleteDialogVisible}
                            onAgreed={() => {
                                onDelete(ingredient);
                            }}
                        />
                    </Box>
                </Grid>
            </Grid>
        </Box>
    );
})