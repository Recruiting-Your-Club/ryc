import React from 'react';
import { s_fileUpLoaderBox } from './FileUpLoader.style';
import { useFileLoader } from './FileUpLoaderContext';

function FileUpLoaderBox() {
    const { files } = useFileLoader();

    return (
        <div css={s_fileUpLoaderBox}>
            {files?.length === 0 ? (
                <>
                    {/* 파일이 없을 때 UI */}
                    <p>📁 파일이 없습니다. 파일을 선택해 주세요.</p>
                </>
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
