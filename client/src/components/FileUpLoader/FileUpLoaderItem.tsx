import type { ReactNode } from 'react';
import React from 'react';
import { s_fileItem, s_fileRow, s_fileImagePreview } from './FileUpLoader.style';
import XIcon from '@assets/images/gray_xicon.svg';
import { useFileUpLoaderStateContext } from './FileUpLoaderStateContext';
import { FileUpLoaderItemCell } from './FileUpLoaderItemCell';
import type { FileUpLoaderItemProps } from './types';
import { ImageExtension } from './constants';
import PdfIcon from '@assets/images/PdfIcon.svg';
import { formatDate, formatBytes, getExtension } from './utills';
import { Button } from '@components/_common';
import { useFileUpLoaderInteractionContext } from './FileUpLoaderInteractionContext';

function FileUpLoaderItem({ file, index }: FileUpLoaderItemProps) {
    //props destruction
    // lib hooks
    const { files } = useFileUpLoaderStateContext();
    const { handleDelete } = useFileUpLoaderInteractionContext();

    // initial values
    const ext = getExtension(file.name);
    const isImage = Object.values(ImageExtension).includes(ext as ImageExtension);
    const isPdf = ext === 'pdf';
    const fileUrl = URL.createObjectURL(file);

    // form hooks
    // query hooks
    // calculated values
    const renderFileIcon = (): ReactNode => {
        if (isImage) {
            return <img src={fileUrl} alt={file.name} css={s_fileImagePreview} />;
        } else if (isPdf) {
            return <PdfIcon />;
        }
    };

    return (
        <li css={s_fileItem(files)}>
            <div css={s_fileRow}>
                <Button variant="transparent" size="xs" onClick={() => handleDelete(index)}>
                    <XIcon />
                </Button>
                <FileUpLoaderItemCell isFileNameCell align="left">
                    {renderFileIcon()}
                    <a
                        href={fileUrl}
                        download={file.name}
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        {file.name}
                    </a>
                </FileUpLoaderItemCell>
                <FileUpLoaderItemCell>{formatDate(file.lastModified)}</FileUpLoaderItemCell>
                <FileUpLoaderItemCell>{formatBytes(file.size)}</FileUpLoaderItemCell>
                <FileUpLoaderItemCell>{ext}</FileUpLoaderItemCell>
            </div>
        </li>
    );
}
export { FileUpLoaderItem };
