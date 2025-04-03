import React from 'react';
import { useFileUpLoaderContext } from './FileUpLoaderContext';
import XIcon from '@assets/images/gray_xicon.svg';
import { s_fileHeader, s_fileRow, s_xIcon } from './FileUpLoader.style';
import { FileUpLoaderItemCell } from './FileUpLoaderItemCell';

const headerItems = [
    { label: '파일명', align: 'left' },
    { label: '최종 수정 일시', align: 'center' },
    { label: '크기', align: 'center' },
    { label: '파일 유형', align: 'center' },
] as const;

function FileUpLoaderItemHeader() {
    const { handleDeleteEntire } = useFileUpLoaderContext();

    return (
        <div css={s_fileHeader}>
            <div css={s_fileRow}>
                <XIcon css={s_xIcon} role="button" tabIndex={0} onClick={handleDeleteEntire} />
                {headerItems.map(({ label, align }) => (
                    <FileUpLoaderItemCell key={label} isHeader align={align}>
                        {label}
                    </FileUpLoaderItemCell>
                ))}
            </div>
        </div>
    );
}

export { FileUpLoaderItemHeader };
