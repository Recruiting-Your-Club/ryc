import React from 'react';
import { UserLayoutCss } from './UserLayout.styles';
import { Header } from '@components/Header';
import { Outlet } from 'react-router-dom';
import { Footer } from '@components/Footer';

function UserLayout() {
    return (
        <div css={UserLayoutCss}>
            <Header />
            <main>
                <Outlet />
            </main>
            <Footer />
        </div>
    );
}

export { UserLayout };
