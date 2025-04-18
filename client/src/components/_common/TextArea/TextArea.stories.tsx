import type { StoryObj, Meta } from '@storybook/react';
import { TextArea } from './TextArea';
import type { ComponentProps } from 'react';
import React, { useState } from 'react';

type Story = StoryObj<typeof TextArea>;

const meta: Meta<typeof TextArea> = {
    title: 'TextArea',
    component: TextArea,
    parameters: {
        docs: {
            description: {
                component: '공용 TextArea 컴포넌트입니다.',
            },
        },
    },
    argTypes: {
        size: {
            options: ['xs', 'sm', 'md', 'lg', 'xl', 'full'],
            control: { type: 'radio' },
        },
        variant: {
            options: ['outline', 'subtle', 'flushed'],
            control: { type: 'radio' },
        },
        width: {
            control: { type: 'text' },
        },
        placeholder: {
            control: { type: 'text' },
        },
        error: {
            control: 'boolean',
        },
        errorText: {
            control: 'text',
        },
        disabled: {
            control: 'boolean',
        },
        maxLength: {
            control: 'number',
        },
    },
};

export default meta;

const Template = (args: ComponentProps<typeof TextArea>) => {
    const [text, setText] = useState('');
    return (
        <TextArea
            {...args}
            value={text}
            onChange={(e) => setText(e.target.value)}
            sx={{ margin: '1rem' }}
        />
    );
};
export const Primary: Story = {
    render: (args) => <Template {...args} />,
    args: {
        size: 'md',
        placeholder: '여기에 내용을 입력하세요',
    },
};

export const FlushedVariant: Story = {
    render: (args) => <Template {...args} />,
    args: {
        size: 'md',
        variant: 'flushed',
        placeholder: 'Flushed variant',
    },
};

export const SubtleVariant: Story = {
    render: (args) => <Template {...args} />,
    args: {
        size: 'md',
        variant: 'subtle',
        placeholder: 'Subtle variant',
    },
};

export const XsSize: Story = {
    render: (args) => <Template {...args} />,
    args: {
        size: 'xs',
        placeholder: 'xs 사이즈',
    },
};

export const SmallSize: Story = {
    render: (args) => <Template {...args} />,
    args: {
        size: 'sm',
        placeholder: 'sm 사이즈',
    },
};
export const MiddleSize: Story = {
    render: (args) => <Template {...args} />,
    args: {
        size: 'md',
        placeholder: 'md 사이즈',
    },
};

export const LargeSize: Story = {
    render: (args) => <Template {...args} />,
    args: {
        size: 'lg',
        placeholder: '많은 내용을 입력하세요',
    },
};
export const FullSize: Story = {
    render: (args) => <Template {...args} />,
    args: {
        size: 'full',
        placeholder: 'full 사이즈',
    },
};

export const ChangeWidth: Story = {
    render: (args) => <Template {...args} />,
    args: {
        size: 'md',
        width: '80%',
        placeholder: '너비가 조정된 TextArea',
    },
};

export const CharCount: Story = {
    render: (args) => <Template {...args} />,
    args: {
        size: 'md',
        maxLength: 300,
        placeholder: '최대 300자까지 입력 가능',
    },
};

export const ErrorMode: Story = {
    render: (args) => <Template {...args} />,
    args: {
        size: 'md',
        error: true,
        errorText: '에러 메시지입니다.',
        placeholder: '에러 상태',
    },
};

export const EntireMode: Story = {
    render: (args) => {
        const Component = () => {
            const [text, setText] = useState('');

            return (
                <TextArea
                    {...args}
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    error={text.length < 10}
                    errorText="10자 이상 입력해주세요."
                    maxLength={500}
                    sx={{ margin: '1rem' }}
                />
            );
        };

        return <Component />;
    },
    args: {
        size: 'md',
        placeholder: '10자 이상 입력해야 에러가 사라져요',
    },
};

export const DisabledMode: Story = {
    render: (args) => <Template {...args} />,
    args: {
        size: 'md',
        disabled: true,
        placeholder: 'disabled 상태',
    },
};
