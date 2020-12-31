import React, { useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { connect } from 'react-redux';
import { Button, makeStyles } from '@material-ui/core';
import {
    createItemAct,
    updateItemByIdAct,
} from '../../state/items/itemActions';
import { convertKeysCase } from '../../utils/caseConversion';
import { SaveAlert } from '../../components/Alerts';
import ItemsTemplate from './ItemsTemplate';

const useStyles = makeStyles({
    button: {
        margin: '5px',
    },
    container: {
        margin: '30px auto',
    },
    options: {
        width: '500px',
        display: 'flex',
        justifyContent: 'space-between',
    },
});

const ItemsGen = props => {
    const { items, isLoggedIn, createItemAct, updateItemByIdAct } = props;
    const history = useHistory();
    const classes = useStyles();
    const { slug } = useParams();
    const [data, setData] = useState({});
    const [isSaved, setIsSaved] = useState(false);
    const [saveAlertOpen, setSaveAlertOpen] = useState(false);

    useEffect(() => {
        if (slug !== 'new') {
            const itemIdx = slug.split('_')[1];
            if (isLoggedIn) {
                return setData(items[itemIdx]);
            }
            const localClients = JSON.parse(
                window.localStorage.getItem('items'),
            );
            setData(localClients[itemIdx]);
        }
    }, [items, slug, isLoggedIn]);

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
        <div className={classes.container}>
            {saveAlertOpen && (
                <SaveAlert
                    history={history}
                    saveAlertOpen={saveAlertOpen}
                    setSaveAlertOpen={setSaveAlertOpen}
                    isSaved={isSaved}
                    path="/items"
                />
            )}
            <div className={`${classes.container} ${classes.options}`}>
                <Button
                    variant="contained"
                    className={classes.button}
                    onClick={goBack}
                >
                    Close
                </Button>
                <Button
                    variant="contained"
                    className={classes.button}
                    onClick={() => {
                        if (isLoggedIn) {
                            saveItem();
                        } else {
                            saveToLocal();
                        }
                        setSaveAlertOpen(true);
                    }}
                >
                    Save
                </Button>
            </div>
            <ItemsTemplate setData={setData} />
        </div>
    );
};

const mapStateToProps = state => {
    return {
        items: state.items.items,
        status: state.items.status,
        isLoggedIn: state.user.isLoggedIn,
    };
};

export default connect(mapStateToProps, {
    createItemAct,
    updateItemByIdAct,
})(ItemsGen);
