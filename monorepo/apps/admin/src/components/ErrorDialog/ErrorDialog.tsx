import { DEFAULT_DESCRIPTION, ERROR_500_DESCRIPTION } from '@constants/errorText';
import { getErrorMessage } from '@utils/getErrorMessage';
import React from 'react';

import { useRouter } from '@ssoc/hooks';
import { Button, Dialog, Text } from '@ssoc/ui';

import { s_textWrapper } from './ErrorDialog.style';
import type { ErrorDialogProps } from './type';

function ErrorDialog({ open, handleClose, error, content, subContent }: ErrorDialogProps) {
    // prop destruction
    // lib hooks
    const { goTo } = useRouter();

    // initial values
    let message = getErrorMessage(error);

    // state, ref, querystring hooks
    // form hooks
    // query hooks
    // calculated values
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
                            : error.statusCode === 500
                              ? ERROR_500_DESCRIPTION
                              : DEFAULT_DESCRIPTION}
                    </Text>
                </Dialog.Content>
                <Dialog.Action position="center">
                    {error.statusCode === 500 ? (
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
                    ) : error.statusCode === 401 ? (
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
