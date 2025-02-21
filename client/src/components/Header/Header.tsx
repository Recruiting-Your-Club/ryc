import React from 'react';
import { css } from '@emotion/react';
import { homeImage, headerBarContainer, homeNavContainer, homeNavText, navContainer } from './Header.style';
import useRouter from '@hooks/useRouter';
import { Link } from 'react-router-dom';
import { Button } from '@components/Button';
import Ryc from '@assets/images/Ryc.svg';

function Header() {
    const { goTo } = useRouter();

    return (
        <header css={headerBarContainer}>
            <Link to="/" css={homeNavContainer}>
                <Ryc css={homeImage} width="35" height="35" alt="hide" viewBox="0 0 30 30" />
                <div css={homeNavText}>Recruting Your Club</div>
            </Link>

            <nav css={navContainer}>
                <Link to="/login">
                    <Button size="xl" variant="primary" radius="1.88rem">
                        관리자 로그인
                    </Button>
                </Link>
            </nav>
        </header>
    );
}
export { Header };
