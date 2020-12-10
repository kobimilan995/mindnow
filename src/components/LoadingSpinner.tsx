import React from 'react';
import {Box, CircularProgress} from "@material-ui/core";

export const LoadingSpinner = () => {
    return (
        <Box display="flex" mt={4}>
            <Box margin="auto">
                <CircularProgress />
            </Box>
        </Box>
    );
}