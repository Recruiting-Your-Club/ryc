import type { Meta, StoryObj } from '@storybook/react';
import React, { useState } from 'react';
import { ScrollBar } from './ScrollBar';

const meta: Meta<typeof ScrollBar> = {
    title: '스크롤바 컴포넌트',
    component: ScrollBar,
    parameters: {
        docs: {
            description: {
                component:
                    '부모 요소의 크기를 자동 감지하여 동적으로 높이를 조절하는 커스텀 스크롤바 컴포넌트.',
            },
        },
    },
};

export default meta;
type Story = StoryObj<typeof ScrollBar>;

/**
 * 기본 스크롤바 (부모 높이 자동 감지)
 */
export const Default = ({ height = '30rem' }: { height?: string }) => {
    return (
        <div
            style={{
                border: '0.1rem solid gray',
                borderRadius: '10px',
                padding: '0.2rem',
                height,
                width: '30rem',
                overflow: 'hidden',
            }}
        >
            <ScrollBar>
                <div style={{ height: '80rem', padding: '1rem' }}>
                    {[...Array(50)].map((_, i) => (
                        <p key={i}>스크롤 테스트 {i + 1}</p>
                    ))}
                </div>
            </ScrollBar>
        </div>
    );
};

/**
 * 부모 요소 높이를 동적으로 변경할 수 있는 테스트
 */
export const DynamicParent = ({ height = '30rem' }: { height?: string }) => {
    const [parentHeight, setParentHeight] = useState(height);

    return (
        <div>
            <button
                onClick={() => setParentHeight(parentHeight === '30rem' ? '50rem' : '30rem')}
                style={{
                    marginBottom: '1rem',
                    padding: '0.5rem 1rem',
                    cursor: 'pointer',
                }}
            >
                부모 높이 변경 (현재: {parentHeight})
            </button>
            <div
                style={{
                    border: '0.1rem solid gray',
                    borderRadius: '0.1rem',
                    padding: '0.2rem',
                    height: parentHeight,
                    width: '3rem',
                    overflow: 'hidden',
                    transition: 'height 0.3s ease-in-out',
                }}
            >
                <ScrollBar>
                    <div style={{ height: '100rem', padding: '1rem' }}>
                        {[...Array(70)].map((_, i) => (
                            <p key={i}>동적 높이 테스트 {i + 1}</p>
                        ))}
                    </div>
                </ScrollBar>
            </div>
        </div>
    );
};
