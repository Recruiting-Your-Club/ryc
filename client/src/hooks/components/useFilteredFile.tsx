import { FileExtension } from '@constants/fileUpLoader';
import { getExtension } from '@components/FileUpLoader/utills';
import { useToast } from '@hooks/useToast';
import { useCallback } from 'react';

function useFilteredFile(setFiles: (updater: (prev: File[]) => File[]) => void) {
    const { toast } = useToast();

    const isValidFile = useCallback((file: File) => {
        const ext = getExtension(file.name);
        return Object.values(FileExtension).includes(ext as FileExtension);
    }, []);

    const filterAndSetFiles = useCallback(
        (newFiles: File[] | FileList) => {
            const validFiles = Array.from(newFiles).filter(isValidFile);

            if (validFiles.length !== Array.from(newFiles).length) {
                toast.error('pdf 또는 이미지 파일만 업로드할 수 있습니다.', {
                    duration: 2000,
                    sx: {
                        minWidth: '35rem',
                    },
                });
                return;
            }

            setFiles((prev) => [...prev, ...validFiles]);
        },
        [isValidFile, setFiles],
    );

    return { filterAndSetFiles };
}

export { useFilteredFile };
