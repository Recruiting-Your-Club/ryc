import { useCallback } from 'react';

import { getExtension } from '../components/FileUpLoader/utils';
import { FileExtension } from '../constants/fileUpLoader';

function useFileUpLoader(onFilesChange: (files: File[]) => void) {
    const isValidFile = useCallback((file: File) => {
        const ext = getExtension(file.name);
        return Object.values(FileExtension).includes(ext as FileExtension);
    }, []);

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
                return `최대 ${maxFileCount}개의 파일만 업로드할 수 있습니다.`;
            }
            return null;
        },
        [],
    );

    const getErrorMessageByFileType = useCallback(
        (files: File[]): string | null => {
            for (const file of files) {
                if (!isValidFile(file)) {
                    return 'pdf 또는 이미지 파일만 업로드할 수 있습니다.';
                }
            }
            return null;
        },
        [isValidFile],
    );

    return { filterAndSetFiles, getErrorMessageByFileCount, getErrorMessageByFileType };
}

export { useFileUpLoader };
