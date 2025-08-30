import { useCallback } from 'react';

import { getExtension } from '../components/FileUpLoader/utils';
import { FileExtension } from '../constants/fileUpLoader';

function useFileUpLoader(onFilesChange: (files: File[]) => void, imageOnly = false) {
    const isValidFile = useCallback(
        (file: File) => {
            const ext = getExtension(file.name);

            if (imageOnly) {
                // 이미지 파일만 허용
                const imageExtensions = [
                    FileExtension.JPG,
                    FileExtension.JPEG,
                    FileExtension.PNG,
                    FileExtension.GIF,
                    FileExtension.WEBP,
                ];
                return imageExtensions.includes(ext as FileExtension);
            }

            // 모든 허용된 파일 타입 허용
            return Object.values(FileExtension).includes(ext as FileExtension);
        },
        [imageOnly],
    );

    const filterAndSetFiles = useCallback(
        (newFiles: File[] | FileList, prevFiles: File[] | FileList): void => {
            const validFiles = Array.from(newFiles).filter(isValidFile);
            onFilesChange([...prevFiles, ...validFiles]);
        },
        [isValidFile, onFilesChange],
    );

    const getErrorMessageByFileCount = useCallback(
        (currentFileCount: number, newFileCount: number, maxFileCount: number): string | null => {
            if (currentFileCount + newFileCount > maxFileCount) {
                return `최대 ${maxFileCount}개의 파일만 업로드할 수 있어요.`;
            }
            return null;
        },
        [],
    );

    const getErrorMessageByFileType = useCallback(
        (files: File[]): string | null => {
            for (const file of files) {
                if (!isValidFile(file)) {
                    if (imageOnly) {
                        return '이미지 파일만 업로드할 수 있어요.';
                    }
                    return 'pdf 또는 이미지 파일만 업로드할 수 있어요.';
                }
            }
            return null;
        },
        [isValidFile, imageOnly],
    );

    return { filterAndSetFiles, getErrorMessageByFileCount, getErrorMessageByFileType };
}

export { useFileUpLoader };
