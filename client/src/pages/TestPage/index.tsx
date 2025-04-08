import React, { useState } from 'react';
import { Select } from '@components/Select/Select';
import { FileUpLoader } from '@components/FileUpLoader/FileUpLoader';
function TestPage() {
    const [value, setValue] = useState('');

    return (
        <div>
            <p style={{ marginBottom: '20px' }}>Selected value: {value}</p>
            <Select size="md">
                <Select.Trigger>
                    <Select.Value placeholder="Select a fruit" />
                </Select.Trigger>
                <Select.Content>
                    <Select.Group>
                        <Select.Label>Fruits</Select.Label>
                        <Select.Item value="apple">안녕1</Select.Item>
                        <Select.Item value="banana">안녕2</Select.Item>
                        <Select.Item value="orange">안녕3</Select.Item>
                    </Select.Group>
                    <Select.Separator />
                    <Select.Group>
                        <Select.Label>Vegetables</Select.Label>
                        <Select.Item value="carrot">Carrot</Select.Item>
                        <Select.Item value="potato">Potato</Select.Item>
                        <Select.Item value="broccoli">Broccoli</Select.Item>
                    </Select.Group>
                </Select.Content>
            </Select>

            <FileUpLoader>
                <FileUpLoader.Button />
                <FileUpLoader.HelperText helperText="최대 5개의 pdf,이미지 파일만 업로드 가능합니다." />
                <FileUpLoader.Box />
            </FileUpLoader>
        </div>
    );
}
export { TestPage };
