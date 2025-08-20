import React from 'react';
import type { DownloadFileProps } from './types';
import { s_fileNameText } from './FileDownloader.style';

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

    const base64ToBlob = (base64: string, mime = 'application/octet-stream') => {
        const base64Data = base64.includes(',') ? base64.split(',')[1] : base64;
        const byteCharacters = atob(base64Data);
        const byteNumbers = new Array(byteCharacters.length);
        for (let i = 0; i < byteCharacters.length; i++) {
            byteNumbers[i] = byteCharacters.charCodeAt(i);
        }
        const byteArray = new Uint8Array(byteNumbers);
        return new Blob([byteArray], { type: mime });
    };

    // handlers
    const handleDownload = () => {
        const mimeType = getMimeTypeByExtension(fileName);
        const blob = base64ToBlob(fileData, mimeType);
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = fileName;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
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
