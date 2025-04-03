import React from 'react';
import { s_fileItem, s_fileRow, s_xIcon, s_fileImagePreview } from './FileUpLoader.style';
import XIcon from '@assets/images/gray_xicon.svg';
import PdfIcon from '@assets/images/PdfIcon.svg';
import WordIcon from '@assets/images/DocIcon.svg';
import ExcelIcon from '@assets/images/XlsxIcon.svg';
import PptIcon from '@assets/images/PptIcon.svg';
import ZipIcon from '@assets/images/ZipIcon.svg';
import { useFileUpLoaderContext } from './FileUpLoaderContext';
import { FileUpLoaderItemCell } from './FileUpLoaderItemCell';

const fileTypeIcons: Record<string, React.FC<React.SVGProps<SVGSVGElement>>> = {
    pdf: PdfIcon,
    docx: WordIcon,
    xlsx: ExcelIcon,
    pptx: PptIcon,
    zip: ZipIcon,
};

const imageExtensions = ['jpg', 'jpeg', 'png', 'gif', 'webp'];

function getExtension(fileName: string): string {
    return fileName.split('.').pop()?.toLowerCase() || '';
}

function formatBytes(bytes: number): string {
    const kb = bytes / 1024;
    const mb = kb / 1024;
    return mb >= 1 ? `${mb.toFixed(2)}MB` : `${kb.toFixed(2)}KB`;
}

function formatDate(timestamp: number): string {
    const date = new Date(timestamp);
    return date.toLocaleDateString() + ' ' + date.toLocaleTimeString();
}

function FileUpLoaderItem({ file, index }: { file: File; index: number }) {
    const { handleDelete } = useFileUpLoaderContext();

    const ext = getExtension(file.name);
    const isImage = imageExtensions.includes(ext);
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
                    <a href={fileUrl} target="_blank" rel="noopener noreferrer">
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
