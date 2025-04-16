import React, { useState } from 'react';
import { Select } from '@components/Select/Select';
import { FileUpLoader } from '@components/FileUpLoader/FileUpLoader';
import { Button } from '@components/_common/Button';
import { Text } from '@components/_common/Text';
import { Input } from '@components/_common/Input';
import { SideBar } from '@components';

function TestPage() {
    return (
        <>
            <div>
                <div style={{ display: 'flex', gap: '1rem', marginTop: '10rem' }}>
                    <FileUpLoader>
                        <FileUpLoader.Button />
                        <FileUpLoader.HelperText>
                            pdf,이미지 파일만 업로드 가능합니다.
                        </FileUpLoader.HelperText>
                        <FileUpLoader.Box />
                    </FileUpLoader>
                </div>
            </div>
        </>
    );
}
export { TestPage };
