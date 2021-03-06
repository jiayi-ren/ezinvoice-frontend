import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
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

const InitialForm = {
    description: '',
    rate: '',
};

const ItemsGen = props => {
    const {
        items,
        status,
        isLoggedIn,
        message,
        createItemAct,
        updateItemByIdAct,
    } = props;
    const history = useHistory();
    const classes = useStyles();
    const { slug } = useParams();
    const [data, setData] = useState(JSON.parse(JSON.stringify(InitialForm)));
    const [isSaved, setIsSaved] = useState(false);
    const [isModified, setIsModified] = useState(false);
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

    const saveItem = async () => {
        if (slug === 'new') {
            const reqData = convertKeysCase(data, 'snake');
            await createItemAct(reqData);
            if (status === 'succeeded') {
                setIsSaved(true);
            } else if (status === 'failed') {
                setIsSaved(false);
            }
        } else {
            let reqData = convertKeysCase(data, 'snake');
            reqData.id = data.id;
            reqData.user_id = data.userId;
            await updateItemByIdAct(reqData, reqData.id);
            if (status === 'succeeded') {
                setIsSaved(true);
            } else if (status === 'failed') {
                setIsSaved(false);
            }
        }
    };

    const goBack = () => {
        if (!isModified || isSaved) {
            history.push(`/items`);
        }
        setSaveAlertOpen(true);
    };

    return (
        <div className={classes.container}>
            {saveAlertOpen && (
                <SaveAlert
                    history={history}
                    saveAlertOpen={saveAlertOpen}
                    setSaveAlertOpen={setSaveAlertOpen}
                    isSaved={isSaved}
                    isModified={isModified}
                    path={'/items'}
                    isLoggedIn={isLoggedIn}
                    status={status}
                    message={message}
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
            <ItemsTemplate
                data={data}
                setData={setData}
                setIsModified={setIsModified}
            />
        </div>
    );
};

const mapStateToProps = state => {
    return {
        items: state.items.items,
        status: state.items.status,
        isLoggedIn: state.user.isLoggedIn,
        message: state.items.message,
    };
};

ItemsGen.propTypes = {
    items: PropTypes.array.isRequired,
    status: PropTypes.string.isRequired,
    isLoggedIn: PropTypes.bool.isRequired,
    message: PropTypes.string.isRequired,
    createItemAct: PropTypes.func.isRequired,
    updateItemByIdAct: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, {
    createItemAct,
    updateItemByIdAct,
})(ItemsGen);
