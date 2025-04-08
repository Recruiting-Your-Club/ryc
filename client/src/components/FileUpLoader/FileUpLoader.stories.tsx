import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { FileUpLoader } from './FileUpLoader';

type Story = StoryObj<typeof FileUpLoader>;

const meta: Meta<typeof FileUpLoader> = {
    title: 'FileUpLoader',
    component: FileUpLoader,
    parameters: {
        docs: {
            description: {
                component:
                    '파일을 업로드하거나 드래그하여 첨부할 수 있는 FileUpLoader 컴포넌트입니다.',
            },
        },
    },
};

export default meta;

export const Default: Story = {
    render: () => (
        <FileUpLoader>
            <FileUpLoader.Button />
            <FileUpLoader.HelperText
                helperText="최대 5MB의 파일만 업로드 가능합니다."
                sx={{ top: 0 }}
            />
            <FileUpLoader.Box />
        </FileUpLoader>
    ),
};

export const CustomStyledBox: Story = {
    render: () => (
        <FileUpLoader>
            <FileUpLoader.Button />
            <FileUpLoader.Box sx={{ borderColor: 'tomato', backgroundColor: '#fffbe6' }} />
        </FileUpLoader>
    ),
};
export const NoHelperText: Story = {
    render: () => (
        <FileUpLoader>
            <FileUpLoader.Button />
            <FileUpLoader.Box />
        </FileUpLoader>
    ),
};

export const OnlyEmptyBox: Story = {
    render: () => (
        <FileUpLoader>
            <FileUpLoader.Box />
        </FileUpLoader>
    ),
};
