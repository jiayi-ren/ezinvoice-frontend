import { Button } from '@material-ui/core';
import React from 'react';
import InvoicesTemplate from './InvoicesTemplate';

const InvoicesGen = props => {

    return (
        <div>
            <div>
                <Button variant="outlined">Preview</Button>
                <Button variant="outlined">Edit</Button>
                <Button variant="outlined">Email</Button>
                <Button variant="outlined">Save</Button>
                <Button variant="outlined">Print</Button>
                <Button variant="outlined">Delete</Button>
            </div>
            <>
                <InvoicesTemplate />
            </>
        </div>
    )
}

export default InvoicesGen;
