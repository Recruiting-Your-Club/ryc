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
            options: ['sm', 'md', 'lg'],
            control: { type: 'radio' },
        },
        width: {
            control: { type: 'text' },
        },
        placeholder: {
            control: { type: 'text' },
        },
        label: {
            control: { type: 'text' },
        },
        error: {
            control: 'boolean',
        },
        errorText: {
            control: 'text',
        },
        charCount: {
            control: 'boolean',
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
    return <TextArea {...args} value={text} onChange={(e) => setText(e.target.value)} />;
};
export const Primary: Story = {
    render: (args) => <Template {...args} />,
    args: {
        label: '기본 TextArea',
        size: 'md',
        placeholder: '여기에 내용을 입력하세요',
    },
};

export const SmallSize: Story = {
    render: (args) => <Template {...args} />,
    args: {
        label: '작은 사이즈',
        size: 'sm',
        placeholder: '작은 입력칸',
    },
};

export const LargeSize: Story = {
    render: (args) => <Template {...args} />,
    args: {
        label: '큰 사이즈',
        size: 'lg',
        placeholder: '많은 내용을 입력하세요',
    },
};

export const ChangeWidth: Story = {
    render: (args) => <Template {...args} />,
    args: {
        label: '80% 너비',
        size: 'md',
        width: '80%',
        placeholder: '너비가 조정된 TextArea',
    },
};

export const CharCount: Story = {
    render: (args) => <Template {...args} />,
    args: {
        label: '글자 수 제한',
        size: 'md',
        charCount: true,
        maxLength: 300,
        placeholder: '최대 300자까지 입력 가능',
    },
};

export const ErrorMode: Story = {
    render: (args) => <Template {...args} />,
    args: {
        label: '에러 필드',
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
                />
            );
        };

        return <Component />;
    },
    args: {
        label: '전체 모드',
        size: 'md',
        charCount: true,
        maxLength: 500,
        placeholder: '10자 이상 입력해야 에러가 사라져요',
    },
};

export const DisabledMode: Story = {
    render: (args) => <Template {...args} />,
    args: {
        label: '비활성 상태',
        size: 'md',
        disabled: true,
        placeholder: 'disabled 상태',
    },
};
