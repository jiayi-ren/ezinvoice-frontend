import { TextField } from "@material-ui/core";
import React, { useState } from "react";

const InitialForm = {
    description: "",
    amount: "",
};

const ItemsTemplate = props => {

    const [template, setTemplate] = useState(InitialForm);

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
                    name="amount"
                    type="text"
                    value={template.amount}
                    label="0.00"
                    onChange={handleChange}
                />
            </form>
        </div>
    )
};

export default ItemsTemplate;