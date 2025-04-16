import React from 'react';
import { s_fileUpLoaderHelperText } from './FileUpLoader.style';
import type { FileUpLoaderHelperTextProps } from './types';

function FileUpLoaderHelperText({ helperText, sx }: FileUpLoaderHelperTextProps) {
    return <p css={[s_fileUpLoaderHelperText, sx]}>{helperText}</p>;
}

export { FileUpLoaderHelperText };
