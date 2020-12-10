import React, {useEffect, useState} from 'react';
import {observer} from "mobx-react-lite";
import {useHistory} from 'react-router-dom';
import {useRootStore} from "../contexts/RootStateContext";
import {IngredientsPicker} from "../components";
import {
    Box, Button, Chip,
    createStyles, Divider, FormControl,
    Grid,
    IconButton,
    makeStyles, MenuItem,
    Select,
    TextField,
    Theme,
    Typography
} from "@material-ui/core";
import DeleteIcon from '@material-ui/icons/Delete';
import List from "@material-ui/core/List";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItem from "@material-ui/core/ListItem";
import {SORTING_WIDGET_CALORIES_ASC, SORTING_WIDGET_CALORIES_DESC} from "../constants/sorting";
import {SALAD_DETAILS_ROUTE} from "../constants/routes";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        button: {
            margin: theme.spacing(1),
        },
        root: {
            width: '100%',
            backgroundColor: theme.palette.background.paper,
        },
    }),
);

export const NewSaladPage = observer(() => {
    const {createSaladStore, saladDetailsStore} = useRootStore();
    const {
        getIngredients,
        filteredIngredients,
        selectedIngredientIds,
        ingredientsById,
        toggleIngredientSelection,
        searchQuery,
        setSearchQuery,
        sortingValue,
        setSortingValue,
        caloriesCount,
        storeSalad,
    } = createSaladStore;
    useEffect(() => {
        getIngredients({});
    }, []);

    const history = useHistory();

    const [saladName, setSaladName] = useState<string>('');
    const [tags, setTags] = useState<string[]>([]);
    const [currentTag, setCurrentTag] = useState<string>('');
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const classes = useStyles();

    const onKeyUp = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            if (currentTag) {
                setTags([...tags, currentTag]);
                setCurrentTag('');
            }
        } else {
            e.preventDefault();
        }
    }

    const removeTag = (index: number) => {
        const tagsCopy = [...tags];
        tagsCopy.splice(index, 1);
        setTags(tagsCopy);
    }

    const onSubmit = () => {
        setIsLoading(true);
        storeSalad({
            ingredientIds: selectedIngredientIds,
            tags,
            caloriesCount: caloriesCount,
            name: saladName
        }).then((response) => {
            setIsLoading(false);
            saladDetailsStore.setSalad(response.data);
            history.replace(SALAD_DETAILS_ROUTE(response.data.id));
        })
    }

    return (
        <Box mt={4}>
            <Grid container spacing={3}>
                <Grid item md={4} xs={12}>
                    <Box display="flex" justifyContent="center" flexDirection="column">
                        <Box mb={2}>
                            <Typography variant="h5">Choose a name and tags</Typography>
                        </Box>
                        <FormControl>
                            <TextField
                                variant="outlined"
                                size="small"
                                value={saladName}
                                onChange={(e) => {
                                    setSaladName(e.target.value)
                                }}
                                label="Salad name"
                            />
                        </FormControl>
                        <FormControl>
                            <Box mt={1} mb={1} display="flex">
                                <TextField
                                    size="small"
                                    fullWidth
                                    value={currentTag}
                                    onChange={(e) => setCurrentTag(e.target.value)}
                                    id="standard-basic"
                                    label="Enter tag name and press enter"
                                    onKeyUp={onKeyUp}
                                    variant="outlined"
                                />
                            </Box>
                        </FormControl>
                    </Box>
                </Grid>
                <Grid item md={4} xs={12}>
                    <Box pb={2}>
                        <Typography variant="h5">Select ingredients</Typography>
                    </Box>
                    <Box display="flex" justifyContent="center">
                        <Grid item md={4}>
                            <Box mr={1}>
                                <Select
                                    fullWidth={true}
                                    labelId="demo-simple-select-placeholder-label-label"
                                    id="demo-simple-select-placeholder-label"
                                    variant="outlined"
                                    value={sortingValue}
                                    onChange={(e) => {
                                        setSortingValue({sortingValue: e.target.value as typeof SORTING_WIDGET_CALORIES_ASC | typeof SORTING_WIDGET_CALORIES_DESC | ""})
                                    }}
                                    displayEmpty
                                >
                                    <MenuItem value="" disabled>
                                        <em>Sort by</em>
                                    </MenuItem>
                                    <MenuItem
                                        value={SORTING_WIDGET_CALORIES_ASC}>Calories <span> &#8593;</span></MenuItem>
                                    <MenuItem
                                        value={SORTING_WIDGET_CALORIES_DESC}>Calories <span> &#8595;</span></MenuItem>
                                </Select>
                            </Box>
                        </Grid>
                        <Grid item md={4}>
                            <Box ml={1}>
                                <TextField
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    id="outlined-basic"
                                    label="Filter"
                                    variant="outlined"
                                />
                            </Box>
                        </Grid>
                    </Box>
                    <Box mt={2} height={300} border={1} borderColor="#e1e1e1" borderRadius={3}
                         style={{overflowY: 'scroll'}}>
                        <IngredientsPicker ingredients={filteredIngredients}/>
                    </Box>
                </Grid>
                <Grid item md={4} xs={12}>
                    <Typography variant="h5">Salad preview</Typography>
                    <Box mt={5}>
                        {selectedIngredientIds.length > 0 && (
                            <Typography variant="subtitle1">Selected ingredients</Typography>
                        )}
                    </Box>
                    <Box display="flex" border={1} borderColor="#e1e1e1" borderRadius={3} height={300}
                         style={{overflowY: 'scroll'}}>
                        <List dense className={classes.root}>
                            {selectedIngredientIds.map(selectedIngredientId => {
                                const ingredient = ingredientsById[selectedIngredientId];
                                return (
                                    <ListItem key={ingredient.id}>
                                        <ListItemAvatar>
                                            <Avatar
                                                alt={`Avatar ${ingredient.name}`}
                                                src={ingredient.image}
                                            />
                                        </ListItemAvatar>
                                        <ListItemText
                                            id={ingredient.id}
                                            primary={`${ingredient.name} (${ingredient.caloriesCount} kcal)`}
                                        />
                                        <ListItemSecondaryAction>
                                            <IconButton onClick={() => {
                                                toggleIngredientSelection(ingredient.id)
                                            }}
                                                        aria-label="delete">
                                                <DeleteIcon/>
                                            </IconButton>
                                        </ListItemSecondaryAction>
                                    </ListItem>
                                );
                            })}
                        </List>
                    </Box>
                    {saladName && (
                        <>
                            <Box display="flex" mt={5} mb={2} flexDirection="row" alignItems="flex-end">
                                <Box mr={2}>
                                    <Typography variant="subtitle1">Salad name:</Typography>
                                </Box>
                                <Typography variant="h5">{saladName}</Typography>
                            </Box>
                            <Divider/>
                        </>
                    )}
                    {selectedIngredientIds.length > 0 && (
                        <>
                            <Box display="flex" mt={2} mb={2} flexDirection="row" alignItems="flex-end">
                                <Box mr={2}>
                                    <Typography variant="subtitle1">Calories count:</Typography>
                                </Box>
                                <Typography variant="h5">{caloriesCount}</Typography>
                            </Box>
                            <Divider/>
                        </>
                    )}


                    {tags.length > 0 && (
                        <>
                            <Box mt={2}>
                                {tags.length > 0 && (
                                    <Typography variant="subtitle1">Selected tags</Typography>
                                )}
                            </Box>
                            <Box display="flex" flexWrap="wrap" maxWidth={400}>
                                {tags.map((tag, index) => {
                                    return (
                                        <Box key={tag} component="span" m={0.5}>
                                            <Chip label={tag} onDelete={() => {
                                                removeTag(index);
                                            }}/>
                                        </Box>
                                    );
                                })}
                            </Box>
                        </>
                    )}
                    <Box mt={2}>
                        <Button disabled={isLoading} onClick={onSubmit} variant="contained" fullWidth color="primary">Submit</Button>
                    </Box>
                </Grid>
            </Grid>
        </Box>
    );
})