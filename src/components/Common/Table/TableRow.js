import React, { useState } from 'react';
import { Checkbox, IconButton, TableCell, TableRow } from '@material-ui/core';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import TableRowExpand from './TableRowExpand';

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
    } = props;

    return (
        <TableCell padding="checkbox">
            <Checkbox
                checked={isItemSelected}
                inputProps={{ 'aria-labelledby': labelId }}
                onClick={event =>
                    handleCheckBoxClick(
                        event,
                        `${dataType}${index}-row${index}`,
                    )
                }
            />
        </TableCell>
    );
};

const TableCustomRow = props => {
    const { dataType, row } = props;

    if ((dataType === 'Invoice' || dataType === 'Estimate') && row) {
        return (
            <>
                <TableCell scope="row">{row && row.title}</TableCell>
                <TableCell>{row && row.client.name}</TableCell>
                <TableCell>
                    {row &&
                        `${row.client.street}, ${row.client.cityState} ${row.client.zip}`}
                </TableCell>
                <TableCell>{row && row.date}</TableCell>
                <TableCell>{row && row.amount}</TableCell>
            </>
        );
    } else if (dataType === 'Client' && row) {
        return (
            <>
                <TableCell>{row && row.name}</TableCell>
                <TableCell>{row && row.email}</TableCell>
                <TableCell>
                    {row && `${row.street}, ${row.cityState} ${row.zip}`}
                </TableCell>
                <TableCell>{row && row.phone}</TableCell>
            </>
        );
    } else if (dataType === 'Item' && row) {
        return (
            <>
                <TableCell>{row && row.description}</TableCell>
                <TableCell align="right">
                    {row && row.amount
                        ? Number.parseFloat(row.amount).toFixed(2)
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
        (dataType === 'Invoice' || dataType === 'Estimate') &&
        row.items
            .map(item => parseInt(item.qty) * parseFloat(item.rate))
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
                <TableExpandCell expand={expand} setExpand={setExpand} />
                <TableCheckBoxCell
                    isItemSelected={isItemSelected}
                    labelId={labelId}
                    index={index}
                    handleCheckBoxClick={handleCheckBoxClick}
                    dataType={dataType}
                />
                <TableCustomRow dataType={dataType} row={row} />
            </TableRow>
            {(dataType === 'Invoice' || dataType === 'Estimate') && (
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
