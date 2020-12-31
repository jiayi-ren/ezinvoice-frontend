import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Button } from '@material-ui/core';
import { PDF } from '../../components/Common/PDF';
import { SaveAlert } from '../../components/Alerts';
import EstimatesTemplate from './EstimatesTemplate';

const EstimatesGen = props => {
    const history = useHistory();
    const [isPreviewing, setIsPreviewing] = useState(false);
    const [data, setData] = useState({});
    const [isSaved, setIsSaved] = useState(false);
    const [saveAlertOpen, setSaveAlertOpen] = useState(false);

    const togglePreview = () => {
        setIsPreviewing(!isPreviewing);
    };

    const saveToLocal = () => {
        if (window.localStorage.getItem('estimates') === null) {
            window.localStorage.setItem('estimates', JSON.stringify([]));
        }

        let newEstimates = JSON.parse(window.localStorage.getItem('estimates'));
        // if save button has not been clicked in the same session
        if (isSaved === false) {
            setIsSaved(true);
        } else {
            // pop the last saved copy
            newEstimates.pop();
        }
        newEstimates.push(data);
        window.localStorage.setItem('estimates', JSON.stringify(newEstimates));
        setSaveAlertOpen(false);
    };

    const goBack = () => {
        if (isSaved) {
            history.push(`/estimates`);
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
                        path={'/estimates'}
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
                <EstimatesTemplate setData={setData} />
            )}
        </div>
    );
};

export default EstimatesGen;
