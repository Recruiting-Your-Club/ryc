import React from 'react';

import { Text } from '../../components/Text';
import { s_fileUpLoaderHelperText, s_helperTextSx } from './FileUpLoader.style';
import type { FileUpLoaderHelperTextProps } from './types';

function FileUpLoaderHelperText({ children, sx }: FileUpLoaderHelperTextProps) {
    return (
        <div css={[s_fileUpLoaderHelperText, sx]}>
            <Text type="subCaptionLight" color="helper" textAlign="right" sx={s_helperTextSx}>
                {children}
            </Text>
        </div>
    );
}

export { FileUpLoaderHelperText };
