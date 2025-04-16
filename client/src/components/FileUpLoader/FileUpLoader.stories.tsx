import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { FileUpLoader } from './FileUpLoader';
import type { FileUpLoaderContextValueType } from './type';
import { FileUpLoaderContext } from './FileUpLoaderContext';

const mockPdfFile = new File(['%PDF-sample'], 'document.pdf', {
    type: 'application/pdf',
    lastModified: new Date().getTime(),
});

const mockImageFile = new File([], 'image.jpg', {
    type: 'image/jpeg',
    lastModified: new Date().getTime(),
});

const mockContext: FileUpLoaderContextValueType = {
    files: [mockPdfFile, mockImageFile],
    setFiles: () => {},
    isActive: false,
    setIsActive: () => {},
    fileInputRef: { current: null },
    handleChangeFile: () => {},
    handleClickButton: () => {},
    handleDelete: () => {},
    handleDeleteEntire: () => {},
    handleDragStart: () => {},
    handleDragEnd: () => {},
    handleDragOver: () => {},
    handleDrop: () => {},
    disabled: false,
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
        <FileUpLoader>
            <FileUpLoader.Button />
            <FileUpLoader.HelperText
                helperText="최대 5개의 pdf, 이미지 파일만 업로드 가능합니다."
                sx={{ top: 0 }}
            />
            <FileUpLoader.Box />
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
export const CustomHelperText: Story = {
    render: () => (
        <FileUpLoader>
            <FileUpLoader.Button />
            <FileUpLoader.HelperText
                sx={{ top: 0 }}
                helperText="상황에 맞게 텍스트를 작성할수있어요."
            />
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

export const WithMockedFiles: Story = {
    render: () => (
        <FileUpLoaderContext.Provider value={mockContext}>
            <FileUpLoader.Button />
            <FileUpLoader.HelperText
                sx={{ top: 0 }}
                helperText="이미 업로드된 파일을 확인해보세요."
            />
            <FileUpLoader.Box />
        </FileUpLoaderContext.Provider>
    ),
};

export const disabledMode: Story = {
    render: () => (
        <FileUpLoader disabled={true}>
            <FileUpLoader.Button />
            <FileUpLoader.Box />
        </FileUpLoader>
    ),
};
