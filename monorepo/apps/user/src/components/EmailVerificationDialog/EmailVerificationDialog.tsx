import React, { useEffect, useMemo, useRef, useState } from 'react';

import Check from '@ssoc/assets/images/check.svg';
import Email from '@ssoc/assets/images/email.svg';
import Warning from '@ssoc/assets/images/warningIcon.svg';
import { Button, Dialog, Text } from '@ssoc/ui';

import {
    s_checkIcon,
    s_codeInput,
    s_codeInputContainer,
    s_contentContainer,
    s_emailIcon,
    s_emailIconContainer,
    s_footerConatiner,
    s_headerContainer,
    s_infoContainer,
    s_resendButton,
    s_resendContainer,
    s_textContainer,
} from './EmailVerificationDialog.style';
import type { EmailStatus, EmailVerificationDialogProps } from './types';

function EmailVerificationDialog({
    email,
    isOpen,
    onClose,
    onVerify,
    onResendCode,
    codeLength = 6,
}: EmailVerificationDialogProps) {
    // prop destruction
    // lib hooks
    // initial values
    const empty = useMemo(() => Array.from({ length: codeLength }, () => ''), [codeLength]);

    // state, ref, querystring hooks
    const [code, setCode] = useState(empty);
    const [isLoading, setIsLoading] = useState(false);
    const [status, setStatus] = useState<EmailStatus>('idle');
    const [message, setMessage] = useState('');
    const [resendCooldown, setResendCooldown] = useState(0);
    const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

    // form hooks
    // query hooks
    // calculated values
    // handlers
    const handleInputChange = (index: number, value: string) => {
        if (value.length > 1) return;

        const next = [...code];
        next[index] = value;
        setCode(next);
        setStatus('idle');
        setMessage('');

        //다음 input으로 자동 포커스 줄 수 있게
        if (value && index < codeLength - 1) {
            inputRefs.current[index + 1]?.focus();
        }
    };

    const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
        if (e.key === 'Backspace' && !code[index] && index > 0) {
            inputRefs.current[index - 1]?.focus();
        }
    };

    const handleVerify = async (verificationCode?: string) => {
        const codeToVerify = verificationCode ?? code.join('');

        if (codeToVerify.length !== codeLength) {
            setStatus('error');
            setMessage(`${codeLength}자리를 모두 입력해주세요`);
            return;
        }

        setIsLoading(true);
        setStatus('idle');
        setMessage('');

        try {
            const isValid = (await onVerify?.(codeToVerify)) ?? false;

            //인증 성공 시
            if (isValid) {
                setStatus('success');
                setMessage('이메일 인증이 완료되었습니다.');
                setTimeout(() => {
                    onClose();
                }, 1000);
            }
            //인증 실패 시
            else {
                setStatus('error');
                setMessage('인증 코드가 올바르지 않습니다. 다시 확인해주세요.');
                setCode(empty);
                //실패시 값 초기화 및 처음 input으로 focus
                inputRefs.current[0]?.focus();
            }
        } catch {
            setStatus('error');
            setMessage('인증 중 오류가 발생했습니다. 다시 시도해주세요');
        } finally {
            setIsLoading(false);
        }
    };

    const handleResendCode = async () => {
        if (resendCooldown > 0) return;

        try {
            await onResendCode?.();
            setResendCooldown(30);
            setStatus('info');
            setMessage('인증 코드가 재전송되었습니다.');
            setCode(empty);
            inputRefs.current[0]?.focus();
        } catch (error) {
            setStatus('error');
            setMessage('코드 재전송 중 오류가 발생했습니다.');
        }
    };

    // effects
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

    useEffect(() => {
        if (resendCooldown > 0) {
            const timer = setTimeout(() => setResendCooldown(resendCooldown - 1), 1000);
            return () => clearTimeout(timer);
        }
    }, [resendCooldown]);

    return (
        <Dialog open={isOpen} handleClose={() => onClose()}>
            <Dialog.Content>
                <div css={s_headerContainer}>
                    <div css={s_emailIconContainer}>
                        <Email css={s_emailIcon} />
                    </div>
                    <div css={s_textContainer}>
                        <Text type="h3Semibold">이메일 인증</Text>
                        <Text type="bodyRegular" color="subCaption">
                            {email}로 전송된 <br /> 6자리 인증 코드를 입력해주세요.
                        </Text>
                    </div>
                </div>
                <div css={s_contentContainer}>
                    <div css={s_codeInputContainer}>
                        {code.map((digit, index) => (
                            <input
                                key={index}
                                ref={(element) => (inputRefs.current[index] = element)}
                                type="text"
                                maxLength={1}
                                value={digit}
                                onChange={(event) => handleInputChange(index, event.target.value)}
                                onKeyDown={(event) => handleKeyDown(index, event)}
                                css={s_codeInput({
                                    hasValue: digit !== '',
                                    isError: status === 'error',
                                })}
                                disabled={isLoading}
                            />
                        ))}
                    </div>
                    {message && (
                        <div css={s_infoContainer({ isError: status === 'error' })}>
                            {status === 'success' && <Check css={s_checkIcon} />}
                            {status === 'error' && <Warning />}
                            {status === 'info' && <Email />}
                            {message}
                        </div>
                    )}
                </div>
            </Dialog.Content>
            <div css={s_footerConatiner}>
                <Button
                    onClick={() => handleVerify()}
                    disabled={isLoading || code.some((digit) => digit === '')}
                    size="full"
                >
                    {isLoading ? '인증 중...' : '인증하기'}
                </Button>
                <div css={s_resendContainer}>
                    코드를 받지 못하셨나요?{' '}
                    <button
                        onClick={handleResendCode}
                        disabled={resendCooldown > 0}
                        css={s_resendButton}
                    >
                        {resendCooldown > 0 ? `재전송 (${resendCooldown}초)` : '코드 재전송'}
                    </button>
                </div>
            </div>
        </Dialog>
    );
}

export { EmailVerificationDialog };
