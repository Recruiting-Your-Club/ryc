import React from 'react';

import XIcon from '@ssoc/assets/images/gray_xicon.svg';
import { Button } from '@ssoc/ui';
import { headerItems } from '@ssoc/ui/src/constants';

import { s_fileHeader, s_fileRow } from './FileUpLoader.style';
import { useFileUpLoaderInteractionContext } from './FileUpLoaderInteractionContext';
import { FileUpLoaderItemCell } from './FileUpLoaderItemCell';

function FileUpLoaderItemHeader() {
    const { handleDeleteEntire } = useFileUpLoaderInteractionContext();

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
