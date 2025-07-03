import { UserLayoutContainer } from '@layouts/UserLayout/UserLayout.styles';
import type { Meta } from '@storybook/react';
import React from 'react';

import { Footer } from './Footer';

const meta: Meta<typeof Footer> = {
    title: 'Footer',
    component: Footer,
    parameters: {
        docs: {
            description: {
                component: 'Footer 컴포넌트입니다.',
            },
        },
    },
};

export default meta;

export const Primary = () => {
    return (
        <>
            <div css={UserLayoutContainer}>
                <div style={{ marginBottom: '1rem' }}>컨텐츠1</div>
                <div style={{ marginBottom: '1rem' }}>컨텐츠2</div>
                <div style={{ marginBottom: '1rem' }}>컨텐츠3</div>
            </div>
            <Footer />
        </>
    );
};
