import React, { useState } from "react";

const fromInit = {
    name: "",
    email: "",
    street: "",
    cityState: "",
    zip: "",
    phone: "",
};

const toInit = {
    name: "",
    email: "",
    street: "",
    cityState: "",
    zip: "",
    phone: "",
};

const item = {
    description: "",
    amount: "",
};

const itemInit = [JSON.parse(JSON.stringify(item))];

const InitialForm = {
    title: "Estimate",
    estimateNumber: "",
    date: new Date().toJSON().slice(0, 10),
    from: fromInit,
    to: toInit,
    items: itemInit,
};


const EstimatesTemplate = props => {

    const [template, setTemplate] = useState(InitialForm);

    const handleChange = event => {

        const value = event.target.value;
        const target = event.target.name;
        const info = target.split("-");
        const nextState = Object.assign(template);

        if (target.includes("from") || target.includes("to")) {
            nextState[`${info[0]}`][`${info[1]}`] = value;
        }else if (target.includes("items")) {
            nextState[`${info[0]}`][parseInt(info[1])][`${info[2]}`] = value;
        }else {
            nextState[`${info[0]}`] = value;
        }

        setTemplate({
            ...template,
            nextState,
        });
    };

    const handleItemDelete = event => {
        event.preventDefault();
        const index = parseInt(event.target.name);
        const nextState = Object.assign(template);
        
        if (index !== 0) {
            nextState["items"].splice(index, 1);
        }else {
            nextState["items"][0] = JSON.parse(JSON.stringify(item));
        }

        setTemplate({
            ...template,
            nextState,
        });
    };

    const handleItemAdd = event => {
        event.preventDefault();
        const nextState = Object.assign(template);
        const newItem = JSON.parse(JSON.stringify(item));

        nextState["items"].push(newItem);

        setTemplate({
            ...template,
            nextState,
        });
    };

    return (
        <div>
            <form>
                <div className="template-header">
                    <label>
                        <input
                            name="title"
                            type="text"
                            value={template.title}
                            placeholder="Estimate"
                            onChange={handleChange}
                        />
                    </label>
                    <label>
                        <input
                            name="estimateNumber"
                            type="text"
                            value={template.estimateNumber}
                            placeholder="Estimate Number"
                            onChange={handleChange}
                        />
                    </label>
                    <label>
                        <input
                            name="date"
                            type="date"
                            value={template.date}
                            placeholder={`${template.date}`}
                            onChange={handleChange}
                        />
                    </label>
                </div>
                    
                <div className="template-from">
                    <label>
                        <input
                            name="from-name"
                            type="text"
                            value={template.from.name}
                            placeholder="Business Name"
                            onChange={handleChange}
                        />
                    </label>
                    <label>
                        <input
                            name="from-email"
                            type="text"
                            value={template.from.email}
                            placeholder="name@business.com"
                            onChange={handleChange}
                        />
                    </label>
                    <label>
                        <input
                            name="from-street"
                            type="text"
                            value={template.from.street}
                            placeholder="Street"
                            onChange={handleChange}
                        />
                    </label>
                    <label>
                        <input
                            name="from-cityState"
                            type="text"
                            value={template.from.cityState}
                            placeholder="City, State"
                            onChange={handleChange}
                        />
                    </label>
                    <label>
                        <input
                            name="from-zip"
                            type="text"
                            value={template.from.zip}
                            placeholder="Zip Code"
                            onChange={handleChange}
                        />
                    </label>
                    <label>
                        <input
                            name="from-phone"
                            type="text"
                            value={template.from.phone}
                            placeholder="123-456-7890"
                            onChange={handleChange}
                        />
                    </label>
                </div>
                <div>
                    <label>
                        <input
                            name="to-name"
                            type="text"
                            value={template.to.name}
                            placeholder="Client Name"
                            onChange={handleChange}
                        />
                    </label>
                    <label>
                        <input
                            name="to-email"
                            type="text"
                            value={template.to.email}
                            placeholder="name@client.com"
                            onChange={handleChange}
                        />
                    </label>
                    <label>
                        <input
                            name="to-street"
                            type="text"
                            value={template.to.street}
                            placeholder="Street"
                            onChange={handleChange}
                        />
                    </label>
                    <label>
                        <input
                            name="to-cityState"
                            type="text"
                            value={template.to.cityState}
                            placeholder="City, State"
                            onChange={handleChange}
                        />
                    </label>
                    <label>
                        <input
                            name="to-zip"
                            type="text"
                            value={template.to.zip}
                            placeholder="Zip Code"
                            onChange={handleChange}
                        />
                    </label>
                    <label>
                        <input
                            name="to-phone"
                            type="text"
                            value={template.to.phone}
                            placeholder="123-456-7890"
                            onChange={handleChange}
                        />
                    </label>
                </div>
                <div>
                    {template.items.map( (item, id) => {
                        return (
                            <div key={id}>
                                <button
                                    name={id}
                                    onClick={handleItemDelete}
                                >X</button>
                                <label>
                                    <input
                                        name={`items-${id}-description`}
                                        type="text"
                                        value={item.description}
                                        placeholder="Description"
                                        onChange={handleChange}
                                    />
                                </label>
                                <label>
                                    <input
                                        name={`items-${id}-amount`}
                                        type="text"
                                        value={item.amount}
                                        placeholder="0.00"
                                        onChange={handleChange}
                                    />
                                </label>
                            </div>
                        )
                    })}
                </div>
                <button
                    onClick={handleItemAdd}
                >+
                </button>
            </form>
        </div>
    )
};

export default EstimatesTemplate;