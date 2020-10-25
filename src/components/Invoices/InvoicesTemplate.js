import {
    Button,
    makeStyles,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    TextField,
} from '@material-ui/core';
import React, { useEffect, useState } from 'react';

const useStyles = makeStyles({
    form: {
        border: '2px black solid',
        margin: '50px',
        maxWidth: '70%',
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
    templateFrom: {
        display: 'flex',
        flexDirection: 'column',
        width: '35%',
        margin: '0 10%',
    },
    templateTo: {
        display: 'flex',
        flexDirection: 'column',
        width: '35%',
        margin: '0 10%',
    },
    templateTable: {
        margin: '5% 10% 0',
        maxWidth: '80%',
    },
    templateTableHeader: {
        border: '1px black solid',
        backgroundColor: 'lightgrey',
    },
    templateTableBody: {
        border: '1px black solid',
    },
    templateTableRow: {
        width: '70%',
    },
    templateTableCol: {},
    templateTableDel: {},
    addButton: {
        margin: '1% 10% 5%',
    },
});

const fromInit = {
    name: '',
    email: '',
    street: '',
    cityState: '',
    zip: '',
    phone: '',
};

const toInit = {
    name: '',
    email: '',
    street: '',
    cityState: '',
    zip: '',
    phone: '',
};

const item = {
    description: '',
    qty: '',
    rate: '',
    amount: '',
};

const itemInit = [JSON.parse(JSON.stringify(item))];

const InitialForm = {
    title: 'Invoice',
    docNumber: '00000',
    date: new Date().toJSON().slice(0, 10),
    business: fromInit,
    client: toInit,
    items: itemInit,
};

const InvoicesTemplate = props => {
    const classes = useStyles();

    const { setPdfData } = props;

    const [template, setTemplate] = useState(InitialForm);

    useEffect(() => {
        setPdfData(template);
    }, [template, setPdfData]);

    const handleChange = event => {
        const value = event.target.value;
        const target = event.target.name;
        const info = target.split('-');
        const nextState = Object.assign(template);

        if (target.includes('business') || target.includes('client')) {
            nextState[`${info[0]}`][`${info[1]}`] = value;
        } else if (target.includes('items')) {
            nextState[`${info[0]}`][parseInt(info[1])][`${info[2]}`] = value;
        } else {
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
            nextState['items'].splice(index, 1);
        } else {
            nextState['items'][0] = JSON.parse(JSON.stringify(item));
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

        nextState['items'].push(newItem);

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
                        inputProps={{ style: { fontSize: 30 } }}
                    />
                    <div className={classes.templateHeaderInfo}>
                        <TextField
                            name="docNumber"
                            type="text"
                            value={template.docNumber}
                            label="Invoice #"
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
                            name="business-name"
                            type="text"
                            value={template.business.name}
                            label="Business Name"
                            onChange={handleChange}
                        />
                        <TextField
                            name="business-email"
                            type="text"
                            value={template.business.email}
                            label="Business Email"
                            onChange={handleChange}
                        />
                        <TextField
                            name="business-street"
                            type="text"
                            value={template.business.street}
                            label="Street"
                            onChange={handleChange}
                        />
                        <TextField
                            name="business-cityState"
                            type="text"
                            value={template.business.cityState}
                            label="City, State"
                            onChange={handleChange}
                        />
                        <TextField
                            name="business-zip"
                            type="text"
                            value={template.business.zip}
                            label="Zip Code"
                            onChange={handleChange}
                        />
                        <TextField
                            name="business-phone"
                            type="text"
                            value={template.business.phone}
                            label="123-456-7890"
                            onChange={handleChange}
                        />
                    </div>
                    <div className={classes.templateTo}>
                        <TextField
                            name="client-name"
                            type="text"
                            value={template.client.name}
                            label="Client Name"
                            onChange={handleChange}
                        />
                        <TextField
                            name="client-email"
                            type="text"
                            value={template.client.email}
                            label="Client Email"
                            onChange={handleChange}
                        />
                        <TextField
                            name="client-street"
                            type="text"
                            value={template.client.street}
                            label="Street"
                            onChange={handleChange}
                        />
                        <TextField
                            name="client-cityState"
                            type="text"
                            value={template.client.cityState}
                            label="City, State"
                            onChange={handleChange}
                        />
                        <TextField
                            name="client-zip"
                            type="text"
                            value={template.client.zip}
                            label="Zip Code"
                            onChange={handleChange}
                        />
                        <TextField
                            name="client-phone"
                            type="text"
                            value={template.client.phone}
                            label="123-456-7890"
                            onChange={handleChange}
                        />
                    </div>
                </div>
                <Table className={classes.templateTable}>
                    <TableHead className={`${classes.templateTableHeader}`}>
                        <TableRow>
                            <TableCell
                                className={classes.templateTableDel}
                            ></TableCell>
                            <TableCell>Description</TableCell>
                            <TableCell>Qty</TableCell>
                            <TableCell>Rate</TableCell>
                            <TableCell align="right">Amount</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {template.items.map((item, id) => {
                            return (
                                <TableRow
                                    key={id}
                                    className={classes.templateTableRow}
                                >
                                    <TableCell
                                        className={classes.templateTableDel}
                                    >
                                        <Button
                                            variant="outlined"
                                            name={id}
                                            onClick={handleItemDelete}
                                        >
                                            X
                                        </Button>
                                    </TableCell>
                                    <TableCell
                                        className={classes.templateTableCol}
                                        align="right"
                                    >
                                        <TextField
                                            name={`items-${id}-description`}
                                            type="text"
                                            value={item.description}
                                            label="Description"
                                            onChange={handleChange}
                                            fullWidth
                                        />
                                    </TableCell>
                                    <TableCell
                                        className={classes.templateTableCol}
                                        align="right"
                                    >
                                        <TextField
                                            name={`items-${id}-qty`}
                                            type="text"
                                            value={item.qty}
                                            label="Qty"
                                            onChange={handleChange}
                                            fullWidth
                                        />
                                    </TableCell>
                                    <TableCell
                                        className={classes.templateTableCol}
                                        align="right"
                                    >
                                        <TextField
                                            name={`items-${id}-rate`}
                                            type="text"
                                            value={item.rate}
                                            label="Rate"
                                            onChange={handleChange}
                                            fullWidth
                                        />
                                    </TableCell>
                                    <TableCell
                                        className={classes.templateTableCol}
                                        align="right"
                                    >
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
                            );
                        })}
                    </TableBody>
                </Table>
                <Button
                    variant="outlined"
                    onClick={handleItemAdd}
                    className={classes.addButton}
                >
                    +
                </Button>
            </form>
        </div>
    );
};

export default InvoicesTemplate;
