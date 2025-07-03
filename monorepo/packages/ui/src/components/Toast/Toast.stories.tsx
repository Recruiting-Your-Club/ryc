import type { Meta, StoryObj } from '@storybook/react';
import React, { useState } from 'react';

import { Toast } from '.';
import { Button } from '../Button';
import { Text } from '../Text';
import { ToastProvider } from './ToastProvider';
import { useToast } from './useToast';

type Story = StoryObj<typeof Toast>;

const meta: Meta<typeof Toast> = {
    title: 'Toast',
    component: Toast,
    parameters: {
        docs: {
            description: {
                component: '토스트입니다.',
            },
        },
    },
    decorators: [
        (Story) => {
            return (
                <ToastProvider>
                    <div style={{ width: '100%', height: '100%', padding: '100px' }}>
                        <Story />
                    </div>
                </ToastProvider>
            );
        },
    ],
};

export const CustomDefaultToast: Story = {
    render: (args) => {
        // eslint-disable-next-line react-hooks/rules-of-hooks
        const { toast } = useToast();
        const handleToast = () => {
            toast(args.content, {
                toastTheme: args.toastTheme,
                type: args.type,
                duration: args.duration,
                autoClose: args.autoClose,
                status: args.status,
                position: args.position,
                progressBar: args.progressBar,
                sx: args.sx,
            });
        };
        return (
            <Button size="full" variant="primary" onClick={handleToast}>
                커스텀 해보세여
            </Button>
        );
    },
    args: {
        content: '내용물(React Node)',
        type: 'info',
        toastTheme: 'black',
        autoClose: true,
        duration: 3000,
        status: 'entering',
        progressBar: true,
        sx: {},
    },
    argTypes: {
        content: {
            control: 'text',
        },
        type: {
            options: ['info', 'success', 'error', 'default'],
            control: { type: 'radio' },
        },
        toastTheme: {
            options: ['white', 'black', 'colored'],
            control: { type: 'radio' },
        },
        duration: {
            control: { type: 'number' },
        },
        autoClose: {
            control: { type: 'boolean' },
        },
        status: {
            control: { type: 'text' },
        },
        position: {
            options: [
                'topRight',
                'topCenter',
                'topLeft',
                'bottomRight',
                'bottomCenter',
                'bottomLeft',
            ],
            control: { type: 'radio' },
        },
        progressBar: {
            control: { type: 'boolean' },
        },
        sx: {
            control: { type: 'object' },
        },
    },
};
export const ToastCollection: Story = {
    render: (args) => {
        // eslint-disable-next-line react-hooks/rules-of-hooks
        const { toast } = useToast();
        return (
            <>
                <Text type="h1Bold">Theme : White입니다.</Text>
                <div style={{ width: '100%', display: 'flex', marginBottom: '30px' }}>
                    <Button
                        size="full"
                        variant="primary"
                        onClick={() => toast('Hello world', { toastTheme: 'white' })}
                    >
                        기본 Toast 입니다.
                    </Button>

                    <Button
                        size="full"
                        variant="primary"
                        onClick={() =>
                            toast.info('메일을 성공적으로 전송하였습니다.', {
                                toastTheme: 'white',
                                position: 'topLeft',
                            })
                        }
                    >
                        info 입니다.
                    </Button>

                    <Button
                        size="full"
                        variant="primary"
                        onClick={() =>
                            toast.success('Hello world', {
                                toastTheme: 'white',
                                position: 'topCenter',
                                duration: 3000,
                            })
                        }
                    >
                        success입니다.
                    </Button>

                    <Button
                        size="full"
                        variant="primary"
                        onClick={() =>
                            toast.error('Hello world', {
                                toastTheme: 'white',
                                position: 'topRight',
                                duration: 3000,
                            })
                        }
                    >
                        error입니다.
                    </Button>
                </div>

                <Text type="h1Bold">Theme : black입니다.</Text>
                <div style={{ width: '100%', display: 'flex', marginBottom: '30px' }}>
                    <Button
                        size="full"
                        variant="primary"
                        onClick={() => toast('Hello world', { toastTheme: 'black' })}
                    >
                        기본 Toast 입니다.
                    </Button>
                    <Button
                        size="full"
                        variant="primary"
                        onClick={() =>
                            toast.info('Hello world', {
                                toastTheme: 'black',
                                position: 'topLeft',
                            })
                        }
                    >
                        info입니다.
                    </Button>
                    <Button
                        size="full"
                        variant="primary"
                        onClick={() =>
                            toast.success('Hello world', {
                                toastTheme: 'black',
                                position: 'topCenter',
                            })
                        }
                    >
                        success입니다.
                    </Button>
                    <Button
                        size="full"
                        variant="primary"
                        onClick={() =>
                            toast.error('Hello world', {
                                toastTheme: 'black',
                                position: 'topRight',
                            })
                        }
                    >
                        error입니다.
                    </Button>
                </div>

                <Text type="h1Bold">Theme : Colored입니다.</Text>
                <div style={{ width: '100%', display: 'flex', marginBottom: '30px' }}>
                    <Button
                        size="full"
                        variant="primary"
                        onClick={() => toast('기본 Toast', { toastTheme: 'colored' })}
                    >
                        기본 Toast 입니다.
                    </Button>
                    <Button
                        size="full"
                        variant="primary"
                        onClick={() =>
                            toast.info('메일을 성공적으로 전송하였습니다.', {
                                toastTheme: 'colored',
                                position: 'topLeft',
                            })
                        }
                    >
                        info 입니다.
                    </Button>
                    <Button
                        size="full"
                        variant="primary"
                        onClick={() =>
                            toast.success('Hello world', {
                                toastTheme: 'colored',
                                position: 'topCenter',
                            })
                        }
                    >
                        success입니다.
                    </Button>
                    <Button
                        size="full"
                        variant="primary"
                        onClick={() =>
                            toast.error('Hello world', {
                                toastTheme: 'colored',
                                position: 'topRight',
                            })
                        }
                    >
                        error입니다.
                    </Button>
                </div>
            </>
        );
    },
};

export default meta;
