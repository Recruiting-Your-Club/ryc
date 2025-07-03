import React from 'react';

import MainLogo from '@ssoc/assets/images/MainLogo.svg';
import { Text } from '@ssoc/ui';

import {
    headerContainer,
    leftContainer,
    logoContainer,
    rightContainer,
    roleContainer,
} from './Header.style';

function Header() {
    return (
        <>
            <header css={headerContainer}>
                <div css={leftContainer}>
                    <div css={logoContainer}>
                        <MainLogo width="100%" heigth="100%" />
                    </div>
                    <Text as="h1" type="h4Semibold">
                        비즈니스 관리자
                    </Text>
                </div>

                <div css={rightContainer}>
                    <div css={roleContainer}>회장</div>
                </div>
            </header>
        </>
    );
}
export { Header };
