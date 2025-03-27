import React from 'react';
import { s_fileUpLoaderBox } from './FileUpLoader.style';
import { useFileUpLoaderContext } from './FileUpLoaderContext';
import { FileUpLoaderContent } from './FileUpLoaderContent';

function FileUpLoaderBox() {
    const { files, hasFile } = useFileUpLoaderContext();

    return (
        <div css={s_fileUpLoaderBox(hasFile)}>
            {files?.length === 0 ? (
                <FileUpLoaderContent />
            ) : (
                <>
                    {/* 파일이 있을 때 UI */}
                    <div style={{ fontWeight: 'bold' }}>선택된 파일들:</div>
                    <ul>
                        {files?.map((file, idx) => (
                            <li key={idx}>
                                {file.name} ({file.size} bytes)
                            </li>
                        ))}
                    </ul>
                </>
            )}
        </div>
    );
}

export { FileUpLoaderBox };
