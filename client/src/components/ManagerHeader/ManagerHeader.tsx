import React from 'react';
import {
    headerContainer,
    leftContainer,
    logoContainer,
    rightContainer,
    roleContainer,
} from './ManagerHeaderStyle';
import { Text } from '@components';
import MainLogo from '@assets/images/MainLogo.svg';

function ManagerHeader() {
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
export { ManagerHeader };
