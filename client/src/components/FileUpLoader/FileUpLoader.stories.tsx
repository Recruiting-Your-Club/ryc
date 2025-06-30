import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { FileUpLoader } from './FileUpLoader';
import type { FileUpLoaderInteractionContextType, FileUpLoaderStateContextType } from './types';
import { FileUpLoaderStateContext } from './FileUpLoaderStateContext';
import { FileUpLoaderInteractionContext } from './FileUpLoaderInteractionContext';
import { ToastProvider } from '@components/Toast/ToastProvider';

const mockPdfFile = new File(['%PDF-sample'], 'document.pdf', {
    type: 'application/pdf',
    lastModified: new Date().getTime(),
});

const mockImageFile = new File([], 'image.jpg', {
    type: 'image/jpeg',
    lastModified: new Date().getTime(),
});

const mockStateContext: FileUpLoaderStateContextType = {
    files: [mockPdfFile, mockImageFile],
    setFiles: () => {},
    isActive: false,
    setIsActive: () => {},
    disabled: false,
};

const mockInteractionContext: FileUpLoaderInteractionContextType = {
    fileInputRef: { current: null },
    handleChangeFile: () => {},
    handleClickButton: () => {},
    handleDelete: () => {},
    handleDeleteEntire: () => {},
    handleDragStart: () => {},
    handleDragEnd: () => {},
    handleDragOver: () => {},
    handleDrop: () => {},
};

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
        <ToastProvider>
            <FileUpLoader>
                <FileUpLoader.Button />
                <FileUpLoader.HelperText sx={{ top: 0 }}>
                    pdf, 이미지 파일만 업로드 가능합니다.
                </FileUpLoader.HelperText>
                <FileUpLoader.Box />
            </FileUpLoader>
        </ToastProvider>
    ),
};

export const NoHelperText: Story = {
    render: () => (
        <ToastProvider>
            <FileUpLoader>
                <FileUpLoader.Button />
                <FileUpLoader.Box />
            </FileUpLoader>
        </ToastProvider>
    ),
};

export const OnlyEmptyBox: Story = {
    render: () => (
        <ToastProvider>
            <FileUpLoader>
                <FileUpLoader.Box />
            </FileUpLoader>
        </ToastProvider>
    ),
};

export const WithMockedFiles: Story = {
    render: () => (
        <ToastProvider>
            <FileUpLoaderStateContext.Provider value={mockStateContext}>
                <FileUpLoaderInteractionContext.Provider value={mockInteractionContext}>
                    <FileUpLoader.Button />
                    <FileUpLoader.HelperText sx={{ top: 0 }}>
                        이미 업로드된 파일을 확인해보세요.
                    </FileUpLoader.HelperText>
                    <FileUpLoader.Box />
                </FileUpLoaderInteractionContext.Provider>
            </FileUpLoaderStateContext.Provider>
        </ToastProvider>
    ),
};

export const disabledMode: Story = {
    render: () => (
        <ToastProvider>
            <FileUpLoader disabled={true}>
                <FileUpLoader.Button />
                <FileUpLoader.Box />
            </FileUpLoader>
        </ToastProvider>
    ),
};
