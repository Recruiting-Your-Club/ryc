import type { CSSObject } from '@emotion/react';
import type { ReactNode} from 'react';
import React, { useState } from 'react';
import { FileUpLoaderContext } from './FileUpLoaderContext';
interface FileUpLoader {
    children: ReactNode;
    sx?: CSSObject;
}

function FileUpLoader({ children, sx }: FileUpLoader) {
    const [files, setFiles] = useState<File[]>([]);
    return (
        <FileUpLoaderContext.Provider value={{ files, setFiles }}>
            {children}
        </FileUpLoaderContext.Provider>
    );
}

export { FileUpLoader };
