import React from 'react';

import { s_fileNameText } from './FileDownloader.style';
import type { DownloadFileProps } from './types';

const FileDownloader = ({ fileName, fileData }: DownloadFileProps) => {
    // prop destruction
    // lib hooks
    // initial values
    // state, ref, querystring hooks
    // form hooks
    // query hooks
    // calculated values
    const getMimeTypeByExtension = (fileName: string): string => {
        const ext = fileName.split('.').pop()?.toLowerCase() ?? '';
        switch (ext) {
            case 'pdf':
                return 'application/pdf';
            case 'jpg':
            case 'jpeg':
                return 'image/jpeg';
            case 'png':
                return 'image/png';
            case 'txt':
                return 'text/plain';
            case 'gif':
                return 'image/gif';
            default:
                return 'application/octet-stream';
        }
    };

    // handlers
    const handleDownload = () => {
        const link = document.createElement('a');
        link.href = fileData;
        link.download = fileName;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    // effects

    return (
        <span
            onClick={handleDownload}
            title={`Download ${fileName}`}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    handleDownload();
                }
            }}
            css={s_fileNameText}
        >
            {fileName}
        </span>
    );
};

export { FileDownloader };
