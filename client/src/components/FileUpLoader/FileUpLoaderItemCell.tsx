import React from 'react';
import { s_fileMetaItem, s_fileNameWithIcon, s_fileHeaderText } from './FileUpLoader.style';
import type { FileUpLoaderItemCellProps } from './type';

function FileUpLoaderItemCell({
    children,
    align = 'center',
    isNameCell = false,
    isHeader = false,
}: FileUpLoaderItemCellProps) {
    const baseStyle = isHeader
        ? s_fileHeaderText(align)
        : isNameCell
          ? s_fileNameWithIcon
          : s_fileMetaItem;

    return <div css={baseStyle}>{children}</div>;
}

export { FileUpLoaderItemCell };
