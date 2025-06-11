import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Toggle } from './Toggle';

const meta: Meta<typeof Toggle> = {
    title: 'Toggle',
    component: Toggle,
    parameters: {
        docs: {
            description: {
                component: 'Toggle 컴포넌트입니다.',
            },
        },
    },
};

export default meta;
type Story = StoryObj<typeof Toggle>;

export const Primary: Story = {
    args: {
        size: 'sm',
    },
};

export const mdSize: Story = {
    args: {
        size: 'md',
    },
};

export const lgSize: Story = {
    args: {
        size: 'lg',
    },
};
