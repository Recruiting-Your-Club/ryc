import React, { useState } from 'react';
import { useToast } from '@hooks/useToast';
import { Button } from '@components/Button';
import { Text } from '@components/Text';
function TestPage() {
    const { toast } = useToast();

    return (
        <>
            <Text type="h1Bold">Theme : dark입니다.</Text>
            <div style={{ width: '100%', display: 'flex', marginBottom: '30px' }}>
                <Button size="full" variant="primary" onClick={() => toast('Hello world')}>
                    기본 Toast 입니다.
                </Button>
                <Button
                    size="full"
                    variant="primary"
                    onClick={() =>
                        toast.info(
                            'Hello world',
                            { toastTheme: 'dark', autoClose: false },
                            { position: 'topRight' },
                        )
                    }
                >
                    info
                </Button>
                <Button
                    size="full"
                    variant="primary"
                    onClick={() =>
                        toast.error(
                            'Hello world',
                            { toastTheme: 'dark', autoClose: false },
                            { position: 'topRight' },
                        )
                    }
                >
                    warning
                </Button>
                <Button
                    size="full"
                    variant="primary"
                    onClick={() =>
                        toast.success(
                            'Hello world',
                            { toastTheme: 'dark', autoClose: false },
                            { position: 'topRight' },
                        )
                    }
                >
                    success toast
                </Button>
            </div>
            <br />

            <Text type="h1Bold">Theme : White입니다.</Text>
            <div style={{ width: '800px', display: 'flex' }}>
                <Button
                    size="full"
                    variant="primary"
                    onClick={() =>
                        toast.info(
                            '메일을 성공적으로 전송하였습니다.',
                            { toastTheme: 'white', autoClose: false },
                            { position: 'topLeft' },
                        )
                    }
                >
                    info 입니다.
                </Button>
                <Button
                    size="full"
                    variant="primary"
                    onClick={() =>
                        toast.success(
                            'Hello world',
                            { toastTheme: 'white', autoClose: false },
                            { position: 'topLeft' },
                        )
                    }
                >
                    success입니다.
                </Button>
                <Button
                    size="full"
                    variant="primary"
                    onClick={() =>
                        toast.error(
                            'Hello world',
                            { toastTheme: 'white', autoClose: false },
                            { position: 'topLeft' },
                        )
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
                    onClick={() =>
                        toast.info(
                            '메일을 성공적으로 전송하였습니다.',
                            { toastTheme: 'colored', autoClose: false },
                            { position: 'topLeft' },
                        )
                    }
                >
                    info 입니다.
                </Button>
                <Button
                    size="full"
                    variant="primary"
                    onClick={() =>
                        toast.success(
                            'Hello world',
                            { toastTheme: 'colored', autoClose: false },
                            { position: 'topLeft' },
                        )
                    }
                >
                    success입니다.
                </Button>
                <Button
                    size="full"
                    variant="primary"
                    onClick={() =>
                        toast.error(
                            'Hello world',
                            { toastTheme: 'colored', autoClose: false },
                            { position: 'topLeft' },
                        )
                    }
                >
                    error입니다.
                </Button>
            </div>
        </>
    );
}
export { TestPage };
