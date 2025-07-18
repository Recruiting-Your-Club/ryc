import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
// 실제 경로에 맞게 조정
import { useState } from 'react';

import { Calendar } from './Calendar';

const meta: Meta<typeof Calendar> = {
    title: 'Calendar',
    component: Calendar,

    parameters: {
        layout: 'fullscreen',
        docs: {
            description: {
                component: '캘린더 컴포넌트입니다.',
            },
        },
    },
};

export default meta;
type Story = StoryObj<typeof Calendar>;

// 기본 스토리
export const Default: Story = {
    render: (args) => {
        // eslint-disable-next-line react-hooks/rules-of-hooks
        const [selectedDate, setSelectedDate] = useState<string[]>([]);

        return (
            <div style={{ width: '100%', height: '100%', padding: '100px' }}>
                <Calendar {...args} onSelect={setSelectedDate} selectedDate={selectedDate} />
            </div>
        );
    },
    args: {
        mode: 'single',
        size: 'lg',
        border: true,
        shadow: true,
        disabled: false,
    },
    argTypes: {
        mode: {
            radio: {
                options: ['single', 'multiple', 'range', 'custom'],
            },
        },
        size: {
            options: ['sm', 'md', 'lg', 'full'],
            control: {
                type: 'select',
            },
        },
        border: {
            control: {
                type: 'boolean',
            },
        },
        shadow: {
            control: {
                type: 'boolean',
            },
        },
        disabled: {
            control: {
                type: 'boolean',
            },
        },
    },
};
