import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { SideBar } from './SideBar'; // 실제 경로에 맞게 조정

const meta: Meta<typeof SideBar> = {
    title: 'SideBar',
    component: SideBar,

    parameters: {
        layout: 'fullscreen',
        docs: {
            description: {
                component: 'SideBar 컴포넌트입니다.',
            },
        },
    },
};

export default meta;
type Story = StoryObj<typeof SideBar>;

// 기본 스토리
export const Default: Story = {};
