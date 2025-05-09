import type { Meta, StoryObj } from '@storybook/react';
import { Select } from './Select';
import React, { useState } from 'react';

type Story = StoryObj<typeof Select>;
type Trigger = StoryObj<typeof Select.Trigger>;
type Item = StoryObj<typeof Select.Item>;
type Value = StoryObj<typeof Select.Value>;

const meta: Meta<typeof Select> = {
    title: 'Select',
    component: Select,
    parameters: {
        docs: {
            description: {
                component: 'dropdown 형식의 Select 컴포넌트입니다.',
            },
        },
    },
};

export const DefaultSelect: Story = {
    render: (args) => {
        // eslint-disable-next-line react-hooks/rules-of-hooks
        const [value, setValue] = useState('primary2');

        return (
            <div style={{ height: '300px' }}>
                <p style={{ marginBottom: '20px' }}>Selected value: {value}</p>
                <Select value={args.value} onValueChange={setValue} size={args.size} sx={args.sx}>
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
        );
    },
    args: {
        children: 'ReactNode',
        size: 'lg',
        value: 'primary2',
        onValueChange: () => {},
    },
};

export const SelectTrigger: Trigger = {
    render: (args) => {
        // eslint-disable-next-line react-hooks/rules-of-hooks
        const [value, setValue] = useState('');

        return (
            <div style={{ height: '300px' }}>
                <p style={{ marginBottom: '20px' }}>Selected value: {value}</p>
                <Select value={value} onValueChange={setValue} size="md">
                    <Select.Trigger disabled={args.disabled}>
                        <Select.Value placeholder="기본 Select" />
                    </Select.Trigger>
                    <Select.Content>
                        <Select.Item value="primary1">기본입니다 1</Select.Item>
                        <Select.Item value="primary2">기본입니다 2</Select.Item>
                        <Select.Item value="primary3">기본입니다 3</Select.Item>
                    </Select.Content>
                </Select>
            </div>
        );
    },
    args: {
        children: 'ReactNode',
        disabled: true,
    },
};

export const SelectValue: Value = {
    render: (args) => {
        // eslint-disable-next-line react-hooks/rules-of-hooks
        const [value, setValue] = useState('');

        return (
            <div style={{ height: '300px' }}>
                <p style={{ marginBottom: '20px' }}>Selected value: {value}</p>
                <Select value={value} onValueChange={setValue} size="xl">
                    <Select.Trigger>
                        <Select.Value placeholder={args.placeholder} />
                    </Select.Trigger>
                    <Select.Content>
                        <Select.Item value="primary1">기본입니다 1</Select.Item>
                        <Select.Item value="primary2">기본입니다 2</Select.Item>
                        <Select.Item value="primary3">기본입니다 3</Select.Item>
                    </Select.Content>
                </Select>
            </div>
        );
    },
    args: {
        placeholder: '선택되지 않았을 때 기본 문구',
    },
};

export const SelectItem: Item = {
    render: (args) => {
        // eslint-disable-next-line react-hooks/rules-of-hooks
        const [value, setValue] = useState('');

        return (
            <div style={{ height: '300px' }}>
                <p style={{ marginBottom: '20px' }}>Selected value: {value}</p>
                <Select value={value} onValueChange={setValue} size="md">
                    <Select.Trigger>
                        <Select.Value placeholder="기본 Select" />
                    </Select.Trigger>
                    <Select.Content>
                        <Select.Item value={args.value} disabled={args.disabled}>
                            기본입니다 1
                        </Select.Item>
                        <Select.Item value="primary2">기본입니다 2</Select.Item>
                        <Select.Item value="primary3">기본입니다 3</Select.Item>
                    </Select.Content>
                </Select>
            </div>
        );
    },
    args: {
        children: 'ReactNode',
        disabled: true,
        value: '',
    },
};

export const BaseSelect: Story = {
    render: (args) => {
        // eslint-disable-next-line react-hooks/rules-of-hooks
        const [value, setValue] = useState('');

        return (
            <div style={{ height: '300px' }}>
                <p style={{ marginBottom: '20px' }}>Selected value: {value}</p>
                <Select value={value} onValueChange={setValue} size={args.size}>
                    <Select.Trigger>
                        <Select.Value placeholder="Select a fruit" />
                    </Select.Trigger>
                    <Select.Content>
                        <Select.Group>
                            <Select.Label>Fruits</Select.Label>
                            <Select.Item value="apple">Apple</Select.Item>
                            <Select.Item value="banana">Banana</Select.Item>
                            <Select.Item value="orange">Orange</Select.Item>
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
            </div>
        );
    },
    args: {
        children: 'ReactNode',
        size: 'md',
        value: '',
        onValueChange: () => {},
    },
};

export default meta;
