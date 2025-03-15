import type { Meta } from '@storybook/react';
import type { StoryObj } from '@storybook/react';
import React, { useState } from 'react';
import { RadioGroup } from './RadioGroup';

const meta: Meta<typeof RadioGroup> = {
    title: 'RadioGroup',
    component: RadioGroup,
    parameters: {
        docs: {
            description: {
                component: '공용 라디오 컴포넌트입니다.',
            },
        },
    },
};

export default meta;

type Story = StoryObj<typeof RadioGroup>;

export const Primary: Story = {
    args: {
        options: [''],
        name: 'primary',
    },
};

export const text: Story = {
    args: {
        options: ['옵션1'],
        name: 'text',
    },
};

export const variableText: Story = {
    args: {
        options: ['옵션1', '옵션2', '옵션3'],
        name: 'variableText',
    },
};
