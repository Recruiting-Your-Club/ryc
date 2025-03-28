import type { CSSObject } from '@emotion/react';
import type { ReactNode } from 'react';
import React, { useState } from 'react';
import { FileUpLoaderContext } from './FileUpLoaderContext';
interface FileUpLoader {
    children: ReactNode;
    sx?: CSSObject;
}

function FileUpLoader({ children, sx }: FileUpLoader) {
    const [files, setFiles] = useState<File[]>([]);
    const [hasFile, setHasFile] = useState(false);

    const handleDelete = (indexToDelete: number) => {
        const newFiles = files.filter((_, i) => i !== indexToDelete);
        setFiles(newFiles);
        if (newFiles.length === 0) setHasFile(false);
    };

    const handleDeleteEntire = () => {
        setFiles([]);
        setHasFile(false);
    };

    return (
        <FileUpLoaderContext.Provider
            value={{ files, setFiles, hasFile, setHasFile, handleDelete, handleDeleteEntire }}
        >
            {children}
        </FileUpLoaderContext.Provider>
    );
}

export { FileUpLoader };
