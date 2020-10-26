import React, { useState } from 'react';
import {
    Box,
    Checkbox,
    Collapse,
    IconButton,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
} from '@material-ui/core';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';

const TableRowComponent = props => {
    const { row, index, isItemSelected, labelId, handleCheckBoxClick } = props;
    const [expand, setExpand] = useState(false);

    const total = row.items
        .map(item => parseInt(item.qty) * parseFloat(item.rate))
        .reduce((accumulator, currentValue) => accumulator + currentValue, 0);

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
                <TableCell>
                    <IconButton
                        aria-label="expand row"
                        size="small"
                        onClick={() => setExpand(!expand)}
                    >
                        {expand ? (
                            <KeyboardArrowUpIcon />
                        ) : (
                            <KeyboardArrowDownIcon />
                        )}
                    </IconButton>
                </TableCell>
                <TableCell padding="checkbox">
                    <Checkbox
                        checked={isItemSelected}
                        inputProps={{ 'aria-labelledby': labelId }}
                        onClick={event =>
                            handleCheckBoxClick(event, `${row.title}${index}`)
                        }
                    />
                </TableCell>
                <TableCell scope="row">{row && row.title}</TableCell>
                <TableCell>{row && row.client.name}</TableCell>
                <TableCell>
                    {row &&
                        `${row.client.street}, ${row.client.cityState} ${row.client.zip}`}
                </TableCell>
                <TableCell>{row && row.date}</TableCell>
                <TableCell>{row && row.amount}</TableCell>
            </TableRow>
            <TableRow>
                <TableCell
                    style={{ paddingBottom: 0, paddingTop: 0 }}
                    colSpan={6}
                >
                    <Collapse in={expand} timeout="auto" unmountOnExit>
                        <Box margin={1}>
                            <Table size="small" aria-label="purchases">
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Description</TableCell>
                                        <TableCell align="right">
                                            Amount
                                        </TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {row &&
                                        row.items.map((item, idx) => {
                                            return (
                                                <TableRow
                                                    key={`collapse-${row.title}${index}-item-${idx}`}
                                                >
                                                    <TableCell>
                                                        {item.description}
                                                    </TableCell>
                                                    <TableCell align="right">
                                                        {item.amount
                                                            ? Number.parseFloat(
                                                                  item.amount,
                                                              ).toFixed(2)
                                                            : '0.00'}
                                                    </TableCell>
                                                </TableRow>
                                            );
                                        })}
                                    <TableRow>
                                        <TableCell align="right">
                                            Total
                                        </TableCell>
                                        <TableCell align="right">
                                            {isNaN(total)
                                                ? '0.00'
                                                : Number.parseFloat(
                                                      total,
                                                  ).toFixed(2)}
                                        </TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>
                        </Box>
                    </Collapse>
                </TableCell>
            </TableRow>
        </>
    );
};

export default TableRowComponent;
