import React, { useState } from 'react';

import Email from '@ssoc/assets/images/email.svg';
import { Button, Dialog, Text } from '@ssoc/ui';

import type { EmailStatus, EmailVerificationDialogProps } from './types';

function EmailVerificationDialog({
    email,
    isOpen,
    onClose,
    onVerify,
    onResendCode,
    codeLength = 6,
}: EmailVerificationDialogProps) {
    const [code, setCode] = useState(['', '', '', '', '', '']);
    const [isLoading, setIsLoading] = useState(false);
    const [status, setStatus] = useState<EmailStatus>('idle');
    const [message, setMessage] = useState('');

    return (
        <Dialog open={isOpen} handleClose={() => onClose()}>
            <Dialog.Content>
                <div>
                    <div>
                        <Email />
                    </div>
                    <Text>이메일 인증</Text>
                    <Text>
                        {email}로 전송된 <br /> 6자리 인증 코드를 입력해주세요.
                    </Text>
                </div>
                <div>
                    <div>
                        {code.map((digit, index) => (
                            <input key={index}></input>
                        ))}
                    </div>
                </div>
            </Dialog.Content>

            <Button>인증하기</Button>
        </Dialog>
    );
}

export { EmailVerificationDialog };
