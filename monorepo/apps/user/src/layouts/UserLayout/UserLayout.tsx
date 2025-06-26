import { Footer, Header } from '@components';
import React from 'react';
import { Outlet } from 'react-router-dom';

import { contentContainer, UserLayoutContainer } from './UserLayout.styles';

function UserLayout() {
    return (
        <>
            <div css={UserLayoutContainer}>
                <Header />
                <div css={contentContainer}>
                    <Outlet />
                </div>
                <Footer />
            </div>
        </>
    );
}

export { UserLayout };
