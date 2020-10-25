import React from 'react';
import styled from '@react-pdf/styled-components';

const TableFooterContainer = styled.View`
    display: flex;
    flex-direction: row;
    text-align: center;
    font-style: bold;
    align-items: center;
`;
const Description = styled.Text`
    padding: 3px 0;
    textalign: right;
    padding-right: 5px;
    width: 85%;
    verticalalign: baseline;
`;
const Total = styled.Text`
    width: 15%;
    padding: 3px 0;
    border-left: 1px;
    text-align: right;
    padding-right: 5px;
`;

const TableFooter = props => {
    const { items } = props;

    const total = items
        .map(item => parseInt(item.qty) * parseFloat(item.rate))
        .reduce((accumulator, currentValue) => accumulator + currentValue, 0);

    return (
        <TableFooterContainer>
            <Description>TOTAL</Description>
            <Total>{Number.parseFloat(total).toFixed(2)}</Total>
        </TableFooterContainer>
    );
};

export default TableFooter;
