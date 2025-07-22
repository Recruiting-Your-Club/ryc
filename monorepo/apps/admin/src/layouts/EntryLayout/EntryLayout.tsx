import { Header } from '@components';
import React from 'react';
import { Outlet } from 'react-router-dom';

import { contentContainer, contentWrapper, layoutContainer } from './EntryLayout.style';

function EntryLayout() {
    return (
        <div css={layoutContainer}>
            <Header />
            <main css={contentContainer}>
                <div css={contentWrapper}>
                    <Outlet />
                </div>
            </main>
        </div>
    );
}

export { EntryLayout };
