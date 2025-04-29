import React from 'react';
import { useFileUpLoaderStateContext } from './FileUpLoaderStateContext';
import { FileUpLoaderItem } from './FileUpLoaderItem';
import { s_fileUpLoaderItemList } from './FileUpLoader.style';

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
