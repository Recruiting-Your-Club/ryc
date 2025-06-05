import type { ChangeEvent } from 'react';
import React, { useState } from 'react';
import { Button } from '@components/_common/Button';
import { Tooltip } from '@components/_common/Tooltip';
import { MainCard, Select } from '@components';

function TestPage() {
    const [value, setValue] = useState('primary1');
    const options = [
        { value: 'primary1', label: '기본입니다 1' },
        { value: 'primary2', label: '기본입니다 2' },
        { value: 'primary3', label: '기본입니다 3' },
    ];
    return (
        <>
            <div>
                <Tooltip content="Tooltip 예시입니다.">
                    <Button variant="outlined">hd</Button>
                </Tooltip>
                <Select value={value} onValueChange={setValue} options={options}>
                    <Select.Trigger>
                        <Select.Value placeholder="기본 Select" />
                    </Select.Trigger>
                    <Select.Content>
                        <Select.Item value="primary1">기본입니다 1</Select.Item>
                        <Select.Item value="primary2">기본입니다 2</Select.Item>
                        <Select.Item value="primary3">기본입니다 3</Select.Item>
                    </Select.Content>
                </Select>
            </div>
        </>
    );
}
export { TestPage };
