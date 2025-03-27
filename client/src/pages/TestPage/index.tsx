import React, { useState } from 'react';
import { useToast } from '@hooks/useToast';
import { Button } from '@components/Button';
import { Text } from '@components/Text';
function TestPage() {
    const { toast } = useToast();

    return (
        <>
            <div style={{ marginBottom: '200px' }} />

            <Text type="h1Bold">Theme : White입니다.</Text>
            <div style={{ width: '800px', display: 'flex', marginBottom: '30px' }}>
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
            <Button
                size="full"
                variant="primary"
                onClick={() =>
                    toast.error(
                        'Hello world',
                        {
                            toastTheme: 'colored',
                            position: 'topRight',
                        },
                        { limit: 3 }, // 최대 toast 발행 수
                    )
                }
            >
                컨테이너 제어하는 방법은 이 코드 참고
            </Button>
        </>
    );
}
export { TestPage };
