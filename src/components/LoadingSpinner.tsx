import React from 'react';

export const LoadingSpinner = () => {
    return (
        <div className="mt-4">
            <div className="spinner-border d-flex m-auto" role="status">
                <span className="sr-only">Loading...</span>
            </div>
        </div>
    );
}