import React from 'react';
import { s_fileItem, s_fileRow, s_xIcon, s_fileImagePreview } from './FileUpLoader.style';
import XIcon from '@assets/images/gray_xicon.svg';
import { useFileUpLoaderContext } from './FileUpLoaderContext';
import { FileUpLoaderItemCell } from './FileUpLoaderItemCell';
import type { FileUpLoaderItemProps } from './type';
import { fileTypeIcons } from './type';
import { ImageExtension } from './type';
import { formatBytes } from '@utils/\bbyteFormatter';

function formatDate(timestamp: number): string {
    const date = new Date(timestamp);
    return date.toLocaleDateString() + ' ' + date.toLocaleTimeString();
}

function FileUpLoaderItem({ file, index }: FileUpLoaderItemProps) {
    const { handleDelete } = useFileUpLoaderContext();

    const getExtension = (fileName: string): string => {
        return fileName.split('.').pop()?.toLowerCase() || '';
    };

    const ext = getExtension(file.name);
    const isImage = Object.values(ImageExtension).includes(ext as ImageExtension);
    const IconComponent = fileTypeIcons[ext];
    const fileUrl = URL.createObjectURL(file);

    return (
        <li css={s_fileItem}>
            <div css={s_fileRow}>
                <XIcon
                    css={s_xIcon}
                    role="button"
                    tabIndex={0}
                    onClick={() => handleDelete(index)}
                />
                <FileUpLoaderItemCell isNameCell align="left">
                    {isImage ? (
                        <img src={fileUrl} alt={file.name} css={s_fileImagePreview} />
                    ) : (
                        IconComponent && <IconComponent />
                    )}
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
