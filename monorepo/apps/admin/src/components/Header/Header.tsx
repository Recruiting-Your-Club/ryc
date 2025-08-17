import React from 'react';

import MainLogo from '@ssoc/assets/images/MainLogo.svg';
import { Text } from '@ssoc/ui';

import { headerContainer, leftContainer, logoContainer } from './Header.style';

function Header() {
    return (
        <>
            <header css={headerContainer}>
                <div css={leftContainer}>
                    {/* <div css={logoContainer}>
                        <MainLogo width="100%" heigth="100%" />
                    </div> */}
                    <Text as="h1" type="h2Bold">
                        SSOC
                    </Text>
                </div>
            </header>
        </>
    );
}
export { Header };
