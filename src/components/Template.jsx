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
import * as Yup from 'yup';

const useStyles = makeStyles({
    form: {
        border: '2px black solid',
        margin: '50px auto',
    },
    templateHeader: {
        display: 'flex',
        justifyContent: 'space-between',
        height: '80px',
        margin: '10% 10% 2%',
    },
    templateHeaderInfo: {
        display: 'flex',
        flexDirection: 'column',
    },
    templateInfo: {
        display: 'flex',
        justifyContent: 'space-between',
        margin: '4% auto 0',
    },
    templateContact: {
        display: 'flex',
        flexDirection: 'column',
        width: '35%',
        margin: '0 10%',
    },
    templateTable: {
        margin: '2% 10% 0',
        maxWidth: '80%',
    },
    templateTableHeader: {
        backgroundColor: 'lightgrey',
    },
    templateTableBody: {
        border: '1px black solid',
    },
    templateTableRow: {
        width: '70%',
    },
    templateTableCol: {
        padding: '10px 10px 0',
    },
    templateTableDel: {
        padding: '0',
    },
    description: {
        width: '60%',
    },
    number: {
        width: '12%',
    },
    deleteButton: {
        padding: 0,
        minWidth: '30px',
        maxWidth: '30px',
        maxHeight: '30px',
        fontSize: '30px',
        fontWeight: '300',
    },
    addButton: {
        padding: 0,
        minWidth: '30px',
        maxWidth: '30px',
        maxHeight: '30px',
        margin: '10px auto 0',
        left: '10%',
        fontSize: '35px',
        fontWeight: '300',
    },
    error: {
        color: 'red',
        margin: 0,
        height: '12px',
        fontSize: '12px',
    },
    totalContainer: {
        position: 'relative',
        left: '70%',
        maxWidth: '20%',
        margin: '0 0 10%',
        fontSize: '30px',
    },
    total: {
        display: 'inline',
        direction: 'RTL',
    },
});

const item = {
    description: '',
    quantity: '',
    rate: '',
};

const phoneRegex = RegExp(/^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/);

const formSchema = Yup.object().shape({
    title: Yup.string()
        .max(30, 'Title is limited to 30 characters max.')
        .notRequired(),
    date: Yup.string().typeError("That doesn't look like a date").notRequired(),
    business: Yup.object().shape({
        name: Yup.string()
            .max(50, 'Business name is limited to 50 characters max.')
            .notRequired(),
        email: Yup.string()
            .email("That doesn't look like an email address")
            .notRequired(),
        street: Yup.string()
            .max(200, 'Street address is limited to 200 characters max.')
            .notRequired(),
        cityState: Yup.string()
            .max(100, 'City and State are limited to 100 characters max.')
            .notRequired(),
        zip: Yup.string().matches(/^[0-9]{5}$/, {
            message: "That doesn't look like a zip code",
            excludeEmptyString: true,
        }),
        phone: Yup.string().matches(phoneRegex, {
            message: "That doesn't look like an invalid phone",
            excludeEmptyString: true,
        }),
    }),
    client: Yup.object().shape({
        name: Yup.string()
            .max(50, 'Business name is limited to 50 characters max.')
            .notRequired(),
        email: Yup.string()
            .email("That doesn't look like an email address")
            .notRequired(),
        street: Yup.string()
            .max(200, 'Street address is limited to 200 characters max.')
            .notRequired(),
        cityState: Yup.string()
            .max(100, 'City and State are limited to 100 characters max.')
            .notRequired(),
        zip: Yup.string().matches(/^[0-9]{5}$/, {
            message: "That doesn't look like a zip code",
            excludeEmptyString: true,
        }),
        phone: Yup.string().matches(phoneRegex, {
            message: "That doesn't look like an invalid phone",
            excludeEmptyString: true,
        }),
    }),
});

const Template = props => {
    const classes = useStyles();
    const { data, setData, setIsModified, errors, setErrors } = props;

    const total =
        data &&
        data.items
            .map(item =>
                item.quantity && item.rate
                    ? parseInt(item.quantity) * parseFloat(item.rate).toFixed(2)
                    : 0,
            )
            .reduce(
                (accumulator, currentValue) => accumulator + currentValue,
                0,
            );

    const handleBlur = event => {
        const { name, value } = event.target;
        Yup.reach(formSchema, name)
            .validate(value)
            .then(valid => {
                const info = name.split('.');
                const nextState = Object.assign(errors);
                if (name.includes('business') || name.includes('client')) {
                    nextState[`${info[0]}`][`${info[1]}`] = '';
                } else {
                    nextState[`${info[0]}`] = '';
                }

                setErrors({
                    ...nextState,
                });
            })
            .catch(err => {
                const info = name.split('.');
                const nextState = Object.assign(errors);
                if (name.includes('business') || name.includes('client')) {
                    nextState[`${info[0]}`][`${info[1]}`] = err.errors[0];
                } else {
                    nextState[`${info[0]}`] = err.errors[0];
                }

                setErrors({
                    ...nextState,
                });
            });
    };

    const handleChange = event => {
        const { name, value } = event.target;
        const info = name.split('.');
        const nextState = Object.assign(data);

        if (name.includes('business') || name.includes('client')) {
            nextState[`${info[0]}`][`${info[1]}`] = value;
        } else if (name.includes('items')) {
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
                    <div>
                        <TextField
                            name="title"
                            type="text"
                            value={data ? data.title : ''}
                            label="Title"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            error={errors.title !== ''}
                            inputProps={{ style: { fontSize: 30 } }}
                        />
                        {errors.title && (
                            <p className={classes.error}>{errors.title}</p>
                        )}
                    </div>
                    <div className={classes.templateHeaderInfo}>
                        <TextField
                            name="date"
                            type="date"
                            value={data ? data.date : ''}
                            label="Date"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            error={errors.date !== ''}
                        />
                        {errors.date && (
                            <p className={classes.error}>{errors.date}</p>
                        )}
                    </div>
                </div>
                <div className={classes.templateInfo}>
                    <div className={classes.templateContact}>
                        <TextField
                            name="business.name"
                            type="text"
                            value={data ? data.business.name : ''}
                            placeholder="Business Name"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            error={errors.business.name !== ''}
                        />
                        {errors.business.name ? (
                            <p className={classes.error}>
                                {errors.business.name}
                            </p>
                        ) : (
                            <p className={classes.error}></p>
                        )}
                        <TextField
                            name="business.email"
                            type="email"
                            value={data ? data.business.email : ''}
                            placeholder="Business Email"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            error={errors.business.email !== ''}
                        />
                        {errors.business.email ? (
                            <p className={classes.error}>
                                {errors.business.email}
                            </p>
                        ) : (
                            <p className={classes.error}></p>
                        )}
                        <TextField
                            name="business.street"
                            type="text"
                            value={data ? data.business.street : ''}
                            placeholder="Street"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            error={errors.business.street !== ''}
                        />
                        {errors.business.street ? (
                            <p className={classes.error}>
                                {errors.business.street}
                            </p>
                        ) : (
                            <p className={classes.error}></p>
                        )}
                        <TextField
                            name="business.cityState"
                            type="text"
                            value={data ? data.business.cityState : ''}
                            placeholder="City, State"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            error={errors.business.cityState !== ''}
                        />
                        {errors.business.cityState ? (
                            <p className={classes.error}>
                                {errors.business.cityState}
                            </p>
                        ) : (
                            <p className={classes.error}></p>
                        )}
                        <TextField
                            name="business.zip"
                            type="text"
                            value={data ? data.business.zip : ''}
                            placeholder="Zip Code"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            error={errors.business.zip !== ''}
                        />
                        {errors.business.zip ? (
                            <p className={classes.error}>
                                {errors.business.zip}
                            </p>
                        ) : (
                            <p className={classes.error}></p>
                        )}
                        <TextField
                            name="business.phone"
                            type="tel"
                            value={data ? data.business.phone : ''}
                            placeholder="Phone (e.g.123-456-7890)"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            error={errors.business.phone !== ''}
                        />
                        {errors.business.phone ? (
                            <p className={classes.error}>
                                {errors.business.phone}
                            </p>
                        ) : (
                            <p className={classes.error}></p>
                        )}
                    </div>
                    <div className={classes.templateContact}>
                        <TextField
                            name="client.name"
                            type="text"
                            value={data ? data.client.name : ''}
                            placeholder="Client Name"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            error={errors.client.name !== ''}
                        />
                        {errors.client.name ? (
                            <p className={classes.error}>
                                {errors.client.name}
                            </p>
                        ) : (
                            <p className={classes.error}></p>
                        )}
                        <TextField
                            name="client.email"
                            type="email"
                            value={data ? data.client.email : ''}
                            placeholder="Client Email"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            error={errors.client.email !== ''}
                        />
                        {errors.client.email ? (
                            <p className={classes.error}>
                                {errors.client.email}
                            </p>
                        ) : (
                            <p className={classes.error}></p>
                        )}
                        <TextField
                            name="client.street"
                            type="text"
                            value={data ? data.client.street : ''}
                            placeholder="Street"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            error={errors.client.street !== ''}
                        />
                        {errors.client.street ? (
                            <p className={classes.error}>
                                {errors.client.street}
                            </p>
                        ) : (
                            <p className={classes.error}></p>
                        )}
                        <TextField
                            name="client.cityState"
                            type="text"
                            value={data ? data.client.cityState : ''}
                            placeholder="City, State"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            error={errors.client.cityState !== ''}
                        />
                        {errors.client.cityState ? (
                            <p className={classes.error}>
                                {errors.client.cityState}
                            </p>
                        ) : (
                            <p className={classes.error}></p>
                        )}
                        <TextField
                            name="client.zip"
                            type="text"
                            value={data ? data.client.zip : ''}
                            placeholder="Zip Code"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            error={errors.client.zip !== ''}
                        />
                        {errors.client.zip ? (
                            <p className={classes.error}>{errors.client.zip}</p>
                        ) : (
                            <p className={classes.error}></p>
                        )}
                        <TextField
                            name="client.phone"
                            type="tel"
                            value={data ? data.client.phone : ''}
                            placeholder="Phone (e.g.123-456-7890)"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            error={errors.client.phone !== ''}
                        />
                        {errors.client.phone ? (
                            <p className={classes.error}>
                                {errors.client.phone}
                            </p>
                        ) : (
                            <p className={classes.error}></p>
                        )}
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
                                            className={`${classes.templateTableCol} ${classes.templateTableDel}`}
                                        >
                                            <Button
                                                variant="outlined"
                                                className={classes.deleteButton}
                                                name={id}
                                                onClick={handleItemDelete}
                                            >
                                                —
                                            </Button>
                                        </TableCell>
                                        <TableCell
                                            className={`${classes.templateTableCol} ${classes.description}`}
                                        >
                                            <TextField
                                                name={`items.${id}.description`}
                                                type="text"
                                                value={item.description}
                                                onChange={handleChange}
                                                fullWidth
                                            />
                                        </TableCell>
                                        <TableCell
                                            className={`${classes.templateTableCol} ${classes.number}`}
                                        >
                                            <TextField
                                                name={`items.${id}.quantity`}
                                                type="number"
                                                value={
                                                    item.quantity
                                                        ? parseInt(
                                                              item.quantity,
                                                          )
                                                        : ''
                                                }
                                                onChange={handleChange}
                                                fullWidth
                                            />
                                        </TableCell>
                                        <TableCell
                                            className={`${classes.templateTableCol} ${classes.number}`}
                                        >
                                            <TextField
                                                name={`items.${id}.rate`}
                                                type="number"
                                                value={
                                                    item.rate
                                                        ? parseFloat(item.rate)
                                                        : ''
                                                }
                                                onChange={handleChange}
                                                fullWidth
                                            />
                                        </TableCell>
                                        <TableCell
                                            className={`${classes.templateTableCol} ${classes.number}`}
                                        >
                                            <TextField
                                                name={`items.${id}.amount`}
                                                type="number"
                                                value={
                                                    item.quantity &&
                                                    item.rate &&
                                                    parseInt(item.quantity) *
                                                        parseFloat(
                                                            item.rate,
                                                        ).toFixed(2)
                                                }
                                                onChange={handleChange}
                                                placeholder={'0.00'}
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
                <div className={classes.totalContainer}>
                    Total: &nbsp; $
                    <div className={classes.total}>
                        {total ? total.toFixed(2) : `0.00`}
                    </div>
                </div>
            </form>
        </div>
    );
};

export default Template;
