import React from 'react';
import { s_fileUpLoaderBox } from './FileUpLoader.style';
import { useFileUpLoaderContext } from './FileUpLoaderContext';
import { FileUpLoaderEmptyView } from './FileUpLoaderEmptyView';
import { FileUpLoaderItemView } from './FileUpLoaderItemView';

function FileUpLoaderBox() {
    const { files, hasFile } = useFileUpLoaderContext();
    return (
        <div css={s_fileUpLoaderBox(hasFile)}>
            {files?.length === 0 ? <FileUpLoaderEmptyView /> : <FileUpLoaderItemView />}
        </div>
    );
}

export { FileUpLoaderBox };
