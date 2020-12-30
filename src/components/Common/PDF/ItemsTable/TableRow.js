import React from 'react';
import styled from '@react-pdf/styled-components';

const TableRowContainer = styled.View`
    display: flex;
    flex-direction: row;
    text-align: center;
    font-style: bold;
`;
const Description = styled.Text`
    width: 60%;
    padding: 3px 0;
    border-bottom: 1px;
    text-align: left;
    padding-left: 5px;
`;
const Qty = styled.Text`
    width: 10%;
    padding: 3px 0;
    border-left: 1px;
    border-bottom: 1px;
    text-align: right;
    padding-right: 5px;
`;
const Rate = styled.Text`
    width: 15%;
    padding: 3px 0;
    border-left: 1px;
    border-bottom: 1px;
    text-align: right;
    padding-right: 5px;
`;
const Amount = styled.Text`
    width: 15%;
    padding: 3px 0;
    border-left: 1px;
    border-bottom: 1px;
    text-align: right;
    padding-right: 5px;
`;

const TableRow = props => {
    const { items } = props;

    return (
        <>
            {items &&
                items.map((item, index) => (
                    <TableRowContainer key={`item ${index}`}>
                        <Description>{item.description}</Description>
                        <Qty>{item.qty === '' ? ' ' : parseInt(item.qty)}</Qty>
                        <Rate>
                            {item.rate === ''
                                ? ' '
                                : parseFloat(item.rate).toFixed(2)}
                        </Rate>
                        <Amount>
                            {item.qty && item.rate
                                ? parseInt(item.qty) *
                                  parseFloat(item.rate).toFixed(2)
                                : ' '}
                        </Amount>
                    </TableRowContainer>
                ))}
        </>
    );
};

export default TableRow;
