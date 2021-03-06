import React, { useState } from 'react';
import {
    Button,
    Checkbox,
    IconButton,
    TableCell,
    TableRow,
} from '@material-ui/core';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import TableRowExpand from './TableRowExpand';
import { Link } from 'react-router-dom';

const TableExpandCell = props => {
    const { expand, setExpand } = props;

    return (
        <TableCell>
            <IconButton
                aria-label="expand row"
                size="small"
                onClick={() => setExpand(!expand)}
            >
                {expand ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
            </IconButton>
        </TableCell>
    );
};

const TableCheckBoxCell = props => {
    const {
        isItemSelected,
        labelId,
        index,
        handleCheckBoxClick,
        dataType,
        row,
    } = props;

    return (
        <TableCell padding="checkbox">
            <Checkbox
                checked={isItemSelected}
                inputProps={{ 'aria-labelledby': labelId }}
                onClick={event =>
                    handleCheckBoxClick(
                        event,
                        `${dataType}${row.id}-row${index}`,
                    )
                }
            />
        </TableCell>
    );
};

const TableCustomRow = props => {
    const { dataType, row, index, amount } = props;
    if ((dataType === 'invoices' || dataType === 'estimates') && row) {
        return (
            <>
                <TableCell scope="row">{row && row.title}</TableCell>
                <TableCell>{row && row.client.name}</TableCell>
                <TableCell>
                    {row &&
                        `${row.client.street}, ${row.client.cityState} ${row.client.zip}`}
                </TableCell>
                <TableCell>{row && row.date}</TableCell>
                <TableCell
                    style={{
                        textAlign: 'right',
                    }}
                >
                    {amount ? amount.toFixed(2) : Number(0).toFixed(2)}
                </TableCell>
                <TableCell>
                    <Button>
                        <Link
                            style={{ textDecoration: 'none' }}
                            to={
                                row.id
                                    ? `/${dataType}/${dataType.substring(
                                          0,
                                          3,
                                      )}&id=${row.id}`
                                    : `/${dataType}/${dataType.substring(
                                          0,
                                          3,
                                      )}=${index}&`
                            }
                        >
                            Edit
                        </Link>
                    </Button>
                </TableCell>
            </>
        );
    } else if ((dataType === 'clients' || dataType === 'businesses') && row) {
        return (
            <>
                <TableCell>{row && row.name}</TableCell>
                <TableCell>
                    {row && `${row.street}, ${row.cityState} ${row.zip}`}
                </TableCell>
                <TableCell>{row && row.email}</TableCell>
                <TableCell>{row && row.phone}</TableCell>
                <TableCell>
                    <Button>
                        <Link
                            style={{ textDecoration: 'none' }}
                            to={
                                row.id
                                    ? `/${dataType}/${dataType.substring(
                                          0,
                                          3,
                                      )}&id=${row.id}`
                                    : `/${dataType}/${dataType.substring(
                                          0,
                                          3,
                                      )}=${index}&`
                            }
                        >
                            Edit
                        </Link>
                    </Button>
                </TableCell>
            </>
        );
    } else if (dataType === 'items' && row) {
        return (
            <>
                <TableCell>{row && row.description}</TableCell>
                <TableCell align="right">
                    {row && row.rate
                        ? Number.parseFloat(row.rate).toFixed(2)
                        : '0.00'}
                </TableCell>
            </>
        );
    }
};

const TableRowComponent = props => {
    const {
        dataType,
        row,
        index,
        isItemSelected,
        labelId,
        handleCheckBoxClick,
    } = props;
    const [expand, setExpand] = useState(false);

    const total =
        (dataType === 'invoices' || dataType === 'estimates') &&
        row.items
            .map(
                item =>
                    parseInt(item.quantity) * parseFloat(item.rate).toFixed(2),
            )
            .reduce(
                (accumulator, currentValue) => accumulator + currentValue,
                0,
            );

    return (
        <>
            <TableRow
                hover
                role="checkbox"
                aria-checked={isItemSelected}
                tabIndex={-1}
                key={index}
                selected={isItemSelected}
            >
                {dataType === 'invoices' || dataType === 'estimates' ? (
                    <TableExpandCell expand={expand} setExpand={setExpand} />
                ) : (
                    <TableCell></TableCell>
                )}
                <TableCheckBoxCell
                    isItemSelected={isItemSelected}
                    labelId={labelId}
                    index={index}
                    handleCheckBoxClick={handleCheckBoxClick}
                    dataType={dataType}
                    row={row}
                />
                <TableCustomRow
                    dataType={dataType}
                    row={row}
                    index={index}
                    amount={total}
                />
            </TableRow>
            {(dataType === 'invoices' || dataType === 'estimates') && (
                <TableRowExpand
                    row={row}
                    index={index}
                    expand={expand}
                    total={total}
                />
            )}
        </>
    );
};

export default TableRowComponent;
