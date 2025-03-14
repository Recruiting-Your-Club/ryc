import type { Meta} from '@storybook/react';
import { StoryObj } from '@storybook/react';
import React, { useState } from 'react';
import { RadioGroup } from './RadioGroup';

const meta: Meta<typeof RadioGroup> = {
    title: 'RadioGroup',
    component: RadioGroup,
    parameters: {
        docs: {
            description: {
                component: '공용 라디오 컴포넌트입니다.',
            },
        },
    },
};

export default meta;

export const Default = () => {
    const [selectedValue, setSelectedValue] = useState<string>('');
    return (
        <>
            <RadioGroup
                options={['옵션 1']}
                name="defaultGroup"
                value={selectedValue}
                onChange={setSelectedValue}
            ></RadioGroup>
        </>
    );
};

export const GroupDefault = () => {
    const [selectedValue, setSelectedValue] = useState('옵션 1');

    return (
        <>
            <RadioGroup
                options={['옵션 1', '옵션 2', '옵션 3']}
                name="radioGroup"
                value={selectedValue}
                onChange={setSelectedValue}
            />
        </>
    );
};
