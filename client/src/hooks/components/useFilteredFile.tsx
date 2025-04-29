import { FileExtension } from '@components/FileUpLoader/constants';
import { getExtension } from '@components/FileUpLoader/utills';
import { useCallback } from 'react';

function useFilteredFile(setFiles: (updater: (prev: File[]) => File[]) => void) {
    const isValidFile = useCallback((file: File) => {
        const ext = getExtension(file.name);
        return Object.values(FileExtension).includes(ext as FileExtension);
    }, []);

    const filterAndSetFiles = useCallback(
        (newFiles: File[] | FileList) => {
            const validFiles = Array.from(newFiles).filter(isValidFile);

            if (validFiles.length !== Array.from(newFiles).length) {
                alert('pdf 또는 이미지 파일만 업로드할 수 있습니다.');
                return;
            }

            setFiles((prev) => [...prev, ...validFiles]);
        },
        [isValidFile, setFiles],
    );

    return { filterAndSetFiles };
}

export { useFilteredFile };
