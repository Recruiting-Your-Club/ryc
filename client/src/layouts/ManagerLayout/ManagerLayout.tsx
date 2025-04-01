import React from 'react';
import { Header } from '@components/Header';
import { SideBar } from '@components';
import { Outlet } from 'react-router-dom';
import { ManagerLayoutCss } from './ManagerLayout.style';

function ManagerLayout() {
    return (
        <>
            <div css={ManagerLayoutCss}>
                <SideBar />
                <Outlet />
            </div>
        </>
    );
}

export { ManagerLayout };
