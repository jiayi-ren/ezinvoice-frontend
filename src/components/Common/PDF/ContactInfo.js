import React, { useEffect, useState } from 'react';
import styled from '@react-pdf/styled-components';

const ContactContainer = styled.View`
    display: flex;
    flex-direction: row;
    margin: 20px 0;
    justify-content: space-between;
`;
const BusinessContainer = styled.View`
    display: flex;
    flex-direction: column;
    line-height: 1.2pt;
`;
const BusinessName = styled.Text`
    font-size: 20px;
    margin-bottom: 5px;
`;
const ClientContainer = styled.View`
    display: flex;
    flex-direction: column;
    line-height: 1.2pt;
`;
const ClientName = styled.Text`
    margin-top: 5px;
    font-size: 12px;
`;
const Info = styled.Text`
    vertical-align: baseline;
`;

const ContactInfo = props => {
    const { business, client } = props;
    console.log(business);
    console.log(client);

    const [businessInfo, setBusinessInfo] = useState(business);
    const [clientInfo, setClientInfo] = useState(client);

    useEffect(() => {
        setBusinessInfo(business);
        setClientInfo(client);
    }, [business, client]);

    return (
        <ContactContainer>
            <BusinessContainer>
                <BusinessName>{businessInfo.name}</BusinessName>
                <Info>{businessInfo.street}</Info>
                <Info>
                    {businessInfo.cityState} {businessInfo.zipCode}
                </Info>
                <Info>{businessInfo.phone}</Info>
                <Info>{businessInfo.email}</Info>
            </BusinessContainer>
            <ClientContainer>
                <Info>Bill To:</Info>
                <ClientName>{clientInfo.name}</ClientName>
                <Info>{clientInfo.street}</Info>
                <Info>
                    {clientInfo.cityState} {clientInfo.zipCode}
                </Info>
                <Info>{clientInfo.phone}</Info>
                <Info>{clientInfo.email}</Info>
            </ClientContainer>
        </ContactContainer>
    );
};

export default ContactInfo;
