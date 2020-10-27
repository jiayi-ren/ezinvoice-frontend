import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Button } from '@material-ui/core';
import SaveAlert from '../Common/SaveAlert';
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
        // if save button has not been clicked in the same session
        if (isSaved === false) {
            setIsSaved(true);
        } else {
            // pop the last saved copy
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

    return (
        <div>
            <div>
                {saveAlertOpen && (
                    <SaveAlert
                        history={history}
                        saveAlertOpen={saveAlertOpen}
                        setSaveAlertOpen={setSaveAlertOpen}
                        isSaved={isSaved}
                    />
                )}
                <Button variant="outlined" onClick={goBack}>
                    Back
                </Button>
                <Button variant="outlined" onClick={togglePreview}>
                    {isPreviewing ? 'Edit' : 'Preview'}
                </Button>
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
