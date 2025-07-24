import React from 'react';

import { Button } from '@ssoc/ui';

import { s_fileUpLoaderInput } from './FileUpLoader.style';
import { useFileUpLoaderInteractionContext } from './FileUpLoaderInteractionContext';
import { useFileUpLoaderStateContext } from './FileUpLoaderStateContext';

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
