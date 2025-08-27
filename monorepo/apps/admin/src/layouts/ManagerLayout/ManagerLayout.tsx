import { SideBar } from '@components';
import React, { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

import { outletWrapper, s_layout } from './ManagerLayout.style';

function ManagerLayout() {
    const location = useLocation();

    return (
        <div css={s_layout}>
            <SideBar />
            <div css={outletWrapper} key={location.pathname}>
                <Outlet />
            </div>
        </div>
    );
}

export { ManagerLayout };
