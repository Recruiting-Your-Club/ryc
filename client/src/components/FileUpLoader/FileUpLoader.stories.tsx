import type { Meta, StoryObj } from '@storybook/react';
import React, { useState } from 'react';
import { FileUpLoader } from './FileUpLoader';
import { FileUpLoaderContext } from './FileUpLoaderContext';
import type { FileUpLoaderContextValueType } from './type';

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

const createMockFile = (name: string, size: number, type: string): File => {
    const blob = new Blob(['a'.repeat(size)], { type });
    return new File([blob], name, {
        type,
        lastModified: new Date().getTime(),
    });
};

const mockFiles: File[] = [
    createMockFile('example.pdf', 300000, 'application/pdf'),
    createMockFile('image.png', 120000, 'image/png'),
];

const FileUpLoaderMockProvider = ({
    children,
    valueOverrides = {},
}: {
    children: React.ReactNode;
    valueOverrides?: Partial<FileUpLoaderContextValueType>;
}) => {
    const defaultValue: FileUpLoaderContextValueType = {
        files: mockFiles,
        setFiles: () => {},
        hasFile: true,
        setHasFile: () => {},
        isActive: false,
        setIsActive: () => {},
        handleDelete: () => {},
        handleDeleteEntire: () => {},
        handleDragStart: () => {},
        handleDragEnd: () => {},
        handleDragOver: () => {},
        handleDrop: () => {},
        fileInputRef: { current: null },
        handleClickButton: () => {},
        handleChangeFile: () => {},
        ...valueOverrides,
    };

    return (
        <FileUpLoaderContext.Provider value={defaultValue}>
            <div style={{ width: '60rem' }}>{children}</div>
        </FileUpLoaderContext.Provider>
    );
};

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

export const WithInitialFiles: Story = {
    render: () => (
        <FileUpLoaderMockProvider>
            <FileUpLoader.Box />
        </FileUpLoaderMockProvider>
    ),
};

export const DragActiveState: Story = {
    render: () => (
        <FileUpLoaderMockProvider valueOverrides={{ isActive: true }}>
            <FileUpLoader.Box />
        </FileUpLoaderMockProvider>
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

export const OnlyEmptyBox: Story = {
    render: () => (
        <FileUpLoaderMockProvider valueOverrides={{ files: [], hasFile: false }}>
            <FileUpLoader.Box />
        </FileUpLoaderMockProvider>
    ),
};
