import { useCallback } from 'react';

import { getExtension } from '@ssoc/admin/src/components/FileUpLoader/utills';
import { FileExtension } from '@ssoc/ui/src/constants';

//import { useToast } from '@ssoc/ui/src/hooks';

function useFilteredFile(onFilesChange: (files: File[]) => void, currentFileCount: number) {
    //const { toast } = useToast();

    const isValidFile = useCallback((file: File) => {
        const ext = getExtension(file.name);
        return Object.values(FileExtension).includes(ext as FileExtension);
    }, []);

    const filterAndSetFiles = useCallback(
        (newFiles: File[] | FileList, prevFiles: File[] | FileList) => {
            const validFiles = Array.from(newFiles).filter(isValidFile);

            // if (validFiles.length !== Array.from(newFiles).length) {
            //     toast.error('pdf 또는 이미지 파일만 업로드할 수 있습니다.', {
            //         duration: 2000,
            //         sx: {
            //             minWidth: '35rem',
            //         },
            //     });
            //     return;
            // }
            // if (currentFileCount + validFiles.length > 5) {
            //     toast.error('최대 5개의 파일만 업로드할 수 있습니다.', {
            //         duration: 2000,
            //         sx: {
            //             minWidth: '35rem',
            //         },
            //     });
            //     return;
            // }
            onFilesChange([...prevFiles, ...validFiles]);
        },
        //[isValidFile, onFilesChange, toast, currentFileCount],
        [isValidFile, onFilesChange, currentFileCount],
    );

    return { filterAndSetFiles };
}

export { useFilteredFile };
