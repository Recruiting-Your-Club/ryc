import React, { Suspense } from 'react';
import { contentContainer, UserLayoutContainer } from './UserLayout.styles';
import { Header } from '@components/Header';
import { Outlet } from 'react-router-dom';
import { Footer } from '@components/Footer';

function UserLayout() {
    return (
        <>
            <div css={UserLayoutContainer}>
                <Header />
                <div css={contentContainer}>
                    <Suspense fallback={<div>Loading...</div>}>
                        <Outlet />
                    </Suspense>
                </div>
                <Footer />
            </div>
        </>
    );
}

export { UserLayout };
