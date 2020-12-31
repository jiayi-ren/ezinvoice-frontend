import styled from '@react-pdf/styled-components';
import React from 'react';

const TableHeaderContainer = styled.View`
    display: flex;
    flex-direction: row;
    text-align: center;
    font-style: bold;
`;
const Description = styled.Text`
    width: 60%;
    padding: 3px 0;
    border-bottom: 1px;
`;
const Qty = styled.Text`
    width: 10%;
    padding: 3px 0;
    border-left: 1px;
    border-bottom: 1px;
`;
const Rate = styled.Text`
    width: 15%;
    padding: 3px 0;
    border-left: 1px;
    border-bottom: 1px;
`;
const Amount = styled.Text`
    width: 15%;
    padding: 3px 0;
    border-left: 1px;
    border-bottom: 1px;
`;

const TableHeader = props => {
    return (
        <TableHeaderContainer>
            <Description>Item Description</Description>
            <Qty>Qty</Qty>
            <Rate>Rate</Rate>
            <Amount>Amount</Amount>
        </TableHeaderContainer>
    );
};

export default TableHeader;
