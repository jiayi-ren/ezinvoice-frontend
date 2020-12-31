import React from 'react';
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

const item = {
    description: '',
    quantity: '',
    rate: '',
};

const InvoicesTemplate = props => {
    const classes = useStyles();

    const { data, setData, setIsModified } = props;

    const handleChange = event => {
        const value = event.target.value;
        const target = event.target.name;
        const info = target.split('-');
        const nextState = Object.assign(data);

        if (target.includes('business') || target.includes('client')) {
            nextState[`${info[0]}`][`${info[1]}`] = value;
        } else if (target.includes('items')) {
            nextState[`${info[0]}`][parseInt(info[1])][`${info[2]}`] = value;
        } else {
            nextState[`${info[0]}`] = value;
        }

        setData({
            ...nextState,
        });
        setIsModified(true);
    };

    const handleItemDelete = event => {
        event.preventDefault();
        const index = parseInt(event.target.name);
        const nextState = Object.assign(data);

        if (index !== 0) {
            nextState['items'].splice(index, 1);
        } else {
            nextState['items'][0] = JSON.parse(JSON.stringify(item));
        }

        setData({
            ...nextState,
        });
        setIsModified(true);
    };

    const handleItemAdd = event => {
        event.preventDefault();
        const nextState = Object.assign(data);
        const newItem = JSON.parse(JSON.stringify(item));

        nextState['items'].push(newItem);

        setData({
            ...nextState,
        });
        setIsModified(true);
    };

    return (
        <div>
            <form className={classes.form}>
                <div className={classes.templateHeader}>
                    <TextField
                        name="title"
                        type="text"
                        value={data ? data.title : ''}
                        label="Title"
                        onChange={handleChange}
                        inputProps={{ style: { fontSize: 30 } }}
                    />
                    <div className={classes.templateHeaderInfo}>
                        <TextField
                            name="date"
                            type="date"
                            value={data ? data.date : ''}
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
                            value={data ? data.business.name : ''}
                            label="Business Name"
                            onChange={handleChange}
                        />
                        <TextField
                            name="business-email"
                            type="email"
                            value={data ? data.business.email : ''}
                            label="Business Email"
                            onChange={handleChange}
                        />
                        <TextField
                            name="business-street"
                            type="text"
                            value={data ? data.business.street : ''}
                            label="Street"
                            onChange={handleChange}
                        />
                        <TextField
                            name="business-cityState"
                            type="text"
                            value={data ? data.business.cityState : ''}
                            label="City, State"
                            onChange={handleChange}
                        />
                        <TextField
                            name="business-zip"
                            type="text"
                            value={data ? data.business.zip : ''}
                            label="Zip Code"
                            onChange={handleChange}
                        />
                        <TextField
                            name="business-phone"
                            type="tel"
                            value={data ? data.business.phone : ''}
                            label="123-456-7890"
                            onChange={handleChange}
                        />
                    </div>
                    <div className={classes.templateTo}>
                        <TextField
                            name="client-name"
                            type="text"
                            value={data ? data.client.name : ''}
                            label="Client Name"
                            onChange={handleChange}
                        />
                        <TextField
                            name="client-email"
                            type="email"
                            value={data ? data.client.email : ''}
                            label="Client Email"
                            onChange={handleChange}
                        />
                        <TextField
                            name="client-street"
                            type="text"
                            value={data ? data.client.street : ''}
                            label="Street"
                            onChange={handleChange}
                        />
                        <TextField
                            name="client-cityState"
                            type="text"
                            value={data ? data.client.cityState : ''}
                            label="City, State"
                            onChange={handleChange}
                        />
                        <TextField
                            name="client-zip"
                            type="text"
                            value={data ? data.client.zip : ''}
                            label="Zip Code"
                            onChange={handleChange}
                        />
                        <TextField
                            name="client-phone"
                            type="tel"
                            value={data ? data.client.phone : ''}
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
                        {data &&
                            data.items.map((item, id) => {
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
                                                name={`items-${id}-quantity`}
                                                type="number"
                                                value={
                                                    item.quantity
                                                        ? parseInt(
                                                              item.quantity,
                                                          )
                                                        : ''
                                                }
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
                                                type="number"
                                                value={
                                                    item.rate
                                                        ? parseFloat(item.rate)
                                                        : ''
                                                }
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
                                                type="number"
                                                value={
                                                    item.quantity &&
                                                    item.rate &&
                                                    parseInt(item.quantity) *
                                                        parseFloat(
                                                            item.rate,
                                                        ).toFixed(2)
                                                }
                                                label="Amount"
                                                onChange={handleChange}
                                                width="10%"
                                                disabled
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
