import React from 'react';
import { pdf, Document, PDFViewer } from '@react-pdf/renderer';
import Header from './Header';
import ContactInfo from './ContactInfo';
import ItemsTable from './ItemsTable/ItemsTable';
import Footer from './Footer';
import styled from '@react-pdf/styled-components';

const StyledPage = styled.Page`
    font-family: Helvetica;
    font-size: 10px;
    padding: 20px 60px;
    line-height: 1px;
    flex-direction: column;
`;

const doc = data => (
    <Document
        title={`${data.date}_${data.title}_${data.client.street}${
            data.docNumber ? '_' + data.docNumber : ''
        }`}
        author={`${data.business.name}`}
        subject={`${data.date}_${data.title}_${data.client.street}${
            data.docNumber ? '_' + data.docNumber : ''
        }`}
    >
        <StyledPage size="LETTER">
            <Header
                title={data.title}
                docNumber={data.docNumber}
                date={data.date}
            />
            <ContactInfo business={data.business} client={data.client} />
            <ItemsTable items={data.items} />
            <Footer business={data.business} />
        </StyledPage>
    </Document>
);

export const pdfBlob = data => pdf(doc(data).toBlob());

const PDF = props => {
    const { data } = props;

    return (
        <PDFViewer style={{ width: '80vw', height: '1200px' }}>
            {doc(data)}
        </PDFViewer>
    );
};

export default PDF;
