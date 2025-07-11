import React from 'react';
import XIcon from '@ssoc/assets/images/gray_xicon.svg';
import { s_fileHeader, s_fileRow } from './FileUpLoader.style';
import { FileUpLoaderItemCell } from './FileUpLoaderItemCell';
import { Button } from '../Button';
import { headerItems} from '../../constants'
import { useFileUpLoaderInteractionContext } from './FileUpLoaderInteractionContext';

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
