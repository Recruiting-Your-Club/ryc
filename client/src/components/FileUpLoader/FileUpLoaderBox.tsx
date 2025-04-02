import React from 'react';
import { s_fileUpLoaderBox } from './FileUpLoader.style';
import { useFileUpLoaderContext } from './FileUpLoaderContext';
import { FileUpLoaderEmptyView } from './FileUpLoaderEmptyView';
import { FileUpLoaderItemView } from './FileUpLoaderItemView';

function FileUpLoaderBox() {
    const { files, hasFile, isActive, handleDragStart, handleDragEnd, handleDragOver, handleDrop } =
        useFileUpLoaderContext();

    return (
        <div
            role="region"
            aria-label="파일을 여기에 드래그하여 업로드하세요"
            css={s_fileUpLoaderBox(hasFile, isActive)}
            onDragEnter={handleDragStart}
            onDragLeave={handleDragEnd}
            onDragOver={handleDragOver}
            onDrop={handleDrop}
        >
            {files?.length === 0 ? <FileUpLoaderEmptyView /> : <FileUpLoaderItemView />}
        </div>
    );
}

export { FileUpLoaderBox };
