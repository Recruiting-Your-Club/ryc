import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { FileUpLoader } from './FileUpLoader';

import { ToastProvider } from '@components/Toast/ToastProvider';

const mockPdfFile = new File(['%PDF-sample'], 'document.pdf', {
    type: 'application/pdf',
    lastModified: new Date().getTime(),
});

const mockImageFile = new File([], 'image.jpg', {
    type: 'image/jpeg',
    lastModified: new Date().getTime(),
});

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

export const Default = () => {
    const [files, setFiles] = useState<File[]>([]);
    return (
        <ToastProvider>
            <FileUpLoader files={files} onFilesChange={setFiles}>
                <FileUpLoader.Button />
                <FileUpLoader.HelperText>
                    pdf, 이미지 파일만 업로드 가능합니다.
                </FileUpLoader.HelperText>
                <FileUpLoader.Box />
            </FileUpLoader>
        </ToastProvider>
    );
};

export const NoHelperText = () => {
    const [files, setFiles] = useState<File[]>([]);
    return (
        <ToastProvider>
            <FileUpLoader files={files} onFilesChange={setFiles}>
                <FileUpLoader.Button />
                <FileUpLoader.Box />
            </FileUpLoader>
        </ToastProvider>
    );
};

export const OnlyEmptyBox = () => {
    const [files, setFiles] = useState<File[]>([]);
    return (
        <ToastProvider>
            <FileUpLoader files={files} onFilesChange={setFiles}>
                <FileUpLoader.Box />
            </FileUpLoader>
        </ToastProvider>
    );
};

export const WithMockedFiles = () => {
    return (
        <ToastProvider>
            <FileUpLoader files={[mockPdfFile, mockImageFile]} onFilesChange={() => {}}>
                <FileUpLoader.Button />
                <FileUpLoader.HelperText>
                    이미 업로드된 파일을 확인해보세요.
                </FileUpLoader.HelperText>
                <FileUpLoader.Box />
            </FileUpLoader>
        </ToastProvider>
    );
};

export const DisabledMode = () => {
    return (
        <ToastProvider>
            <FileUpLoader disabled>
                <FileUpLoader.Button />
                <FileUpLoader.HelperText>disabled 모드입니다.</FileUpLoader.HelperText>
                <FileUpLoader.Box />
            </FileUpLoader>
        </ToastProvider>
    );
};
