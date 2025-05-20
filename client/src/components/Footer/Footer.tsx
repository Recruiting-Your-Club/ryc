import React from 'react';
import { Text } from '@components/_common';
import { footerContainer, footerStyle } from './Footer.style';
import { useLocation } from 'react-router-dom';

function Footer() {
    // prop destruction
    // lib hooks
    const location = useLocation();
    //initial values
    const pathSegments = location.pathname.split('/');
    // calculated values
    const isManagerRoute = pathSegments.includes('manager');

    return (
        <footer css={footerContainer(isManagerRoute)}>
            <div css={footerStyle}>
                <a
                    href="https://sangjunn.notion.site/RYC-1e0976a7f2238024bef3e14706f92824?pvs=4"
                    target="_blank"
                    rel="noreferrer"
                >
                    <Text type="subCaptionRegular">개인정보 처리방침</Text>
                </a>
                <Text type="subCaptionRegular">Copyright © RYC. All rights reserved.</Text>
                <Text type="subCaptionLight" color="helper">
                    Email : ryc@email.com
                </Text>
            </div>
        </footer>
    );
}

export { Footer };
