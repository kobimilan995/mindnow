import {Ingredient} from "../types/Ingredient";
import React from "react";
import {Box, Button, Chip, Popover} from "@material-ui/core";

type Props = {
    ingredient: Ingredient;
    onTagSelect(tag: string): void;
}

export const IngredientTagsPopover = ({ingredient, onTagSelect}: Props) => {
    const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null);

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);
    const id = open ? ingredient.id : undefined;

    return (
        <div>
            <Button
                aria-describedby={ingredient.id}
                className="pr-2"
                style={{color: "white"}}
                onMouseDown={(e) => {
                    e.stopPropagation();
                    handleClick(e);
                }}
            >
                {ingredient.tags.length} tags
            </Button>
            <Popover
                id={id}
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'center',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'center',
                }}
            >
                <Box component="div" m={1}>
                    {ingredient.tags.map(tag => {
                        return (
                            <Box component="div" m={1} key={`${ingredient.id}${tag}`}>
                                <Chip label={tag} component="a" href="/#" clickable
                                      onClick={(e: React.MouseEvent) => {
                                          e.stopPropagation();
                                          e.preventDefault();
                                          onTagSelect(tag);
                                          handleClose();
                                      }}/>
                            </Box>
                        )
                    })}
                </Box>
            </Popover>
        </div>
    );
}