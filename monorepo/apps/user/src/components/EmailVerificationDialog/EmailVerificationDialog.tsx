import React from 'react';

import { Dialog, Text } from '@ssoc/ui';

function EmailVerificationDialog({
    email,
    isOpen,
    onClose,
    onVerify,
    onResendCode,
}: EmailVerificationDialogProps) {
    return (
        <Dialog open={isOpen} handleClose={() => onClose()}>
            <Dialog.Content>
                <Text>이메일 인증</Text>
                <Text>
                    {email}로 전송된 <br /> 6자리 인증 코드를 입력해주세요.
                </Text>
            </Dialog.Content>
        </Dialog>
    );
}

export { EmailVerificationDialog };
