import React from 'react';
import { Button } from '@components/_common/Button';
import { s_fileUpLoaderInput } from './FileUpLoader.style';
import { useFileUpLoaderStateContext } from './FileUpLoaderStateContext';
import { useFileUpLoaderInteractionContext } from './FileUpLoaderInteractionContext';

function FileUpLoaderButton() {
    const { disabled } = useFileUpLoaderStateContext();

    const { fileInputRef, handleChangeFile, handleClickButton } =
        useFileUpLoaderInteractionContext();

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
                variant={disabled ? 'primary' : 'outlined'}
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
