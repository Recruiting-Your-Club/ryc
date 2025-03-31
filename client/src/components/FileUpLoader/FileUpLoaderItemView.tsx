import React from 'react';
import { useFileUpLoaderContext } from './FileUpLoaderContext';
import type { KeyboardEvent } from 'react';
import {
    s_fileTable,
    s_fileTableHead,
    s_fileTableBody,
    s_fileNameWithIcon,
    s_fileIcon,
    s_xIcon,
} from './FileUpLoader.style';
import PdfIcon from '@assets/images/PdfIcon.svg';
import WordIcon from '@assets/images/DocIcon.svg';
import ExcelIcon from '@assets/images/XlsxIcon.svg';
import PptIcon from '@assets/images/PptIcon.svg';
import ZipIcon from '@assets/images/ZipIcon.svg';
import XIcon from '@assets/images/xIcon.svg';

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
        <table css={s_fileTable}>
            <thead css={s_fileTableHead}>
                <tr>
                    <th>
                        <span css={s_fileNameWithIcon}>
                            <XIcon
                                role="button"
                                css={s_xIcon}
                                tabIndex={0}
                                onClick={handleDeleteEntire}
                                onKeyDown={handleKeyDown}
                            />
                            파일명
                        </span>
                    </th>
                    <th>최종 수정 일시</th>
                    <th>크기</th>
                    <th>파일 유형</th>
                </tr>
            </thead>
            <tbody css={s_fileTableBody}>
                {files?.map((file, idx) => {
                    const ext = getExtension(file.name);
                    const IconComponent = fileTypeIcons[ext];

                    return (
                        <tr key={idx}>
                            <td>
                                <span css={s_fileNameWithIcon}>
                                    <XIcon
                                        css={s_xIcon}
                                        tabIndex={0}
                                        onClick={() => handleDelete(idx)}
                                        onKeyDown={handleKeyDown}
                                    />
                                    <IconComponent css={s_fileIcon} />
                                    {file.name}
                                </span>
                            </td>
                            <td>{formatDate(file.lastModified)}</td>
                            <td>{formatBytes(file.size)}</td>
                            <td>{file.type}</td>
                        </tr>
                    );
                })}
            </tbody>
        </table>
    );
}

export { FileUpLoaderItemView };
