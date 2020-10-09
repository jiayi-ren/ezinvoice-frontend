import React, { useEffect, useState } from 'react';
import styled from '@react-pdf/styled-components';

const TitleContainer = styled.View`
    flex-direction: 'row';
    margin-top: 30px;
`;
const Title = styled.Text`
    font-size: 22px;
    text-align: right;
    text-transform: uppercase;
`;
const HeaderContainer = styled.View`
    flex-direction: column;
`;
const Number = styled.Text`
    font-size: 10px;
    text-align: right;
    margin-top: 5px;
`;
const Date = styled.Text`
    font-size: 10px;
    text-align: right;
`;

const Header = props => {

    const { title, docNumber, date } = props

    const [pdfTitle, setPdfTitle] = useState(title)
    const [pdfDocNumber, setPdfDocNumber] = useState(docNumber)
    const [pdfDate, setPdfDate] = useState(date)

    useEffect(() =>{
        setPdfTitle(title)
        setPdfDocNumber(docNumber)
        setPdfDate(date)
    }, [title, docNumber, date])

    return (
        <>
            <TitleContainer>
                <Title>{pdfTitle}</Title>
            </TitleContainer>
            <HeaderContainer>
                <Number>#{pdfDocNumber}</Number>
                <Date>Date: {pdfDate}</Date>
            </HeaderContainer>
        </>
    )
   
}

export default Header;