import { Button } from '@components/Button';
import React, { useRef } from 'react';
import { s_fileUpLoaderInput } from './FileUpLoader.style';
import { useFileUpLoaderContext } from './FileUpLoaderContext';

function FileUpLoaderButton() {
    const { files, setFiles } = useFileUpLoaderContext();
    const fileInputRef = useRef<HTMLInputElement>(null);
    const handleClick = () => {
        fileInputRef.current?.click();
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFiles = e.target.files;
        if (!selectedFiles) return;

        const selectedArray = Array.from(selectedFiles);
        const copyFiles = files ? [...files, ...selectedArray] : selectedArray;

        setFiles(copyFiles);
    };

    return (
        <>
            <input
                ref={fileInputRef}
                type="file"
                multiple
                onChange={handleChange}
                css={s_fileUpLoaderInput}
            />
            <Button variant="outlined" size="s" onClick={handleClick}>
                파일선택
            </Button>
        </>
    );
}

export { FileUpLoaderButton };
