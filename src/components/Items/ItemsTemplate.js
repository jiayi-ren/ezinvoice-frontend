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
                <div className="template-header">
                    <label>
                        <input
                            name="description"
                            type="text"
                            value={template.description}
                            placeholder="Item Description"
                            onChange={handleChange}
                        />
                    </label>
                    <label>
                        <input
                            name="amount"
                            type="text"
                            value={template.amount}
                            placeholder="0.00"
                            onChange={handleChange}
                        />
                    </label>
                </div>
            </form>
        </div>
    )
};

export default ItemsTemplate;