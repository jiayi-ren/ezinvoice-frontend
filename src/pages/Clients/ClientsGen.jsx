import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { Button, makeStyles } from '@material-ui/core';
import { convertKeysCase } from '../../utils/caseConversion';
import {
    createClientAct,
    updateClientByIdAct,
} from '../../state/clients/clientActions';
import { SaveAlert } from '../../components/Alerts';
import ClientsTemplate from './ClientsTemplate';

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
    name: '',
    email: '',
    street: '',
    cityState: '',
    zip: '',
    phone: '',
};

const ClientsGen = props => {
    const { clients, isLoggedIn, createClientAct, updateClientByIdAct } = props;
    const history = useHistory();
    const classes = useStyles();
    const { slug } = useParams();
    const [data, setData] = useState(InitialForm);
    const [isSaved, setIsSaved] = useState(false);
    const [saveAlertOpen, setSaveAlertOpen] = useState(false);

    useEffect(() => {
        if (slug !== 'new') {
            const clientIdx = slug.split('_')[1];
            if (isLoggedIn) {
                return setData(clients[clientIdx]);
            }
            const localClients = JSON.parse(
                window.localStorage.getItem('clients'),
            );
            setData(localClients[clientIdx]);
        }
    }, [clients, slug, isLoggedIn]);

    const saveToLocal = () => {
        if (window.localStorage.getItem('clients') === null) {
            window.localStorage.setItem('clients', JSON.stringify([]));
        }
        let newClients = JSON.parse(window.localStorage.getItem('clients'));
        if (slug === 'new') {
            isSaved === false ? setIsSaved(true) : newClients.pop();
            newClients.push(data);
        } else {
            newClients.splice(slug.split('_')[1], 1, data);
            setIsSaved(true);
        }
        window.localStorage.setItem('clients', JSON.stringify(newClients));
        setSaveAlertOpen(false);
    };

    const saveClient = () => {
        if (slug === 'new') {
            const reqData = convertKeysCase(data, 'snake');
            createClientAct(reqData);
            setIsSaved(true);
        } else {
            let reqData = convertKeysCase(data, 'snake');
            reqData.id = data.id;
            reqData.user_id = data.userId;
            updateClientByIdAct(reqData, reqData.id);
            setIsSaved(true);
        }
    };

    const goBack = () => {
        if (isSaved) {
            history.push(`/clients`);
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
                    path={'/clients'}
                />
            )}
            <div className={`${classes.container} ${classes.options}`}>
                <Button
                    variant="contained"
                    className={classes.button}
                    onClick={goBack}
                >
                    Back
                </Button>
                <Button
                    variant="contained"
                    className={classes.button}
                    onClick={() => {
                        if (isLoggedIn) {
                            saveClient();
                        } else {
                            saveToLocal();
                        }
                        setSaveAlertOpen(true);
                    }}
                >
                    Save
                </Button>
            </div>
            <ClientsTemplate template={data} setTemplate={setData} />
        </div>
    );
};

const mapStateToProps = state => {
    return {
        clients: state.clients.clients,
        isLoggedIn: state.user.isLoggedIn,
    };
};

export default connect(mapStateToProps, {
    createClientAct,
    updateClientByIdAct,
})(ClientsGen);
