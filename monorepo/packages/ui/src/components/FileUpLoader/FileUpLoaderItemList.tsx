import React from 'react';

import { s_fileUpLoaderItemList } from './FileUpLoader.style';
import { FileUpLoaderItem } from './FileUpLoaderItem';
import { useFileUpLoaderStateContext } from './FileUpLoaderStateContext';

function FileUpLoaderItemList() {
    const { files } = useFileUpLoaderStateContext();

    return (
        <ul css={s_fileUpLoaderItemList}>
            {files?.map((file, index) => {
                const key = `${file.name}-${file.lastModified}`;
                return <FileUpLoaderItem key={key} file={file} index={index} />;
            })}
        </ul>
    );
}

export { FileUpLoaderItemList };
