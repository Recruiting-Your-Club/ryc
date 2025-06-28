import type { Meta, StoryObj } from '@storybook/react';

import { Button } from '.';

const meta: Meta<typeof Button> = {
    title: '기본버튼',
    component: Button,
    parameters: {
        docs: {
            description: {
                component: '버튼 컴포넌트입니다.',
            },
        },
    },
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Primary: Story = {
    args: {
        size: 'md',
        onClick: () => {},
        children: '버튼',
        variant: 'primary',
        type: 'button',
    },
};
export const Outlined: Story = {
    args: {
        size: 'md',
        onClick: () => {},
        children: '버튼',
        variant: 'outlined',
        type: 'button',
    },
};
export const Disabled: Story = {
    args: {
        size: 'md',
        onClick: () => {},
        disabled: true,
        children: '버튼',
        variant: 'primary',
        type: 'button',
    },
};

export const Xs: Story = {
    args: {
        size: 'xs',
        onClick: () => {},
        children: '버튼',
        variant: 'primary',
        type: 'button',
    },
};

export const S: Story = {
    args: {
        size: 's',
        onClick: () => {},
        children: '버튼',
        variant: 'primary',
        type: 'button',
    },
};

export const Md: Story = {
    args: {
        size: 'md',
        onClick: () => {},
        children: '버튼',
        variant: 'primary',
        type: 'button',
    },
};

export const Lg: Story = {
    args: {
        size: 'lg',
        onClick: () => {},
        children: '버튼',
        variant: 'primary',
        type: 'button',
    },
};

export const Xl: Story = {
    args: {
        size: 'xl',
        onClick: () => {},
        children: '버튼',
        variant: 'primary',
        type: 'button',
    },
};

export const Full: Story = {
    args: {
        size: 'full',
        onClick: () => {},
        children: '버튼',
        variant: 'primary',
        type: 'button',
    },
};
