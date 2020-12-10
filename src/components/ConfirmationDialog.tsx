import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

type Props = {
    mainText: string;
    isVisible: boolean;
    handleClose(): void;
    onAgreed(): void;
}


export const ConfirmationDialog = ({mainText, isVisible, handleClose, onAgreed}: Props) => {
    return (
        <div>
            <Dialog
                open={isVisible}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">{mainText}</DialogTitle>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        No
                    </Button>
                    <Button onClick={() => {
                        onAgreed();
                        handleClose();
                    }} color="primary" autoFocus>
                        Yes
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}