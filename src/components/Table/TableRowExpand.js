import React from 'react';
import {
    Box,
    Collapse,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
} from '@material-ui/core';

const TableRowExpand = props => {
    const { expand, row, index, total } = props;

    return (
        <TableRow>
            <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                <Collapse in={expand} timeout="auto" unmountOnExit>
                    <Box margin={1}>
                        <Table size="small" aria-label="purchases">
                            <TableHead>
                                <TableRow>
                                    <TableCell>Description</TableCell>
                                    <TableCell align="right">Amount</TableCell>
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
                                                    {item.rate && item.quantity
                                                        ? (
                                                              parseFloat(
                                                                  item.rate,
                                                              ) *
                                                              parseInt(
                                                                  item.quantity,
                                                              )
                                                          ).toFixed(2)
                                                        : '0.00'}
                                                </TableCell>
                                            </TableRow>
                                        );
                                    })}
                                <TableRow>
                                    <TableCell align="right">Total</TableCell>
                                    <TableCell align="right">
                                        {isNaN(total)
                                            ? '0.00'
                                            : Number.parseFloat(total).toFixed(
                                                  2,
                                              )}
                                    </TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </Box>
                </Collapse>
            </TableCell>
        </TableRow>
    );
};

export default TableRowExpand;
