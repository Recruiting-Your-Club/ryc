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
        width: '4.1rem',
        variant: 'primary',
    },
};

export const text: Story = {
    args: {
        width: '12rem',
        variant: 'text',
        leftText: 'leftText',
        rightText: 'rightText',
    },
};

export const secondText: Story = {
    args: {
        width: '12rem',
        variant: 'secondText',
        leftText: 'leftText',
        rightText: 'rightText',
    },
};
