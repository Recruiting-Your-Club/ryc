import type { Meta, StoryObj } from '@storybook/react';
import { Button } from '.';

const meta: Meta<typeof Button> = {
    component: Button,
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
