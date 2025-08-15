import React from 'react';

import File from '@ssoc/admin/src/assets/images/File.svg';
import { Text } from '@ssoc/ui';

import { s_fileUpLoaderEmptyView, s_fileUpLoaderIcon } from './FileUpLoader.style';

function FileUpLoaderEmptyView({ text = '파일을 불러와주세요.' }: { text?: string }) {
    return (
        <span css={s_fileUpLoaderEmptyView}>
            <File css={s_fileUpLoaderIcon} />
            <Text type={'captionLight'}>{text}</Text>
        </span>
    );
}

export { FileUpLoaderEmptyView };
