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
export const Default = ({ height = '300px' }: { height?: string }) => {
    return (
        <div
            style={{
                border: '1px solid gray',
                borderRadius: '10px',
                padding: '2px',
                height,
                width: '300px',
                overflow: 'hidden',
            }}
        >
            <ScrollBar isMouseIn={false}>
                <div style={{ height: '800px', padding: '10px' }}>
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
export const DynamicParent = ({ height = '300px' }: { height?: string }) => {
    const [parentHeight, setParentHeight] = useState(height);

    return (
        <div>
            <button
                onClick={() => setParentHeight(parentHeight === '300px' ? '500px' : '300px')}
                style={{
                    marginBottom: '10px',
                    padding: '5px 10px',
                    cursor: 'pointer',
                }}
            >
                부모 높이 변경 (현재: {parentHeight})
            </button>
            <div
                style={{
                    border: '1px solid gray',
                    borderRadius: '10px',
                    padding: '2px',
                    height: parentHeight,
                    width: '300px',
                    overflow: 'hidden',
                    transition: 'height 0.3s ease-in-out',
                }}
            >
                <ScrollBar isMouseIn={false}>
                    <div style={{ height: '1000px', padding: '10px' }}>
                        {[...Array(70)].map((_, i) => (
                            <p key={i}>동적 높이 테스트 {i + 1}</p>
                        ))}
                    </div>
                </ScrollBar>
            </div>
        </div>
    );
};
