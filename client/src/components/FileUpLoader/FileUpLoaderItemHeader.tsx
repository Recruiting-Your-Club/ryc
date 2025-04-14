import React from 'react';
import { useFileUpLoaderContext } from './FileUpLoaderContext';
import XIcon from '@assets/images/gray_xicon.svg';
import { s_fileHeader, s_fileRow } from './FileUpLoader.style';
import { FileUpLoaderItemCell } from './FileUpLoaderItemCell';
import { headerItems } from './type';
import { Button } from '@components/_common';

function FileUpLoaderItemHeader() {
    const { handleDeleteEntire } = useFileUpLoaderContext();

    return (
        <div css={s_fileHeader}>
            <div css={s_fileRow}>
                <Button variant="transparent" size="xs" onClick={() => handleDeleteEntire()}>
                    <XIcon />
                </Button>
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
