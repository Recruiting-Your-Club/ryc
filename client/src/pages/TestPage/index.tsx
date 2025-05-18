import React, { useState } from 'react';
import { Button } from '@components/_common/Button';
import { Tooltip } from '@components/_common/Tooltip';
import { FileUpLoader } from '@components/FileUpLoader';

function TestPage() {
    return (
        <>
            <div>
                <Tooltip content="Tooltip 예시입니다.">
                    <FileUpLoader>
                        <FileUpLoader.HelperText>하이</FileUpLoader.HelperText>
                        <FileUpLoader.Button />
                        <FileUpLoader.Box />
                    </FileUpLoader>
                </Tooltip>
            </div>
        </>
    );
}
export { TestPage };
