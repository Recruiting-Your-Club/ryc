import React from 'react';
import { SideBar, ManagerHeader } from '@components';
import { Outlet } from 'react-router-dom';
import { layoutContainer, contentContainer } from './ManagerLayout.style';

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
