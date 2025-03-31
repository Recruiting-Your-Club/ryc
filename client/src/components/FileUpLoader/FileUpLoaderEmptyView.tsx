import React from 'react';
import File from '@assets/images/File.svg';
import { s_fileImage, s_fileUpLoaderEmptyView } from './FileUpLoader.style';
import { useFileUpLoaderContext } from './FileUpLoaderContext';
import type { KeyboardEvent } from 'react';

function FileUpLoaderEmptyView() {
    const { handleClickInput } = useFileUpLoaderContext();

    const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
        if (event.key === 'Enter' || event.key === ' ') {
            handleClickInput();
        }
    };
    return (
        <span
            role="button"
            css={s_fileUpLoaderEmptyView}
            onClick={handleClickInput}
            tabIndex={0}
            onKeyDown={handleKeyDown}
        >
            <File css={s_fileImage} />
            파일을 불러와주세요.
        </span>
    );
}

export { FileUpLoaderEmptyView };
