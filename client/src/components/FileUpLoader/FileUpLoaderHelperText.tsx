import React from 'react';
import { s_fileUpLoaderHelperText } from './FileUpLoader.style';
import { Text } from '@components/_common';
import type { FileUpLoaderHelperTextProps } from './types';

function FileUpLoaderHelperText({ children, sx }: FileUpLoaderHelperTextProps) {
    return (
        <div css={[s_fileUpLoaderHelperText, sx]}>
            <Text type="subCaptionLight" color="helper" sx={{ margin: 0 }}>
                {children}
            </Text>
        </div>
    );
}

export { FileUpLoaderHelperText };
