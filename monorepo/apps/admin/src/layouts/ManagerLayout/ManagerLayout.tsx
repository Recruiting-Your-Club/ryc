import { SideBar } from '@components';
import React, { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

import { outletWrapper } from './ManagerLayout.style';

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
