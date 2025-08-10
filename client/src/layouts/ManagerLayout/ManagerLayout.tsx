import React, { useEffect } from 'react';
import { SideBar } from '@components';
import { Outlet } from 'react-router-dom';
import { outletWrapper } from './ManagerLayout.style';
import { useLocation } from 'react-router-dom';

function ManagerLayout() {
    const location = useLocation();

    return (
        <>
            <SideBar />
            <div css={outletWrapper} key={location.pathname}>
                <Outlet />
            </div>
        </>
    );
}

export { ManagerLayout };
