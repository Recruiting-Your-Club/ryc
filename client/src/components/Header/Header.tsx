import React from 'react';
import { css } from '@emotion/react';
import { homeImage, headerBarContainer, homeNavContainer, homeNavText, navContainer } from './Header.style';
import useRouter from '@hooks/useRouter';
import { Link } from 'react-router-dom';
import { Button } from '@components/Button';

function Header() {
    const { goTo } = useRouter();

    return (
        <header css={headerBarContainer}>
            <Link to="/" css={homeNavContainer}>
                <div css={homeImage} />
                <div css={homeNavText}>Recruting Your Club</div>
            </Link>

            <nav css={navContainer}>
                <Link to="/login">
                    <Button size="md" variant="primary" radius="10rem">
                        관리자 로그인
                    </Button>
                </Link>
            </nav>
        </header>
    );
}
export { Header };
