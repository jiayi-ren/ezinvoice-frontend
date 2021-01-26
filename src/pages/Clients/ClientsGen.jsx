import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { Button, makeStyles } from '@material-ui/core';
import { convertKeysCase } from '../../utils/caseConversion';
import isEqual from 'lodash.isequal';
import {
    createClientAct,
    updateClientByIdAct,
} from '../../state/clients/clientActions';
import { SaveAlert } from '../../components/Alerts';
import ContactTemplate from '../../components/ContactTemplate';

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

const InitialErrors = {
    name: '',
    email: '',
    street: '',
    cityState: '',
    zip: '',
    phone: '',
};

const ClientsGen = props => {
    const {
        clients,
        isLoggedIn,
        status,
        message,
        createClientAct,
        updateClientByIdAct,
    } = props;
    const history = useHistory();
    const classes = useStyles();
    const { slug } = useParams();
    const [data, setData] = useState(JSON.parse(JSON.stringify(InitialForm)));
    const [errors, setErrors] = useState(
        JSON.parse(JSON.stringify(InitialErrors)),
    );
    const [isValidated, setIsValidated] = useState(true);
    const [isSaved, setIsSaved] = useState(false);
    const [isModified, setIsModified] = useState(false);
    const [saveAlertOpen, setSaveAlertOpen] = useState(false);

    useEffect(() => {
        if (slug !== 'new') {
            const slugs = slug.split('&');
            const clientLocalId = parseInt(slugs[0].split('=')[1]);
            const clientId = parseInt(slugs[1].split('=')[1]);
            if (isLoggedIn) {
                return setData(clients[clientId]);
            }
            const localClients = JSON.parse(
                window.localStorage.getItem('clients'),
            );
            setData(localClients[clientLocalId]);
        }
    }, [clients, slug, isLoggedIn]);

    const saveToLocal = () => {
        if (!isEqual(errors, InitialErrors)) {
            return setIsValidated(false);
        }

        if (window.localStorage.getItem('clients') === null) {
            window.localStorage.setItem('clients', JSON.stringify([]));
        }
        let newClients = JSON.parse(window.localStorage.getItem('clients'));
        if (slug === 'new') {
            isSaved === false ? setIsSaved(true) : newClients.pop();
            newClients.push(data);
        } else {
            const slugs = slug.split('&');
            const clientIdx = parseInt(slugs[0].split('=')[1]);
            newClients.splice(clientIdx, 1, data);
        }
        window.localStorage.setItem('clients', JSON.stringify(newClients));
        setIsSaved(true);
        setSaveAlertOpen(false);
        setIsValidated(true);
    };

    const saveClient = () => {
        if (!isEqual(errors, InitialErrors)) {
            return setIsValidated(false);
        }

        if (slug === 'new') {
            const reqData = convertKeysCase(data, 'snake');
            createClientAct(reqData);
        } else {
            let reqData = convertKeysCase(data, 'snake');
            reqData.id = data.id;
            reqData.user_id = data.userId;
            updateClientByIdAct(reqData, reqData.id);
        }
        setIsSaved(true);
        setIsValidated(true);
    };

    const goBack = () => {
        if (!isModified || isSaved) {
            history.push(`/clients`);
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
                    isValidated={isValidated}
                    path={'/clients'}
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
            <ContactTemplate
                data={data}
                setData={setData}
                dataType={'clients'}
                setIsModified={setIsModified}
                errors={errors}
                setErrors={setErrors}
            />
        </div>
    );
};

const mapStateToProps = state => {
    return {
        clients: state.clients.clients,
        isLoggedIn: state.user.isLoggedIn,
        status: state.clients.status,
        message: state.clients.message,
    };
};

ClientsGen.propTypes = {
    clients: PropTypes.object.isRequired,
    isLoggedIn: PropTypes.bool.isRequired,
    status: PropTypes.string.isRequired,
    message: PropTypes.string.isRequired,
    createClientAct: PropTypes.func.isRequired,
    updateClientByIdAct: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, {
    createClientAct,
    updateClientByIdAct,
})(ClientsGen);
