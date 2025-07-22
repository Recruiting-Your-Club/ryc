import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';

import theme from '@ssoc/styles';

import { PulseSpinner, SpinSpinner } from '.';

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
    render: () => <PulseSpinner color={theme.colors.black} />,
};
