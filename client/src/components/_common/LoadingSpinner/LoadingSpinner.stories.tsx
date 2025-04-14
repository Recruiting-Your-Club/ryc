import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import theme from '@styles/theme';
import { SpinSpinner, PulseSpinner } from '.';

const meta: Meta<typeof SpinSpinner> = {
    title: '스피너',
    component: SpinSpinner,
    parameters: {
        docs: {
            description: {
                component: '로딩스피너 컴포넌트입니다.',
            },
        },
    },
};

export default meta;

export const Spin: StoryObj<typeof SpinSpinner> = {
    args: {},
};

export const Pulse: StoryObj<typeof PulseSpinner> = {
    render: (args) => <PulseSpinner color={theme.colors.black} />,
    args: {},
};
