import React from 'react';
import { Button } from '@components/Button';
import { s_fileUpLoaderInput } from './FileUpLoader.style';
import { useFileUpLoaderContext } from './FileUpLoaderContext';

function FileUpLoaderButton() {
    const { fileInputRef, handleChangeFile, handleClickButton, disabled } =
        useFileUpLoaderContext();

    return (
        <>
            <input
                ref={fileInputRef}
                type="file"
                multiple
                onChange={handleChangeFile}
                css={s_fileUpLoaderInput}
                disabled={disabled}
            />
            <Button
                variant="outlined"
                size="s"
                onClick={handleClickButton}
                sx={{ padding: '1rem' }}
                disabled={disabled}
            >
                파일선택
            </Button>
        </>
    );
}

export { FileUpLoaderButton };
