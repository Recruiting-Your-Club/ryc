import React from 'react';
import { useFileUpLoaderContext } from './FileUpLoaderContext';
import XIcon from '@assets/images/gray_xicon.svg';
import { s_fileHeader, s_fileRow, s_xIcon } from './FileUpLoader.style';
import { FileUpLoaderItemCell } from './FileUpLoaderItemCell';
import { headerItems } from './type';

function FileUpLoaderItemHeader() {
    const { handleDeleteEntire } = useFileUpLoaderContext();

    return (
        <div css={s_fileHeader}>
            <div css={s_fileRow}>
                <XIcon css={s_xIcon} role="button" tabIndex={0} onClick={handleDeleteEntire} />
                {headerItems.map(({ label, align }) => (
                    <FileUpLoaderItemCell key={label} isHeader={true} align={align}>
                        {label}
                    </FileUpLoaderItemCell>
                ))}
            </div>
        </div>
    );
}

export { FileUpLoaderItemHeader };
