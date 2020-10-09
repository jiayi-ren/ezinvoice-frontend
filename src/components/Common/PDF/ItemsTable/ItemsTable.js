import styled from '@react-pdf/styled-components';
import React, { useState, useEffect } from 'react';
import TableBlankSpace from './TableBlankSpace';
import TableFooter from './TableFooter';
import TableHeader from './TableHeader';
import TableRow from './TableRow';

const TableContainer = styled.View`
    flex-direction: row;
    flex-wrap: wrap;
    border: 1px solid black;
`;

const ItemsTable = props => {

    const tableRowsCount = 25;
    const { items } = props

    const [itemList, setItemList] = useState(items)

    useEffect(() => {
        setItemList(items)
    }, [items])

    return (
        <TableContainer>
            <TableHeader />
            <TableRow items={itemList}/>
            <TableBlankSpace rowsCount={ tableRowsCount - itemList.length} />
            <TableFooter items={itemList} />
        </TableContainer>
    )
}

export default ItemsTable;