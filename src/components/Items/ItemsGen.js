import React, { useState, useEffect } from 'react';
import ItemsTemplate from './ItemsTemplate';
import { useHistory, useParams } from 'react-router-dom';
import { connect } from 'react-redux';
import { Button } from '@material-ui/core';
import { SaveAlert } from '../Common/Alerts';
import {
    createItemAct,
    updateItemByIdAct,
} from '../../state/items/itemActions';
import { convertKeysCase } from '../../utils/caseConversion';
import { useAuth0 } from '@auth0/auth0-react';

const ItemsGen = props => {
    const { items, createItemAct, updateItemByIdAct } = props;
    const history = useHistory();
    const { slug } = useParams();
    const { isAuthenticated } = useAuth0();
    const [data, setData] = useState({});
    const [isSaved, setIsSaved] = useState(false);
    const [saveAlertOpen, setSaveAlertOpen] = useState(false);

    useEffect(() => {
        if (slug !== 'new') {
            const itemIdx = slug.split('_')[1];
            if (isAuthenticated) {
                return setData(items[itemIdx]);
            }
            const localClients = JSON.parse(
                window.localStorage.getItem('items'),
            );
            setData(localClients[itemIdx]);
        }
    }, [items, slug, isAuthenticated]);

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

    const saveItem = () => {
        if (slug === 'new') {
            const reqData = convertKeysCase(data, 'snake');
            createItemAct(reqData);
            setIsSaved(true);
        } else {
            let reqData = convertKeysCase(data, 'snake');
            reqData.id = data.id;
            reqData.user_id = data.userId;
            updateItemByIdAct(reqData, reqData.id);
            setIsSaved(true);
        }
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
                    path="/items"
                />
            )}
            <Button variant="contained" onClick={goBack}>
                Close
            </Button>
            <Button
                variant="contained"
                onClick={() => {
                    if (isAuthenticated) {
                        saveItem();
                    } else {
                        saveToLocal();
                    }
                    setSaveAlertOpen(true);
                }}
            >
                Save
            </Button>
            <ItemsTemplate setData={setData} />
        </div>
    );
};

const mapStateToProps = state => {
    return {
        items: state.items.items,
        status: state.items.status,
    };
};

export default connect(mapStateToProps, {
    createItemAct,
    updateItemByIdAct,
})(ItemsGen);
