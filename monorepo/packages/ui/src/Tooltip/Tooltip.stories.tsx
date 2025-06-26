import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';

import { Button } from '../Button';
import { Tooltip } from './Tooltip';
import type { TooltipProps } from './types';

const meta: Meta<typeof Tooltip> = {
    title: 'Tooltip',
    component: Tooltip,
    parameters: {
        docs: {
            description: {
                component: '공용 Tooltip 컴포넌트입니다.',
            },
        },
    },
    argTypes: {
        content: { control: 'text', description: '툴팁 텍스트' },
        direction: {
            control: { type: 'radio' },
            options: ['topLeft', 'topRight', 'bottomLeft', 'bottomRight', 'left', 'right'],
            description: '툴팁 방향',
        },
        delay: {
            control: { type: 'number' },
            description: '툴팁이 나타나는 딜레이(ms)',
        },
    },
};

export default meta;

type Story = StoryObj<typeof Tooltip>;

export const Primary: Story = {
    render: (args: TooltipProps) => (
        <Tooltip {...args}>
            <p>안녕하세요.</p>
        </Tooltip>
    ),
    args: {
        content: '툴팁 예시입니다.',
        direction: 'bottomRight',
        disabled: false,
    },
    argTypes: {
        content: { control: 'text', description: '툴팁 텍스트' },
        direction: {
            control: { type: 'radio' },
            options: ['topLeft', 'topRight', 'bottomLeft', 'bottomRight', 'left', 'right'],
            description: '툴팁 방향',
        },
        delay: {
            control: { type: 'number' },
            description: '툴팁이 나타나는 딜레이(ms)',
        },
    },
};

export const CustomStorybook: Story = {
    args: {
        content: '툴팁 예시입니다.',
        direction: 'bottomRight',
        delay: 300,
        disabled: false,
    },
    render: (args: TooltipProps) => (
        <Tooltip {...args}>
            <Button variant="outlined">툴팁 대상</Button>
        </Tooltip>
    ),
};

export const DisabledMode = () => {
    return (
        <Tooltip content="Tooltip 예시입니다." disabled>
            <p>안녕하세요.</p>
        </Tooltip>
    );
};
