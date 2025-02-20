import React from 'react';
import { css } from '@emotion/react';
import { homeImageContainer, headerBarContainer, homeNavContainer, homeNavText } from './Header.style';
import { useNavigate } from 'react-router-dom';

function Header() {
    const navigate = useNavigate();

    return (
        <header css={headerBarContainer}>
            <div css={homeNavContainer}>
                <div css={homeImageContainer} />
                <div css={homeNavText}>Recruting Your Club</div>
            </div>
            <nav>
                <a href="/">Home</a>
                <a href="/about">About</a>
            </nav>
        </header>
    );
}
export { Header };
