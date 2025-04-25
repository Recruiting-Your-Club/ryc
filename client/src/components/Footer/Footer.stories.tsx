import React from 'react';
import type { Meta } from '@storybook/react';
import { css } from '@emotion/react';
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

const storybookStyle = css`
    a {
        text-decoration: none;
    }
`;

export const Primary = () => {
    return (
        <div style={{ minHeight: '100dvh', display: 'flex', flexDirection: 'column' }}>
            <div style={{ flex: 1 }}>Content Area</div>
            <div css={storybookStyle}>
                <Footer />
            </div>
        </div>
    );
};

export const WithLongContent = () => {
    return (
        <div style={{ minHeight: '100dvh', display: 'flex', flexDirection: 'column' }}>
            <div style={{ flex: 1, padding: '2rem' }}>
                {Array.from({ length: 20 }).map((_, index) => (
                    <p key={index}>긴 컨텐츠 {index + 1}</p>
                ))}
            </div>
            <div css={storybookStyle}>
                <Footer />
            </div>
        </div>
    );
};
