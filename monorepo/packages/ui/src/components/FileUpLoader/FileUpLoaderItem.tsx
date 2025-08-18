import type { ReactNode } from 'react';
import React from 'react';

import XIcon from '@ssoc/assets/images/gray_xicon.svg';
import PdfIcon from '@ssoc/assets/images/PdfIcon.svg';
import { Button } from '../../components/Button';
import { FileExtension } from '../../constants';
import { s_fileImagePreview, s_fileItem, s_fileRow } from './FileUpLoader.style';
import { useFileUpLoaderInteractionContext } from './FileUpLoaderInteractionContext';
import { FileUpLoaderItemCell } from './FileUpLoaderItemCell';
import { useFileUpLoaderStateContext } from './FileUpLoaderStateContext';
import type { FileUpLoaderItemProps } from './types';
import { formatBytes, formatDate, getExtension } from './utils';


function FileUpLoaderItem({ file, index }: FileUpLoaderItemProps) {
    //props destruction
    // lib hooks
    const { files } = useFileUpLoaderStateContext();
    const { handleDelete } = useFileUpLoaderInteractionContext();

    // calculated value
    const ext = getExtension(file.name);
    const isImage = [
        FileExtension.JPG,
        FileExtension.JPEG,
        FileExtension.PNG,
        FileExtension.GIF,
        FileExtension.WEBP,
    ].includes(ext as FileExtension);
    const isPdf = ext === FileExtension.PDF;
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
