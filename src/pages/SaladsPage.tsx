import React, {useEffect, useState} from 'react';
import {observer} from "mobx-react-lite";
import {useRootStore} from "../contexts/RootStateContext";
import {useQuery} from "../hooks";
import {SortingWidget, SaladList, LoadingSpinner} from "../components";
import {SALADS_PAGE_ROUTE} from "../constants/routes";
import {Box, createStyles, Grid, makeStyles, TextField, Theme} from "@material-ui/core";


const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            flexGrow: 1,
            marginTop: 20,
        },
        paper: {
            padding: theme.spacing(1),
            textAlign: 'center',
            color: theme.palette.text.secondary,
        },
    }),
);


export const SaladsPage = observer(() => {
    const {saladsStore} = useRootStore();

    const {filteredSalads, setSearchQuery, searchQuery} = saladsStore;

    const [isLoading, setIsLoading] = useState<boolean>(false);

    const query = useQuery();
    useEffect(() => {
        setIsLoading(true);
        const {order, sortBy, tags} = query;
        saladsStore.getSalads({order, sortBy, tags})
            .then(() => {
                setIsLoading(false);
            })
    }, [query.tags, query.order, query.sortBy]);

    const {order, sortBy, tags} = query;
    const onSearchQueryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(e.target.value);
    }

    const classes = useStyles();

    return (
        <div className={classes.root}>
            <Box display="flex" alignItems="center">
                <Grid container item xs={12} spacing={2}>
                    <Grid item md={4} xs={12}>
                        <Box display="flex" flexDirection="column" alignItems="center">
                            <SortingWidget baseRoute={SALADS_PAGE_ROUTE} order={order} sortBy={sortBy} tags={tags}/>
                            <Box mt={4}>
                                <TextField
                                    value={searchQuery}
                                    onChange={onSearchQueryChange}
                                    id="outlined-basic"
                                    label="Filter salads"
                                    variant="outlined"
                                />
                            </Box>
                        </Box>
                    </Grid>
                    {isLoading ? (
                        <Grid item md={8} xs={12}>
                            <LoadingSpinner/>
                        </Grid>
                    ) : (
                        <SaladList salads={filteredSalads} order={order} sortBy={sortBy}/>
                    )}
                </Grid>
            </Box>
        </div>
    );

    return (
        <div>
            <div>
                <SortingWidget baseRoute={SALADS_PAGE_ROUTE} order={order} sortBy={sortBy} tags={tags}/>
                <div>
                    <div>
                        <span id="inputGroup-sizing-sm">Search query</span>
                    </div>
                    <input
                        value={searchQuery}
                        onChange={onSearchQueryChange}
                        type="text"
                        aria-label="Small"
                        aria-describedby="inputGroup-sizing-sm"
                    />
                </div>
            </div>
            {isLoading ? (
                <LoadingSpinner/>
            ) : (
                <SaladList salads={filteredSalads} order={order} sortBy={sortBy}/>
            )}

        </div>
    );
})