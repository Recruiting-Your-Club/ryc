import React from 'react';
import { Link } from 'react-router-dom';

import mainLogo from '@ssoc/assets/images/mainLogo.png';
import { Text } from '@ssoc/ui';

import { headerContainer, leftContainer, logoContainer } from './Header.style';

function Header() {
    return (
        <>
            <header css={headerContainer}>
                <Link to="/" css={leftContainer}>
                    <img src={mainLogo} alt="mainLogo" width="100%" height="55rem" />
                </Link>
            </header>
        </>
    );
}
export { Header };
