import React from 'react';
import { css } from '@emotion/react';
import { homeImage, headerBarContainer, homeNavContainer, navContainer } from './Header.style';
import { Link } from 'react-router-dom';
import { Button } from '@components/Button';
import Ryc from '@assets/images/Ryc.svg';
import { Text } from '@components/Text';

function Header() {
    return (
        <header css={headerBarContainer}>
            <Link to="/" css={homeNavContainer}>
                <Ryc css={homeImage} width="35" height="35" alt="hide" viewBox="0 0 30 30" />
                <Text as="h1" type="h4Bold">
                    Recruiting Your Club
                </Text>
            </Link>

            <nav css={navContainer}>
                <Link to="/login">
                    <Button
                        size="xl"
                        variant="primary"
                        radius="1.5rem"
                        customCss={css`
                            font-size: 1.4rem;
                            padding: 0.5rem 1.2rem;
                        `}
                    >
                        관리자 로그인
                    </Button>
                </Link>
            </nav>
        </header>
    );
}
export { Header };
