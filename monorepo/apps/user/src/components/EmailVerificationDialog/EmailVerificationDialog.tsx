import React, { useEffect, useMemo, useRef, useState } from 'react';

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
    const empty = useMemo(() => Array.from({ length: codeLength }, () => ''), [codeLength]);
    const [code, setCode] = useState(empty);
    const [isLoading, setIsLoading] = useState(false);
    const [status, setStatus] = useState<EmailStatus>('idle');
    const [message, setMessage] = useState('');
    const [resendCooldown, setResendCooldown] = useState(0);
    const inputRefs = useRef<HTMLInputElement[]>([]);

    useEffect(() => {
        if (isOpen) {
            setTimeout(() => inputRefs.current[0]?.focus(), 100);
            setCode(empty);
            setStatus('idle');
            setMessage('');
            setResendCooldown(0);
        } else {
            setCode(empty);
            setStatus('idle');
            setMessage('');
            setResendCooldown(0);
        }
    }, [isOpen, empty]);

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
