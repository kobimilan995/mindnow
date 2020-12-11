import React, {useEffect, useState} from "react";
import {Ingredient} from "../types/Ingredient";
import {Box, Button, Chip, createStyles, FormControl, makeStyles, TextField, Theme} from '@material-ui/core';
import {Alert} from '@material-ui/lab';


const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        formControl: {
            margin: theme.spacing(1),
            minWidth: 400,
        },
    }),
);

type Props = {
    onFormSubmit(ingredient: Omit<Ingredient, 'id'>): void;
    isSubmitDisabled: boolean;
    ingredient?: Ingredient;
    showSuccessAlert?: boolean;
}

export const CreateAndEditIngredientForm = ({onFormSubmit, isSubmitDisabled, ingredient, showSuccessAlert = false}: Props) => {
    const [imageUrl, setImageUrl] = useState<string>('');
    const [name, setName] = useState<string>('');
    const [caloriesCount, setCaloriesCount] = useState<number | ''>('');
    const [tags, setTags] = useState<string[]>([]);
    const [currentTag, setCurrentTag] = useState<string>('');

    const removeTag = (index: number) => {
        const tagsCopy = [...tags];
        tagsCopy.splice(index, 1);
        setTags(tagsCopy);
    }

    useEffect(() => {
        if (ingredient) {
            setName(ingredient.name);
            setCaloriesCount(ingredient.caloriesCount);
            setTags(ingredient.tags);
            setImageUrl(ingredient.image);
        }
    }, [])

    const onKeyUp = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            setTags([...tags, currentTag]);
            setCurrentTag('');
        } else {
            e.preventDefault();
        }
    }

    const onSubmit = (e: any) => {
        e.preventDefault();
        if (caloriesCount) {
            onFormSubmit({
                image: imageUrl,
                name,
                caloriesCount,
                tags
            });
        }
    }
    const classes = useStyles();

    const onCaloriesCountChange = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        try {
            if (e.target.value) {
                if (parseInt(e.target.value, 10) >= 0) {
                    setCaloriesCount(parseInt(e.target.value, 10));
                }
            } else {
                setCaloriesCount('');
            }
        } catch (e) {
            console.error('Parsing failed. Moving on...');
        }
    }
    return (
        <Box display="flex" mt={5}>
            <Box m="auto">
                <div>
                    <FormControl className={classes.formControl}>
                        <TextField disabled={isSubmitDisabled} value={name} onChange={(e) => setName(e.target.value)}
                                   label="Ingredient name"/>
                    </FormControl>
                </div>
                <div>
                    <FormControl className={classes.formControl}>
                        <TextField disabled={isSubmitDisabled} value={caloriesCount} onChange={onCaloriesCountChange}
                                   type="number" label="Calories count"/>
                    </FormControl>
                </div>
                <div>
                    <FormControl className={classes.formControl}>
                        <TextField disabled={isSubmitDisabled} value={imageUrl}
                                   onChange={(e) => setImageUrl(e.target.value)} label="Image URL"/>
                    </FormControl>
                </div>
                <div>
                    <FormControl className={classes.formControl}>
                        <TextField
                            disabled={isSubmitDisabled}
                            value={currentTag}
                            onChange={(e) => setCurrentTag(e.target.value)}
                            id="standard-basic"
                            label="Enter tag name and press enter"
                            onKeyUp={onKeyUp}
                        />
                    </FormControl>
                </div>
                <Box display="flex" flexWrap="wrap" maxWidth={400}>
                    {tags.map((tag, index) => {
                        return (
                            <Box key={tag} component="span" m={0.5}>
                                <Chip disabled={isSubmitDisabled} label={tag} onDelete={() => {
                                    removeTag(index);
                                }}/>
                            </Box>
                        );
                    })}
                </Box>

                {showSuccessAlert && (
                    <Box mt={3}>
                        <Alert severity="success">Ingredient updated successfully!</Alert>
                    </Box>
                )}

                <Box display="flex">
                    <Box m="auto" mt={3}>
                        <Button disabled={isSubmitDisabled || !name || !caloriesCount || !imageUrl} onClick={onSubmit} variant="contained" color="primary">
                            Submit
                        </Button>
                    </Box>
                </Box>
            </Box>
        </Box>
    );
}