import { FileExtension } from '@constants/fileUpLoader';
import { getExtension } from '@components/FileUpLoader/utills';
import { useCallback } from 'react';

function useFilteredFile(onFilesChange: (files: File[]) => void, currentFileCount: number) {
    const isValidFile = useCallback((file: File) => {
        const ext = getExtension(file.name);
        return Object.values(FileExtension).includes(ext as FileExtension);
    }, []);

    const filterAndSetFiles = useCallback(
        (newFiles: File[] | FileList, prevFiles: File[] | FileList): string | null => {
            const validFiles = Array.from(newFiles).filter(isValidFile);

            if (validFiles.length !== Array.from(newFiles).length) {
                return 'pdf 또는 이미지 파일만 업로드할 수 있습니다.';
            }

            if (currentFileCount + validFiles.length > 5) {
                return '최대 5개의 파일만 업로드할 수 있습니다.';
            }

            onFilesChange([...prevFiles, ...validFiles]);
            return null;
        },
        [isValidFile, onFilesChange, currentFileCount],
    );

    return { filterAndSetFiles };
}

export { useFilteredFile };
