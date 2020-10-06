import React, { useState } from "react";
import { Button, makeStyles, Table, TableBody, TableCell, TableHead, TableRow, TextField } from "@material-ui/core";

const useStyles = makeStyles({
    form: {
        border: '2px black solid',
        margin: '50px',
        maxWidth: '70%'
    },
    templateHeader: {
        display: 'flex',
        justifyContent: 'space-between',
        margin: '10% 10% 2%',
    },
    templateHeaderInfo: {
        display: 'flex',
        flexDirection: 'column',
    },
    templateInfo: {
        display: 'flex',
        justifyContent: 'space-between',
    },
    templateFrom : {
        display: 'flex',
        flexDirection: 'column',
        width: '35%',
        margin: '0 10%'
    },
    templateTo: {
        display: 'flex',
        flexDirection: 'column',
        width: '35%',
        margin: '0 10%'
    },
    templateTable: {
        margin: '5% 10% 0',
        maxWidth: '80%'
    },
    templateTableHeader: {
        border: '1px black solid',
        backgroundColor: 'lightgrey'
    },
    templateTableBody: {
        border: '1px black solid'
    },
    templateTableRow: {
        width: '70%'
    },
    templateTableCol: {
        
    },
    templateTableDel: {
        
    },
    addButton: {
        margin: '1% 10% 5%'
    }
})

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

    const classes = useStyles()

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
            <form className={classes.form}>
                <div className={classes.templateHeader}>
                    <TextField
                            name="title"
                            type="text"
                            value={template.title}
                            label="Title"
                            onChange={handleChange}
                            inputProps={{style: {fontSize: 30}}}
                    />
                    <div className={classes.templateHeaderInfo}>
                        <TextField
                            name="estimateNumber"
                            type="text"
                            value={template.estimateNumber}
                            label="Estimate #"
                            onChange={handleChange}
                        />
                        <TextField
                            name="date"
                            type="date"
                            value={template.date}
                            label="Date"
                            onChange={handleChange}
                        />
                    </div>
                </div>
                <div className={classes.templateInfo}>
                    <div className={classes.templateFrom}>
                        <TextField
                            name="from-name"
                            type="text"
                            value={template.from.name}
                            label="Business Name"
                            onChange={handleChange}
                        />
                        <TextField
                            name="from-email"
                            type="text"
                            value={template.from.email}
                            label="Business Email"
                            onChange={handleChange}
                        />
                        <TextField
                            name="from-street"
                            type="text"
                            value={template.from.street}
                            label="Street"
                            onChange={handleChange}
                        />
                        <TextField
                            name="from-cityState"
                            type="text"
                            value={template.from.cityState}
                            label="City, State"
                            onChange={handleChange}
                        />
                        <TextField
                            name="from-zip"
                            type="text"
                            value={template.from.zip}
                            label="Zip Code"
                            onChange={handleChange}
                        />
                        <TextField
                            name="from-phone"
                            type="text"
                            value={template.from.phone}
                            label="123-456-7890"
                            onChange={handleChange}
                        />
                    </div>
                    <div className={classes.templateTo}>
                        <TextField
                            name="to-name"
                            type="text"
                            value={template.to.name}
                            label="Client Name"
                            onChange={handleChange}
                        />
                        <TextField
                            name="to-email"
                            type="text"
                            value={template.to.email}
                            label="Client Email"
                            onChange={handleChange}
                        />
                        <TextField
                            name="to-street"
                            type="text"
                            value={template.to.street}
                            label="Street"
                            onChange={handleChange}
                        />
                        <TextField
                            name="to-cityState"
                            type="text"
                            value={template.to.cityState}
                            label="City, State"
                            onChange={handleChange}
                        />
                        <TextField
                            name="to-zip"
                            type="text"
                            value={template.to.zip}
                            label="Zip Code"
                            onChange={handleChange}
                        />
                        <TextField
                            name="to-phone"
                            type="text"
                            value={template.to.phone}
                            label="123-456-7890"
                            onChange={handleChange}
                        />
                    </div>
                </div>
                <Table className={classes.templateTable}>
                    <TableHead className={`${classes.templateTableHeader}`}>
                        <TableRow>
                            <TableCell className={classes.templateTableDel}></TableCell>
                            <TableCell>Description</TableCell>
                            <TableCell align="right">Amount</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                    {template.items.map( (item, id) => {
                        return (                           
                            <TableRow key={id} className={classes.templateTableRow}>
                                <TableCell className={classes.templateTableDel}>
                                    <Button
                                        variant="outlined"
                                        name={id}
                                        onClick={handleItemDelete}
                                    >X</Button>
                                </TableCell>
                                <TableCell className={classes.templateTableCol} align="right">
                                    <TextField
                                        name={`items-${id}-description`}
                                        type="text"
                                        value={item.description}
                                        label="Description"
                                        onChange={handleChange}
                                        fullWidth
                                    />
                                </TableCell>
                                <TableCell className={classes.templateTableCol} align="right">
                                    <TextField
                                        name={`items-${id}-amount`}
                                        type="text"
                                        value={item.amount}
                                        label="0.00"
                                        onChange={handleChange}
                                        width="10%"
                                    />
                                </TableCell>
                            </TableRow>
                        )
                    })}
                    </TableBody>
                </Table>
                <Button
                    variant="outlined"
                    onClick={handleItemAdd}
                    className={classes.addButton}
                >+
                </Button>
            </form>
        </div>
    )
};

export default EstimatesTemplate;