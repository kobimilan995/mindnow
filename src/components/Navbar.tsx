import React from 'react';
import {useHistory} from 'react-router-dom';
import {makeStyles} from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import {HOME_PAGE_ROUTE, INGREDIENTS_PAGE_ROUTE, SALADS_PAGE_ROUTE} from "../constants/routes";
import {Link} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
    },
}));

export const Navbar = () => {
    const classes = useStyles();
    const history = useHistory();
    return (
        <div className={classes.root}>
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6" className={classes.title}>
                        <Link color="initial" onClick={() => history.push(HOME_PAGE_ROUTE)}>Mindnow Salad Bar</Link>
                    </Typography>
                    <Button color="inherit" onClick={() => history.push(INGREDIENTS_PAGE_ROUTE)}>Ingredients</Button>
                    <Button color="inherit" onClick={() => history.push(SALADS_PAGE_ROUTE)}>Salads</Button>
                </Toolbar>
            </AppBar>
        </div>
    );
}