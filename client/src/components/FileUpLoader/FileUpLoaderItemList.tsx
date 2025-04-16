import React from 'react';
import { useFileUpLoaderStateContext } from './FileUpLoaderStateContext';
import { FileUpLoaderItem } from './FileUpLoaderItem';
import { s_fileUpLoaderItemList } from './FileUpLoader.style';

function FileUpLoaderItemList() {
    const { files } = useFileUpLoaderStateContext();

    return (
        <ul css={s_fileUpLoaderItemList}>
            {files?.map((file) => {
                const key = `${file.name}-${file.lastModified}`;
                return <FileUpLoaderItem key={key} file={file} index={files.indexOf(file)} />;
            })}
        </ul>
    );
}

export { FileUpLoaderItemList };
