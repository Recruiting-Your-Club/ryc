import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Input } from './Input';

const meta: Meta<typeof Input> = {
    title: 'BaseInput',
    component: Input,
    parameters: {
        docs: {
            description: {
                component: 'BaseInput 컴포넌트입니다.',
            },
        },
    },
};

export default meta;
type Story = StoryObj<typeof Input>;

export const Primary: Story = {
    args: {
        type: 'text',
        variant: 'primary',
        placeholder: '텍스트를 입력해주세요',
        label: '라벨입니다.',
        helperText: 'helperText입니다.',
        startNode: <div>startNode</div>,
        endNode: <div>endNode</div>,
    },
};

export const lined: Story = {
    args: {
        type: 'text',
        variant: 'lined',
        placeholder: '텍스트를 입력해주세요',
        label: '라벨입니다.',
        helperText: 'helperText입니다.',
        startNode: <div>startNode</div>,
        endNode: <div>endNode</div>,
    },
};

export const errorInput: Story = {
    args: {
        type: 'text',
        variant: 'primary',
        placeholder: '텍스트를 입력해주세요',
        label: '비밀번호',
        helperText: '비밀번호가 일치하지 않습니다.',
        error: true,
    },
};
