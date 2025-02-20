import React from 'react';
import { globalLayoutCss, headerCss } from './Global.styles';
import { Outlet } from 'react-router-dom';

function GlobalLayout() {
    return (
        <>
            <header css={headerCss}>
                <div>홈화면입니다.</div>
                <nav>
                    <a href="/">Home</a>
                    <a href="/about">About</a>
                </nav>
            </header>
            <div css={globalLayoutCss}>
                <Outlet />
            </div>
        </>
    );
}

export { GlobalLayout };
