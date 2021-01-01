import React from 'react';
import { Button, Collapse, CircularProgress } from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';

export const SaveAlert = props => {
    const {
        isAuthenticated,
        history,
        saveAlertOpen,
        setSaveAlertOpen,
        isSaved,
        isValidated,
        path,
        status,
    } = props;

    return (
        <Collapse in={saveAlertOpen}>
            {!isValidated && (
                <Alert severity="error">
                    There are some errors. Please fix the red fields before
                    saving.
                </Alert>
            )}
            {isValidated && !isSaved && (
                <Alert
                    severity="warning"
                    action={
                        <>
                            <Button
                                aria-label="close"
                                color="inherit"
                                size="small"
                                onClick={() => {
                                    history.push(`${path}`);
                                }}
                            >
                                Yes
                            </Button>
                            <Button
                                aria-label="close"
                                color="inherit"
                                size="small"
                                onClick={() => {
                                    setSaveAlertOpen(false);
                                }}
                            >
                                No
                            </Button>
                        </>
                    }
                >
                    Your work has not been saved. Do you still want to leave?
                </Alert>
            )}
            {status === 'loading' && (
                <Alert
                    severity="info"
                    icon={
                        <CircularProgress
                            style={{
                                width: '20px',
                                height: '20px',
                            }}
                        />
                    }
                >
                    Saving
                </Alert>
            )}
            {isSaved &&
                ((isAuthenticated && status === 'succeeded') ||
                    !isAuthenticated) && (
                    <Alert severity="success">Saved Successfully</Alert>
                )}
            {isAuthenticated && status === 'failed' && (
                <Alert severity="error">
                    Something went wrong, Failed to save
                </Alert>
            )}
        </Collapse>
    );
};

export const DeleteAlert = props => {
    const {
        deleteAlertOpen,
        setDeleteAlertOpen,
        isDeleted,
        deleteAction,
        status,
    } = props;

    return (
        <Collapse in={deleteAlertOpen}>
            {status === 'loading' && (
                <Alert
                    severity="info"
                    icon={
                        <CircularProgress
                            style={{
                                width: '20px',
                                height: '20px',
                            }}
                        />
                    }
                >
                    Deleting
                </Alert>
            )}
            {isDeleted && status === 'succeeded' && (
                <Alert severity="success">Deleted Successfully</Alert>
            )}
            {status === 'failed' && (
                <Alert severity="error">Failed to delete</Alert>
            )}
            {!isDeleted && (
                <Alert
                    severity="warning"
                    action={
                        <>
                            <Button
                                aria-label="close"
                                color="inherit"
                                size="small"
                                onClick={deleteAction}
                            >
                                Yes
                            </Button>
                            <Button
                                aria-label="close"
                                color="inherit"
                                size="small"
                                onClick={() => {
                                    setDeleteAlertOpen(false);
                                }}
                            >
                                No
                            </Button>
                        </>
                    }
                >
                    Confirm you want to delete (This action cannot be undone)
                </Alert>
            )}
        </Collapse>
    );
};
