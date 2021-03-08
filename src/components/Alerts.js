import React from 'react';
import PropTypes from 'prop-types';
import { Button, Collapse, CircularProgress } from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';

export const SaveAlert = props => {
    const {
        isLoggedIn,
        history,
        saveAlertOpen,
        setSaveAlertOpen,
        isSaved,
        isModified,
        isValidated,
        path,
        status,
        message,
        isGoingBack,
    } = props;

    return (
        <Collapse in={saveAlertOpen} id="notification">
            {(typeof isValidated !== 'undefined' ? !isValidated : false) &&
                isModified && (
                    <Alert severity="error">
                        There are some errors. Please fix the error fields
                        before saving.
                    </Alert>
                )}
            {(typeof isValidated !== 'undefined' ? isValidated : true) &&
                isSaved === false &&
                isModified &&
                isGoingBack && (
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
                        Your work has not been saved. Do you still want to
                        leave?
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
            {(typeof isValidated !== 'undefined' ? isValidated : true) &&
                ((isLoggedIn && status === 'succeeded') || !isLoggedIn) &&
                isSaved && (
                    <Alert severity="success">
                        Saved Successfully. {message}
                    </Alert>
                )}
            {isLoggedIn && status === 'failed' && (
                <Alert severity="error">{message}</Alert>
            )}
        </Collapse>
    );
};

SaveAlert.propTypes = {
    isLoggedIn: PropTypes.bool.isRequired,
    history: PropTypes.shape({
        push: PropTypes.func.isRequired,
    }).isRequired,
    saveAlertOpen: PropTypes.bool.isRequired,
    setSaveAlertOpen: PropTypes.func.isRequired,
    isSaved: PropTypes.bool.isRequired,
    isModified: PropTypes.bool.isRequired,
    isValidated: PropTypes.bool,
    path: PropTypes.string.isRequired,
    status: PropTypes.string.isRequired,
    message: PropTypes.string.isRequired,
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

DeleteAlert.propTypes = {
    deleteAlertOpen: PropTypes.bool.isRequired,
    setDeleteAlertOpen: PropTypes.func.isRequired,
    isDeleted: PropTypes.bool.isRequired,
    deleteAction: PropTypes.func.isRequired,
    status: PropTypes.string.isRequired,
};
