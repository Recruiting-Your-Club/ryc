import React from 'react';
import { s_fileUpLoaderBox } from './FileUpLoader.style';
import { useFileUpLoaderStateContext } from './FileUpLoaderStateContext';
import { FileUpLoaderEmptyView } from './FileUpLoaderEmptyView';
import { FileUpLoaderItemView } from './FileUpLoaderItemView';
import type { FileUpLoaderBoxProps } from './types';
import { useFileUpLoaderInteractionContext } from './FileUpLoaderInteractionContext';

function FileUpLoaderBox({ sx }: FileUpLoaderBoxProps) {
    const { files, isActive, disabled } = useFileUpLoaderStateContext();

    const { handleDragStart, handleDragEnd, handleDragOver, handleDrop } =
        useFileUpLoaderInteractionContext();

    return (
        <div
            role="region"
            aria-label="파일을 여기에 드래그하여 업로드하세요"
            css={[s_fileUpLoaderBox(files, isActive, disabled), sx]}
            onDragEnter={handleDragStart}
            onDragLeave={handleDragEnd}
            onDragOver={handleDragOver}
            onDrop={handleDrop}
        >
            {files.length === 0 ? <FileUpLoaderEmptyView /> : <FileUpLoaderItemView />}
        </div>
    );
}

export { FileUpLoaderBox };
