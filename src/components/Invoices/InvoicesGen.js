import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Button, Collapse } from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';
import { PDF } from '../Common/PDF';
import InvoicesTemplate from './InvoicesTemplate';

const InvoicesGen = props => {
    const history = useHistory();
    const [isPreviewing, setIsPreviewing] = useState(false);
    const [data, setData] = useState({});
    const [isSaved, setIsSaved] = useState(false);
    const [saveAlertOpen, setSaveAlertOpen] = useState(false);

    const togglePreview = () => {
        setIsPreviewing(!isPreviewing);
    };

    const saveToLocal = () => {
        if (window.localStorage.getItem('invoices') === null) {
            window.localStorage.setItem('invoices', JSON.stringify([]));
        }

        let newInvoices = JSON.parse(window.localStorage.getItem('invoices'));
        if (isSaved === false) {
            setIsSaved(true);
        } else {
            newInvoices.pop();
        }
        newInvoices.push(data);
        window.localStorage.setItem('invoices', JSON.stringify(newInvoices));
        setSaveAlertOpen(false);
    };

    const goBack = () => {
        if (isSaved) {
            history.push(`/invoices`);
        } else {
            setSaveAlertOpen(true);
        }
    };

    const saveAlert = () => {
        return (
            <Collapse in={saveAlertOpen}>
                {isSaved && (
                    <Alert severity="success">Saved Successfully</Alert>
                )}
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
                                        history.push(`/invoices`);
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
            </Collapse>
        );
    };

    return (
        <div>
            <div>
                {saveAlertOpen && saveAlert()}
                <Button variant="outlined" onClick={goBack}>
                    Back
                </Button>
                {isPreviewing ? (
                    <Button variant="outlined" onClick={togglePreview}>
                        Edit
                    </Button>
                ) : (
                    <Button variant="outlined" onClick={togglePreview}>
                        Preview
                    </Button>
                )}
                <Button variant="outlined">Email</Button>
                <Button
                    variant="outlined"
                    onClick={() => {
                        saveToLocal();
                        setSaveAlertOpen(true);
                    }}
                >
                    Save
                </Button>
                <Button variant="outlined">Print</Button>
            </div>
            {isPreviewing ? (
                <PDF data={data} />
            ) : (
                <InvoicesTemplate setData={setData} />
            )}
        </div>
    );
};

export default InvoicesGen;
