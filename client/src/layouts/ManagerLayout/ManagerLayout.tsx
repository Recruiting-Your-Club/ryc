import React from 'react';
import { SideBar, ManagerHeader } from '@components';
import { Outlet } from 'react-router-dom';
import { layoutContainer, contentContainer } from './ManagerLayout.style';

function ManagerLayout() {
    return (
        <>
            <div css={layoutContainer}>
                <SideBar />
                <div css={contentContainer}>
                    <ManagerHeader />
                    <Outlet />
                </div>
            </div>
        </>
    );
}

export { ManagerLayout };
