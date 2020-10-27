import React, { useState } from 'react';
import ItemsTemplate from './ItemsTemplate';
import { useHistory } from 'react-router-dom';
import { Button } from '@material-ui/core';
import SaveAlert from '../Common/SaveAlert';

const ItemsGen = props => {
    const history = useHistory();
    const [data, setData] = useState({});
    const [isSaved, setIsSaved] = useState(false);
    const [saveAlertOpen, setSaveAlertOpen] = useState(false);

    const saveToLocal = () => {
        if (window.localStorage.getItem('items') === null) {
            window.localStorage.setItem('items', JSON.stringify([]));
        }

        let newItems = JSON.parse(window.localStorage.getItem('items'));
        // if save button has not been clicked in the same session
        if (isSaved === false) {
            setIsSaved(true);
        } else {
            // pop the last saved copy
            newItems.pop();
        }
        newItems.push(data);
        window.localStorage.setItem('items', JSON.stringify(newItems));
        setSaveAlertOpen(false);
    };

    const goBack = () => {
        if (isSaved) {
            history.push(`/items`);
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
                />
            )}
            <Button variant="contained" onClick={goBack}>
                Close
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
            <ItemsTemplate setData={setData} />
        </div>
    );
};

export default ItemsGen;
