import React, { useState, useEffect } from 'react';
import { TextField } from '@material-ui/core';

const InitialForm = {
    description: '',
    rate: '',
};

const ItemsTemplate = props => {
    const { setData } = props;
    const [template, setTemplate] = useState(InitialForm);

    useEffect(() => {
        setData(template);
    }, [template, setData]);

    const handleChange = event => {
        const value = event.target.value;
        const target = event.target.name;

        setTemplate({
            ...template,
            [target]: value,
        });
    };

    return (
        <div className="items-template">
            <form>
                <TextField
                    name="description"
                    type="text"
                    value={template.description}
                    label="Item Description"
                    onChange={handleChange}
                />
                <TextField
                    name="rate"
                    type="text"
                    value={template.rate}
                    label="0.00"
                    onChange={handleChange}
                />
            </form>
        </div>
    );
};

export default ItemsTemplate;