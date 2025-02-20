import React from 'react';
import { globalLayoutCss } from './Global.styles';
import { Header } from '@components/Header';
import { Outlet } from 'react-router-dom';

function GlobalLayout() {
    return (
        <>
            <Header />
            <div css={globalLayoutCss}>
                <Outlet />
            </div>
        </>
    );
}

export { GlobalLayout };
