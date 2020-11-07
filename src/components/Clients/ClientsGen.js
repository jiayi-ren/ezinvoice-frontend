import React, { useState } from 'react';
import ClientsTemplate from './ClientsTemplate';
import { useHistory } from 'react-router-dom';
import { Button } from '@material-ui/core';
import SaveAlert from '../Common/SaveAlert';

const ClientsGen = props => {
    const history = useHistory();
    const [data, setData] = useState({});
    const [isSaved, setIsSaved] = useState(false);
    const [saveAlertOpen, setSaveAlertOpen] = useState(false);

    const saveToLocal = () => {
        if (window.localStorage.getItem('clients') === null) {
            window.localStorage.setItem('clients', JSON.stringify([]));
        }

        let newClients = JSON.parse(window.localStorage.getItem('clients'));
        // if save button has not been clicked in the same session
        if (isSaved === false) {
            setIsSaved(true);
        } else {
            // pop the last saved copy
            newClients.pop();
        }
        newClients.push(data);
        window.localStorage.setItem('clients', JSON.stringify(newClients));
        setSaveAlertOpen(false);
    };

    const goBack = () => {
        if (isSaved) {
            history.push(`/clients`);
        } else {
            setSaveAlertOpen(true);
        }
    };

    return (
        <div>
            {saveAlertOpen && (
                <SaveAlert
                    history={history}
                    saveAlertOpen={saveAlertOpen}
                    setSaveAlertOpen={setSaveAlertOpen}
                    isSaved={isSaved}
                    path={'/clients'}
                />
            )}
            <Button variant="contained" onClick={goBack}>
                Back
            </Button>
            <Button
                variant="contained"
                onClick={() => {
                    saveToLocal();
                    setSaveAlertOpen(true);
                }}
            >
                Save
            </Button>
            <ClientsTemplate setData={setData} />
        </div>
    );
};

export default ClientsGen;
