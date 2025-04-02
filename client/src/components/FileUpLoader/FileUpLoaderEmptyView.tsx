import React from 'react';
import File from '@assets/images/File.svg';
import { s_fileImage, s_fileUpLoaderEmptyView } from './FileUpLoader.style';

function FileUpLoaderEmptyView() {
    return (
        <span css={s_fileUpLoaderEmptyView}>
            <File css={s_fileImage} />
            파일을 불러와주세요.
        </span>
    );
}

export { FileUpLoaderEmptyView };
