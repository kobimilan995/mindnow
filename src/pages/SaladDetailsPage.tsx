import React, {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';
import {observer} from "mobx-react-lite";
import {useRootStore} from "../contexts/RootStateContext";
import {LoadingSpinner} from "../components";
import {Box} from "@material-ui/core";
import {Alert} from "@material-ui/lab";

export const SaladDetailsPage = observer(() => {
    const {saladDetailsStore} = useRootStore();
    const {id} = useParams<{ id: string }>();
    const {salad} = saladDetailsStore;
    const [hasRequestFailed, setHasRequestFailed] = useState<boolean>(false);

    useEffect(() => {
        if (!salad) {
            saladDetailsStore.getSalad({id})
                .catch(() => {
                    setHasRequestFailed(true);
                });
        }
    }, [])

    if (hasRequestFailed) {
        return (
            <Box mt={3}>
                <Alert severity="error">Requested salad could not be found.</Alert>
            </Box>
        );
    }

    if (!salad) {
        return <LoadingSpinner/>
    }

    return (
        <div className="container d-flex justify-content-center mt-4">
            <h3>{salad.name}</h3>
        </div>
    );
})
