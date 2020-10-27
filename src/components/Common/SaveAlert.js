import React from 'react';
import { Button, Collapse } from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';

const SaveAlert = props => {
    const { history, saveAlertOpen, setSaveAlertOpen, isSaved } = props;

    return (
        <Collapse in={saveAlertOpen}>
            {isSaved && <Alert severity="success">Saved Successfully</Alert>}
            {!isSaved && (
                <Alert
                    variant="filled"
                    severity="warning"
                    action={
                        <>
                            <Button
                                aria-label="close"
                                color="inherit"
                                size="small"
                                onClick={() => {
                                    history.push(`/estimates`);
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
        </Collapse>
    );
};

export default SaveAlert;
