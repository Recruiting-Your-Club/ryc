import React from 'react';
import { contentContainer, UserLayoutContainer } from './UserLayout.styles';
import { Header } from '@components/Header';
import { Outlet } from 'react-router-dom';
function UserLayout() {
    return (
        <>
            <div css={UserLayoutContainer}>
                <Header />
                <div css={contentContainer}>
                    <Outlet />
                </div>
            </div>
        </>
    );
}

export { UserLayout };
