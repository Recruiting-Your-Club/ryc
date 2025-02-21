import React from 'react';
import { UserLayoutCss } from './UserLayout.styles';
import { Header } from '@components/Header';
import { Outlet } from 'react-router-dom';

function UserLayout() {
    return (
        <>
            <Header />
            <div css={UserLayoutCss}>
                <Outlet />
            </div>
        </>
    );
}

export { UserLayout };
