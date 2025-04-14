import React, { useState } from 'react';
import { Select } from '@components/Select/Select';
import { FileUpLoader } from '@components/FileUpLoader/FileUpLoader';
import { Button } from '@components/_common/Button';
import { Text } from '@components/_common/Text';
import { ClubCard } from '@components';
import { Input } from '@components/_common/Input';

function TestPage() {
    return (
        <>
            <div>
                <Button variant="outlined">hd</Button>
                <Button variant="text">hd</Button>
                <Button variant="transparent">hd</Button>
                <Button variant="primary">hd</Button>
                <Text type="h1Bold">
                    <Text.HighLight>하이</Text.HighLight>
                    하이요
                </Text>
                <Input />
                <div style={{ display: 'flex', gap: '1rem', marginTop: '10rem' }}>
                <FileUpLoader>
                    <FileUpLoader.Button />
                    <FileUpLoader.HelperText helperText="최대 5개의 pdf,이미지 파일만 업로드 가능합니다." />
                    <FileUpLoader.Box />
                </FileUpLoader>
                </div>
            </div>
        </>

    );
}
export { TestPage };
