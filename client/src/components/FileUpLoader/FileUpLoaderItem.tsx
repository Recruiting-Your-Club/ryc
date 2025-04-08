import type { ReactNode } from 'react';
import React from 'react';
import { s_fileItem, s_fileRow, s_xIcon, s_fileImagePreview } from './FileUpLoader.style';
import XIcon from '@assets/images/gray_xicon.svg';
import { useFileUpLoaderContext } from './FileUpLoaderContext';
import { FileUpLoaderItemCell } from './FileUpLoaderItemCell';
import type { FileUpLoaderItemProps } from './type';
import { ImageExtension } from './type';
import PdfIcon from '@assets/images/PdfIcon.svg';
import { formatDate, formatBytes, getExtension } from './utills';

function FileUpLoaderItem({ file, index }: FileUpLoaderItemProps) {
    const { handleDelete } = useFileUpLoaderContext();

    const ext = getExtension(file.name);
    const isImage = Object.values(ImageExtension).includes(ext as ImageExtension);
    const isPdf = ext === 'pdf';
    const fileUrl = URL.createObjectURL(file);

    const renderFileIcon = (): ReactNode => {
        if (isImage) {
            return <img src={fileUrl} alt={file.name} css={s_fileImagePreview} />;
        } else if (isPdf) {
            return <PdfIcon />;
        }
    };

    return (
        <li css={s_fileItem}>
            <div css={s_fileRow}>
                <XIcon
                    css={s_xIcon}
                    role="button"
                    tabIndex={0}
                    onClick={() => handleDelete(index)}
                />
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
