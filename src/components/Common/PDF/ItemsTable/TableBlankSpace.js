import React from 'react';
import styled from '@react-pdf/styled-components';

const TableBlankSpaceContainer = styled.View`
    display: flex;
    flex-direction: row;
    text-align: center;
    font-style: bold;
`;
const Description = styled.Text`
    width: 60%;
    padding: 3px 0;
    border-bottom: 1px;
    textalign: left;
`;
const Qty = styled.Text`
    width: 10%;
    padding: 3px 0;
    border-left: 1px;
    border-bottom: 1px;
    textalign: right;
`;
const Rate = styled.Text`
    width: 15%;
    padding: 3px 0;
    border-left: 1px;
    border-bottom: 1px;
    textalign: right;
`;
const Amount = styled.Text`
    width: 15%;
    padding: 3px 0;
    border-left: 1px;
    border-bottom: 1px;
    text-align: right;
`;

const TableBlankSpace = props => {
    const { rowsCount } = props;

    return (
        <>
            {Array(rowsCount)
                .fill(0)
                .map((x, i) => {
                    return (
                        <TableBlankSpaceContainer key={`BR${i}`}>
                            <Description> </Description>
                            <Qty> </Qty>
                            <Rate> </Rate>
                            <Amount> </Amount>
                        </TableBlankSpaceContainer>
                    );
                })}
        </>
    );
};

export default TableBlankSpace;
