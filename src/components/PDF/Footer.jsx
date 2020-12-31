import React, { useEffect, useState } from 'react';
import styled from '@react-pdf/styled-components';

const FooterContainer = styled.View`
    display: flex;
    margin-top: 10px;
`;
const FooterMsg = styled.Text`
    font-size: 10px;
    margin-bottom: 2px;
`;
const FooterThankyou = styled.Text`
    font-size: 12px;
    margin-top: 8px;
`;

const Footer = props => {
    const { business } = props;

    const [businessInfo, setBusinessInfo] = useState(business);

    useEffect(() => {
        setBusinessInfo(business);
    }, [business]);

    return (
        <>
            <FooterContainer>
                <FooterMsg>
                    Please make all checks payable to {businessInfo.name}
                </FooterMsg>
                <FooterMsg>
                    If you have any questions, feel free to contact us.
                </FooterMsg>
                <FooterThankyou>Thank you for your business!</FooterThankyou>
            </FooterContainer>
        </>
    );
};

export default Footer;
