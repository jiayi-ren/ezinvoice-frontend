import { Button } from '@material-ui/core';
import React, { useState } from 'react';
import { PDF } from '../Common/PDF';
import InvoicesTemplate from './InvoicesTemplate';

const InvoicesGen = props => {

    const [isPreviewing, setIsPreviewing] = useState(false)
    const [pdfData, setPdfData] = useState({})

    const togglePreview = () => {
        setIsPreviewing(!isPreviewing)
    }

    return (
        <div>
            <div>
                {isPreviewing? 
                    (
                        <Button variant="outlined" onClick={togglePreview}>Edit</Button>
                    ):
                    (
                        <Button variant="outlined" onClick={togglePreview}>Preview</Button>
                    )
                }
                <Button variant="outlined">Email</Button>
                <Button variant="outlined">Save</Button>
                <Button variant="outlined">Print</Button>
                <Button variant="outlined">Delete</Button>
            </div>
            {isPreviewing? 
                (
                    <PDF data={pdfData}/>
                ):
                (
                    <InvoicesTemplate setPdfData={setPdfData}/>
                )
            }

        </div>
    )
}

export default InvoicesGen;
