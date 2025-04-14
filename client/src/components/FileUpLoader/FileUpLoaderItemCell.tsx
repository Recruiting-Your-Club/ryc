import React from 'react';
import { s_fileMetaItem, s_fileNameWithIcon, s_fileHeaderText } from './FileUpLoader.style';
import type { FileUpLoaderItemCellProps } from './type';

function FileUpLoaderItemCell({
    children,
    align = 'center',
    isFileNameCell = false,
    isHeader = false,
}: FileUpLoaderItemCellProps) {
    // header이면 s_fileHeaderText 적용,
    // header가 아니면 file명이 있는 셀이 true -> file명과 아이콘을 같이 띄우는 스타일 적용
    // 다 아니면 파일명을 제외한 파일 정보를 나타내는 metaItem 스타일 적용
    const baseStyle = isHeader
        ? s_fileHeaderText(align)
        : isFileNameCell
          ? s_fileNameWithIcon
          : s_fileMetaItem;

    return <div css={baseStyle}>{children}</div>;
}

export { FileUpLoaderItemCell };
