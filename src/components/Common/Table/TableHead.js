import React from 'react';
import {
    Checkbox,
    TableCell,
    TableHead,
    TableRow,
    TableSortLabel,
} from '@material-ui/core';

const TableHeadComponent = props => {
    const {
        selected,
        rows,
        handleSelectAllClick,
        order,
        orderBy,
        createSortHandler,
        headCells,
    } = props;

    return (
        <TableHead>
            <TableRow>
                <TableCell></TableCell>
                <TableCell padding="checkbox">
                    <Checkbox
                        indeterminate={
                            selected &&
                            selected.length > 0 &&
                            selected.length < rows.length
                        }
                        checked={
                            rows.length > 0 &&
                            selected &&
                            selected.length === rows.length
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
