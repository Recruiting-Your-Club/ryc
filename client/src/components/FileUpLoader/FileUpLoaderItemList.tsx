import React from 'react';
import { useFileUpLoaderContext } from './FileUpLoaderContext';
import { FileUpLoaderItem } from './FileUpLoaderItem';
import { s_fileUpLoaderItemList } from './FileUpLoader.style';

function FileUpLoaderItemList() {
    const { files } = useFileUpLoaderContext();

    return (
        <ul css={s_fileUpLoaderItemList}>
            {files?.map((file, index) => (
                <FileUpLoaderItem key={index} file={file} index={index} />
            ))}
        </ul>
    );
}

export { FileUpLoaderItemList };
