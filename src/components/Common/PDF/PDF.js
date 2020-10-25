import React, { useEffect, useState } from 'react';
import { Document, PDFViewer } from '@react-pdf/renderer';
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

const PDF = props => {
    const { data } = props;

    const [pdfData, setPdfData] = useState(data);

    useEffect(() => {
        setPdfData(data);
    }, [data]);

    console.log(data);
    return (
        <PDFViewer width="1000" height="600">
            <Document title="pdf">
                <StyledPage size="LETTER">
                    <Header
                        title={pdfData.title}
                        docNumber={pdfData.docNumber}
                        date={pdfData.date}
                    />
                    <ContactInfo
                        business={pdfData.business}
                        client={pdfData.client}
                    />
                    <ItemsTable items={pdfData.items} />
                    <Footer business={pdfData.business} />
                </StyledPage>
            </Document>
        </PDFViewer>
    );
};

export default PDF;
