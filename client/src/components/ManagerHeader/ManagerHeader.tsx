import React from 'react';
import { headerContainer } from './ManagerHeaderStyle';
import { Text } from '@components';
import MainLogo from '@assets/images/MainLogo.svg';

function ManagerHeader() {
    return (
        <>
            <header css={headerContainer}>나 헤더여</header>
        </>
    );
}
export { ManagerHeader };
