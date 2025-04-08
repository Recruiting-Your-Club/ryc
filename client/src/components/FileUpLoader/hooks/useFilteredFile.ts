import { ImageExtension } from '../type';
import { getExtension } from '../utills';

export const useFilteredFile = (
    files: File[],
    setFiles: (files: File[]) => void,
    setHasFile: (has: boolean) => void,
) => {
    const isValidFile = (file: File) => {
        const ext = getExtension(file.name);
        return ext === 'pdf' || Object.values(ImageExtension).includes(ext as ImageExtension);
    };

    const filterAndSetFiles = (newFiles: File[] | FileList) => {
        const validFiles = Array.from(newFiles).filter(isValidFile);

        if (validFiles.length !== newFiles.length) {
            alert('pdf 또는 이미지 파일만 업로드할 수 있습니다.');
            return;
        }

        setFiles([...files, ...validFiles]);
        setHasFile(true);
    };

    return {
        filterAndSetFiles,
    };
};
