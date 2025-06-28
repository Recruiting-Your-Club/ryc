import type { Meta } from '@storybook/react';
import React, { useState } from 'react';

import { Radio } from './Radio';

const meta: Meta<typeof Radio> = {
    title: 'Radio',
    component: Radio,
    parameters: {
        docs: {
            description: {
                component: '공용 라디오 컴포넌트입니다.',
            },
        },
    },
};

export default meta;

// 기본 모습
export const Primary = () => {
    const [value, setValue] = useState('1');

    return (
        <Radio
            options={[{ value: '1' }]}
            name="primary"
            value={value}
            onChange={setValue}
            orientation="horizontal"
        />
    );
};

// 옵션 1개일 때
export const Text = () => {
    const [value, setValue] = useState('opt1');

    return (
        <Radio
            options={[{ label: '옵션1', value: 'opt1' }]}
            name="text"
            value={value}
            onChange={setValue}
            orientation="horizontal"
        />
    );
};

// 여러 개의 옵션일 때
export const VariableText = () => {
    const [value, setValue] = useState('opt2');

    return (
        <Radio
            options={[
                { label: '옵션1', value: 'opt1' },
                { label: '옵션2', value: 'opt2' },
                { label: '옵션3', value: 'opt3' },
            ]}
            name="variableText"
            value={value}
            onChange={setValue}
            orientation="horizontal"
        />
    );
};

// 수직 방향
export const VerticalRadio = () => {
    const [value, setValue] = useState('opt1');

    return (
        <Radio
            options={[
                { label: '옵션1', value: 'opt1' },
                { label: '옵션2', value: 'opt2' },
                { label: '옵션3', value: 'opt3' },
            ]}
            name="verticalRadio"
            value={value}
            onChange={setValue}
            orientation="vertical"
        />
    );
};

// disabled 모드
export const DisabledRadio = () => {
    const [value, setValue] = useState('opt1');

    return (
        <Radio
            options={[
                { label: '옵션1', value: 'opt1' },
                { label: '옵션2', value: 'opt2' },
                { label: '옵션3', value: 'opt3' },
            ]}
            name="disabledRadio"
            value={value}
            onChange={setValue}
            disabled
            orientation="horizontal"
        />
    );
};

// 라벨이 없을 때 (버튼만 있음)
export const NoLabelRadio = () => {
    const [value, setValue] = useState('2');

    return (
        <Radio
            options={[{ value: '1' }, { value: '2' }, { value: '3' }]}
            name="noLabelRadio"
            value={value}
            onChange={setValue}
            orientation="horizontal"
        />
    );
};
