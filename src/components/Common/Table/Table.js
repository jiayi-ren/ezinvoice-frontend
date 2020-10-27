import React, { useEffect, useState } from 'react';
import { Table, TableBody, TableContainer, Paper } from '@material-ui/core';
import TableRowComponent from './TableRow';
import TableHeadComponent from './TableHead';

function descendingComparator(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) {
        return -1;
    }
    if (b[orderBy] > a[orderBy]) {
        return 1;
    }
    return 0;
}

function getComparator(order, orderBy) {
    return order === 'desc'
        ? (a, b) => descendingComparator(a, b, orderBy)
        : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
        const order = comparator(a[0], b[0]);
        if (order !== 0) return order;
        return a[1] - b[1];
    });
    return stabilizedThis.map(el => el[0]);
}

const TableComponent = props => {
    const { data, dense } = props;
    const [rows, setRows] = useState([]);
    const [order, setOrder] = useState('asc');
    const [orderBy, setOrderBy] = useState('calories');
    const [selected, setSelected] = useState([]);

    useEffect(() => {
        if (data) {
            setRows(data);
        } else {
            setRows([]);
        }
    }, [data]);

    const handleRequestSort = (event, property) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    const handleSelectAllClick = event => {
        if (event.target.checked) {
            const newSelectedList = rows.map(
                (row, index) => `${row.title}${index}`,
            );
            setSelected(newSelectedList);
            return;
        }
        setSelected([]);
    };

    const handleCheckBoxClick = (event, name) => {
        const selectedIndex = selected.indexOf(name);
        let newSelected = [];

        if (selectedIndex === -1) {
            newSelected = newSelected.concat(selected, name);
        } else if (selectedIndex === 0) {
            newSelected = newSelected.concat(selected.slice(1));
        } else if (selectedIndex === selected.length - 1) {
            newSelected = newSelected.concat(selected.slice(0, -1));
        } else if (selectedIndex > 0) {
            newSelected = newSelected.concat(
                selected.slice(0, selectedIndex),
                selected.slice(selectedIndex + 1),
            );
        }

        setSelected(newSelected);
    };

    const isSelected = name => selected.indexOf(name) !== -1;

    const createSortHandler = property => event => {
        handleRequestSort(event, property);
    };

    return (
        <Paper style={{ maxWidth: '70%' }}>
            <TableContainer>
                <Table size={dense ? 'small' : 'medium'}>
                    <TableHeadComponent
                        selected={selected}
                        rows={rows}
                        handleSelectAllClick={handleSelectAllClick}
                        order={order}
                        orderBy={orderBy}
                        createSortHandler={createSortHandler}
                    />
                    <TableBody>
                        {rows &&
                            stableSort(rows, getComparator(order, orderBy)).map(
                                (row, index) => {
                                    const isItemSelected = isSelected(
                                        `${row.title}${index}`,
                                    );
                                    const labelId = `checkbox-${index}`;

                                    return (
                                        <TableRowComponent
                                            key={`row${index}`}
                                            row={row}
                                            index={index}
                                            isItemSelected={isItemSelected}
                                            labelId={labelId}
                                            handleCheckBoxClick={
                                                handleCheckBoxClick
                                            }
                                        />
                                    );
                                },
                            )}
                    </TableBody>
                </Table>
            </TableContainer>
        </Paper>
    );
};

export default TableComponent;
