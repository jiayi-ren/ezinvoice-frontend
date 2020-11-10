import React, { useState, useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { connect } from 'react-redux';
import ClientsTemplate from './ClientsTemplate';
import { useHistory, useParams } from 'react-router-dom';
import { Button } from '@material-ui/core';
import SaveAlert from '../Common/SaveAlert';
import { convertKeysCase } from '../../utils/caseConversion';
import {
    createClientAct,
    updateClientByIdAct,
} from '../../state/clients/clientActions';

const InitialForm = {
    name: '',
    email: '',
    street: '',
    cityState: '',
    zip: '',
    phone: '',
};

const ClientsGen = props => {
    const { clients, createClientAct, updateClientByIdAct } = props;
    const history = useHistory();
    const { slug } = useParams();
    const { isAuthenticated } = useAuth0();
    const [data, setData] = useState(InitialForm);
    const [isSaved, setIsSaved] = useState(false);
    const [saveAlertOpen, setSaveAlertOpen] = useState(false);

    useEffect(() => {
        if (slug !== 'new') {
            const clientIdx = slug.split('_')[1];
            if (isAuthenticated) {
                return setData(clients[clientIdx]);
            }
            const localClients = JSON.parse(
                window.localStorage.getItem('clients'),
            );
            setData(localClients[clientIdx]);
        }
    }, [clients, slug, isAuthenticated]);

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
                    if (isAuthenticated) {
                        saveClient();
                    } else {
                        saveToLocal();
                    }
                    setSaveAlertOpen(true);
                }}
            >
                Save
            </Button>
            <ClientsTemplate template={data} setTemplate={setData} />
        </div>
    );
};

const mapStateToProps = state => {
    return {
        clients: state.clients.clients,
    };
};

export default connect(mapStateToProps, {
    createClientAct,
    updateClientByIdAct,
})(ClientsGen);
