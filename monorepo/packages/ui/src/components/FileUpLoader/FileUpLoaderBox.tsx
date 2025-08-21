import type { CSSObject } from '@emotion/react';
import React from 'react';

import { s_fileUpLoaderBox } from './FileUpLoader.style';
import { FileUpLoaderEmptyView } from './FileUpLoaderEmptyView';
import { useFileUpLoaderInteractionContext } from './FileUpLoaderInteractionContext';
import { FileUpLoaderItemView } from './FileUpLoaderItemView';
import { useFileUpLoaderStateContext } from './FileUpLoaderStateContext';

function FileUpLoaderBox({ sx, text }: { sx?: CSSObject; text?: string }) {
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
            {files.length === 0 ? <FileUpLoaderEmptyView text={text} /> : <FileUpLoaderItemView />}
        </div>
    );
}

export { FileUpLoaderBox };
