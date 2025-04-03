// FileUpLoaderCell.tsx
import React from 'react';
import { css } from '@emotion/react';
import { s_fileMetaItem, s_fileNameWithIcon, s_fileHeaderText } from './FileUpLoader.style';

type Align = 'left' | 'center' | 'right';

interface Props {
    children: React.ReactNode;
    align?: Align;
    isNameCell?: boolean;
    isHeader?: boolean;
}

function FileUpLoaderItemCell({
    children,
    align = 'center',
    isNameCell = false,
    isHeader = false,
}: Props) {
    const baseStyle = isHeader
        ? s_fileHeaderText(align)
        : isNameCell
          ? s_fileNameWithIcon
          : s_fileMetaItem;

    return <div css={baseStyle}>{children}</div>;
}

export { FileUpLoaderItemCell };
