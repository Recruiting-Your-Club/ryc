import React from 'react';
import { Button } from '@components/Button';
import { s_fileUpLoaderInput } from './FileUpLoader.style';
import { useFileUpLoaderContext } from './FileUpLoaderContext';

function FileUpLoaderButton() {
    const { fileInputRef, handleChangeFile, handleClickInput } = useFileUpLoaderContext();

    return (
        <>
            <input
                ref={fileInputRef}
                type="file"
                multiple
                onChange={handleChangeFile}
                css={s_fileUpLoaderInput}
            />
            <Button variant="outlined" size="s" onClick={handleClickInput}>
                파일선택
            </Button>
        </>
    );
}

export { FileUpLoaderButton };
