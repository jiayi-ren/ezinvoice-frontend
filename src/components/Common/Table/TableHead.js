import React from 'react';
import {
    Checkbox,
    TableCell,
    TableHead,
    TableRow,
    TableSortLabel,
} from '@material-ui/core';

const headCells = [
    { id: 'title', numeric: false, disablePadding: true, label: 'Name' },
    { id: 'client', numeric: false, disablePadding: false, label: 'Client' },
    { id: 'address', numeric: false, disablePadding: false, label: 'Address' },
    { id: 'date', numeric: false, disablePadding: false, label: 'Date' },
    { id: 'amount', numeric: true, disablePadding: false, label: 'Amount' },
];

const TableHeadComponent = props => {
    const {
        selected,
        rows,
        handleSelectAllClick,
        order,
        orderBy,
        createSortHandler,
    } = props;

    return (
        <TableHead>
            <TableRow>
                <TableCell></TableCell>
                <TableCell padding="checkbox">
                    <Checkbox
                        indeterminate={
                            selected.length > 0 && selected.length < rows.length
                        }
                        checked={
                            rows.length > 0 && selected.length === rows.length
                        }
                        onChange={handleSelectAllClick}
                        inputProps={{ 'aria-label': 'select all' }}
                    />
                </TableCell>
                {headCells.map(headCell => {
                    return (
                        <TableCell
                            key={headCell.id}
                            align={headCell.numeric ? 'right' : 'left'}
                            padding={
                                headCell.disablePadding ? 'none' : 'default'
                            }
                            sortDirection={
                                orderBy === headCell.id ? order : false
                            }
                        >
                            <TableSortLabel
                                active={orderBy === headCell.id}
                                direction={
                                    orderBy === headCell.id ? order : 'asc'
                                }
                                onClick={createSortHandler(headCell.id)}
                            >
                                {headCell.label}
                            </TableSortLabel>
                        </TableCell>
                    );
                })}
            </TableRow>
        </TableHead>
    );
};

export default TableHeadComponent;
