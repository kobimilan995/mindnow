import React from "react";
import {Box, Button, Chip, Popover} from "@material-ui/core";

type Props = {
    id: string;
    onTagSelect(tag: string): void;
    tags: string[];
    textColor?: string;
    buttonVariant?: 'text' | 'outlined' | 'contained'
}

export const TagsPopover = ({id, onTagSelect, tags, textColor = "white", buttonVariant = 'outlined'}: Props) => {
    const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null);

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);

    return (
        <Box mt={1} mr={1}>
            <Button
                aria-describedby={id}
                size="small"
                variant={buttonVariant}
                style={{color: textColor}}
                onMouseDown={(e) => {
                    e.stopPropagation();
                    handleClick(e);
                }}
            >
                {tags.length} {tags.length === 1 ? 'tag' : 'tags'}
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
                    {tags.map(tag => {
                        return (
                            <Box component="div" m={1} key={`${id}${tag}`}>
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
        </Box>
    );
}