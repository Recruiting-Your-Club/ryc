import {
    DEFAULT_DESCRIPTION,
    ERROR_500_DESCRIPTION,
    ERROR_CODE_400,
    ERROR_CODE_401,
    ERROR_CODE_403,
    ERROR_CODE_404_DATA,
    ERROR_CODE_500,
    ERROR_DEFAULT,
} from '@constants/errorText';
import React from 'react';

import { useRouter } from '@ssoc/hooks';
import { Button, Dialog, Text } from '@ssoc/ui';

import { s_textWrapper } from './ErrorDialog.style';
import type { ErrorDialogProps } from './type';

function ErrorDialog({
    open,
    handleClose,
    errorStatusCode,
    content,
    subContent,
}: ErrorDialogProps) {
    // prop destruction
    // lib hooks
    const { goTo } = useRouter();

    // initial values
    let message = ERROR_DEFAULT;

    // state, ref, querystring hooks
    // form hooks
    // query hooks
    // calculated values
    switch (errorStatusCode) {
        case 500:
            message = ERROR_CODE_500;
            break;
        case 404:
            message = ERROR_CODE_404_DATA;
            break;
        case 403:
            message = ERROR_CODE_403;
            break;
        case 401:
            message = ERROR_CODE_401;
            break;
        case 400:
            message = ERROR_CODE_400;
            break;
        default:
            message = ERROR_DEFAULT;
            break;
    }

    if (content) message = content;

    // handlers
    // effects
    return (
        <>
            <Dialog open={open} handleClose={handleClose}>
                <Dialog.Header closeIcon handleClose={handleClose}>
                    <Text type="captionSemibold">오류 알림</Text>
                </Dialog.Header>
                <Dialog.Content>
                    <Text type="h3Bold" textAlign="center">
                        ERROR
                    </Text>
                    <Text type="captionSemibold" textAlign="center">
                        {message}
                    </Text>
                    <Text type="subCaptionRegular" textAlign="center" sx={s_textWrapper}>
                        {subContent
                            ? subContent
                            : errorStatusCode === 500
                              ? ERROR_500_DESCRIPTION
                              : DEFAULT_DESCRIPTION}
                    </Text>
                </Dialog.Content>
                <Dialog.Action position="center">
                    {errorStatusCode === 500 ? (
                        <div>
                            <Button
                                onClick={() => {
                                    handleClose();
                                    goTo('/');
                                }}
                            >
                                오류 신고
                            </Button>
                        </div>
                    ) : errorStatusCode === 401 ? (
                        <div>
                            <Button
                                onClick={() => {
                                    handleClose();
                                    goTo('/login');
                                }}
                            >
                                로그인 하기
                            </Button>
                        </div>
                    ) : (
                        <div>
                            <Button onClick={() => handleClose}>확인</Button>
                        </div>
                    )}
                </Dialog.Action>
            </Dialog>
        </>
    );
}

export { ErrorDialog };
