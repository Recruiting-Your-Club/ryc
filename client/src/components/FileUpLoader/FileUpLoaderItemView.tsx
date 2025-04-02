import React from 'react';
import { useFileUpLoaderContext } from './FileUpLoaderContext';
import type { KeyboardEvent } from 'react';
import {
    s_fileItemList,
    s_fileItem,
    s_fileHeader,
    s_fileRow,
    s_fileNameWithIcon,
    s_fileMetaItem,
    s_xIcon,
    s_fileHeaderText,
} from './FileUpLoader.style';
import PdfIcon from '@assets/images/PdfIcon.svg';
import WordIcon from '@assets/images/DocIcon.svg';
import ExcelIcon from '@assets/images/XlsxIcon.svg';
import PptIcon from '@assets/images/PptIcon.svg';
import ZipIcon from '@assets/images/ZipIcon.svg';
import XIcon from '@assets/images/gray_xicon.svg';

const fileTypeIcons: Record<string, React.FC<React.SVGProps<SVGSVGElement>>> = {
    pdf: PdfIcon,
    docx: WordIcon,
    xlsx: ExcelIcon,
    ppt: PptIcon,
    zip: ZipIcon,
};

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

function FileUpLoaderItemView() {
    const { files, handleDelete, handleDeleteEntire } = useFileUpLoaderContext();

    const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>, index: number) => {
        if (event.key === 'Enter' || event.key === ' ') {
            handleDelete(index);
        }
    };

    return (
        <div>
            {/* 헤더 */}
            <div css={s_fileHeader}>
                <div css={s_fileRow}>
                    <XIcon
                        css={s_xIcon}
                        role="button"
                        tabIndex={0}
                        onClick={handleDeleteEntire}
                        onKeyDown={handleKeyDown}
                    />
                    <div style={{ textAlign: 'left' }}>파일명</div>
                    <div css={s_fileHeaderText}>최종 수정 일시</div>
                    <div css={s_fileHeaderText}>크기</div>
                    <div css={s_fileHeaderText}>파일 유형</div>
                </div>
            </div>

            {/* 리스트 */}
            <ul css={s_fileItemList}>
                {files?.map((file, index) => {
                    const ext = getExtension(file.name);
                    const IconComponent = fileTypeIcons[ext];

                    return (
                        <li key={index} css={s_fileItem}>
                            <div css={s_fileRow}>
                                <XIcon
                                    css={s_xIcon}
                                    role="button"
                                    tabIndex={0}
                                    onClick={() => handleDelete(index)}
                                    onKeyDown={handleKeyDown}
                                />
                                <div css={s_fileNameWithIcon}>
                                    {IconComponent && <IconComponent />}
                                    <span>{file.name}</span>
                                </div>
                                <div css={s_fileMetaItem}>{formatDate(file.lastModified)}</div>
                                <div css={s_fileMetaItem}>{formatBytes(file.size)}</div>
                                <div css={s_fileMetaItem}>{ext}</div>
                            </div>
                        </li>
                    );
                })}
            </ul>
        </div>
    );
}

export { FileUpLoaderItemView };
