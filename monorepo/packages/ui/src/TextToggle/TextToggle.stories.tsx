import type { Meta, StoryObj } from '@storybook/react';

import { TextToggle } from './TextToggle';

const meta: Meta<typeof TextToggle> = {
    title: 'TextToggle',
    component: TextToggle,
    parameters: {
        docs: {
            description: {
                component: 'Toggle 컴포넌트입니다.',
            },
        },
    },
};

export default meta;
type Story = StoryObj<typeof TextToggle>;

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
