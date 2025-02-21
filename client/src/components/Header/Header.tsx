import React from 'react';
import { css } from '@emotion/react';
import { homeImage, headerBarContainer, homeNavContainer, homeNavText } from './Header.style';
import useRouter from '@hooks/useRouter';
import { Link } from 'react-router-dom';
import { Button } from '@components/Button';

function Header() {
    const { goTo } = useRouter();

    return (
        <header css={headerBarContainer}>
            <Link to="/about" css={homeNavContainer}>
                <div css={homeImage} />
                <div css={homeNavText}>Recruting Your Club</div>
            </Link>
            <nav>
                <Button size="md" variant="primary">
                    관리자 로그인
                </Button>
            </nav>
        </header>
    );
}
export { Header };
