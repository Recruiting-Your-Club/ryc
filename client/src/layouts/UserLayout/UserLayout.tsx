import React from 'react';
import { UserLayoutCss } from './UserLayout.styles';
import { Header } from '@components/Header';
import { Outlet } from 'react-router-dom';
import { Footer } from '@components/Footer';

function UserLayout() {
    return (
        <>
            <Header />
            <div css={UserLayoutCss}>
                <Outlet />
            </div>
            <Footer />
        </>
    );
}

export { UserLayout };
