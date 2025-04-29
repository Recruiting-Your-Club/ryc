import React from 'react';
import File from '@assets/images/File.svg';
import { s_fileUpLoaderIcon, s_fileUpLoaderEmptyView } from './FileUpLoader.style';
import { Text } from '@components/_common';

function FileUpLoaderEmptyView() {
    return (
        <span css={s_fileUpLoaderEmptyView}>
            <File css={s_fileUpLoaderIcon} />
            <Text type={'captionLight'}>파일을 불러와주세요.</Text>
        </span>
    );
}

export { FileUpLoaderEmptyView };
