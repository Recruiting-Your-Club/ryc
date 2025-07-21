import { ManagerHeader, SideBar } from '@components';
import React from 'react';
import { Outlet } from 'react-router-dom';
import { contentContainer, layoutContainer } from './ManagerLayout.style';

function ManagerLayout() {
    return (
        <>
            <div css={layoutContainer}>
                <ManagerHeader />
                <div css={contentContainer}>
                    <SideBar />
                    <Outlet />
                </div>
            </div>
        </>
    );
}

export { ManagerLayout };
