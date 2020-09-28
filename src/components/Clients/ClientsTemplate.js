import React, { useState } from "react";

const InitialForm = {
    name: "",
    email: "",
    street: "",
    cityState: "",
    zip: "",
    phone: "",
};

const ClientsTemplate = props => {

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
        <div>
            <form>
                <div className="template-header">
                    <label>
                        <input
                            name="name"
                            type="text"
                            value={template.name}
                            placeholder="Client Name"
                            onChange={handleChange}
                        />
                    </label>
                    <label>
                        <input
                            name="email"
                            type="text"
                            value={template.email}
                            placeholder="name@client.com"
                            onChange={handleChange}
                        />
                    </label>
                    <label>
                        <input
                            name="street"
                            type="text"
                            value={template.street}
                            placeholder="Street"
                            onChange={handleChange}
                        />
                    </label>
                    <label>
                        <input
                            name="cityState"
                            type="text"
                            value={template.cityState}
                            placeholder="City, State"
                            onChange={handleChange}
                        />
                    </label>
                    <label>
                        <input
                            name="zip"
                            type="text"
                            value={template.zip}
                            placeholder="Zip Code"
                            onChange={handleChange}
                        />
                    </label>
                    <label>
                        <input
                            name="phone"
                            type="text"
                            value={template.phone}
                            placeholder="123-456-7890"
                            onChange={handleChange}
                        />
                    </label>
                </div>
            </form>
        </div>
    )
};

export default ClientsTemplate;