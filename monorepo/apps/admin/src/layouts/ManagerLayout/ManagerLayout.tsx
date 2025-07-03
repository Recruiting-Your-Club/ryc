import { Footer, Header, SideBar } from '@components';
import React from 'react';
import { Outlet } from 'react-router-dom';

import { contentContainer, layoutContainer } from './ManagerLayout.style';

function ManagerLayout() {
    return (
        <>
            <div css={layoutContainer}>
                <Header />
                <div css={contentContainer}>
                    <SideBar />
                    <Outlet />
                </div>
                <Footer />
            </div>
        </>
    );
}

export { ManagerLayout };
