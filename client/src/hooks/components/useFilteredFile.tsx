import { ImageExtension } from '@components/FileUpLoader/type';
import { getExtension } from '@components/FileUpLoader/utills';

function useFilteredFile(files: File[], setFiles: (files: File[]) => void) {
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
    };

    return {
        filterAndSetFiles,
    };
}

export { useFilteredFile };
