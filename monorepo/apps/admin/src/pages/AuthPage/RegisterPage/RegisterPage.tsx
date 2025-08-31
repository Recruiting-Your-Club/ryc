import { useSendEmailVerification, useVerifyEmailCode } from '@api/hooks';
import { userQueries } from '@api/queryFactory';
import { EmailVerificationDialog } from '@components';
import { ErrorDialog } from '@components';
import { css } from '@emotion/react';
import { useRegister } from '@hooks/useRegister';
import { useQuery } from '@tanstack/react-query';
import type { FormEvent } from 'react';
import React, { useState } from 'react';

import { useRouter } from '@ssoc/hooks';
import { Button, Input, PasswordInput, useToast } from '@ssoc/ui';

import {
    buttonContainer,
    emailContainer,
    inputContainer,
    RegisterBox,
    RegisterContainer,
    titleContainer,
} from './RegisterPage.style';

function RegisterPage() {
    // prop destruction
    // lib hooks
    const { removeHistoryAndGo } = useRouter();
    const { toast } = useToast();

    // initial values
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const nameRegex = /^[a-zA-Zㄱ-ㅎㅏ-ㅣ가-힣]+$/;
    const passwordRegex = /^(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=[\]{}|;:,.<>?]).{8,}$/;

    // state, ref, querystring hooks
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirm, setPasswordConfirm] = useState('');

    //인증 관련 state
    const [verifyOpen, setVerifyOpen] = useState(false);
    const [dialogExpiresAt, setDialogExpiresAt] = useState<string>('');
    const [isEmailLocked, setIsEmailLocked] = useState(false);
    const [isEmailVerified, setIsEmailVerified] = useState(false);
    const [verifyCode, setVerifyCode] = useState<string>('');
    const [errorDialogOpen, setErrorDialogOpen] = useState<boolean>(false);

    // form hooks
    // query hooks
    const { mutate: register, isPending, error } = useRegister(setErrorDialogOpen);
    const sendMutation = useSendEmailVerification();
    const verifyMutation = useVerifyEmailCode();

    // calculated values
    const lockEmail = () => {
        setIsEmailLocked(true);
        setIsEmailVerified(true);
    };

    const unlockEmail = () => {
        setIsEmailLocked(false);
        setIsEmailVerified(false);
    };

    const openVerification = async () => {
        const trimmedEmail = email.trim();

        if (!trimmedEmail) {
            toast.error('이메일을 입력해주세요', { toastTheme: 'white' });
            return;
        }

        if (!emailRegex.test(trimmedEmail)) {
            toast.error('올바른 이메일 형식이 아닙니다.', { toastTheme: 'white' });
            return;
        }

        try {
            const { expiresAt } = await sendMutation.mutateAsync({ email: trimmedEmail });
            setDialogExpiresAt(expiresAt);
            setVerifyOpen(true);
        } catch {
            toast.error('인증 코드 발송에 실패했습니다. 잠시 후 다시 시도해주세요.', {
                toastTheme: 'white',
            });
        }
    };

    const handleSubmit = (event: FormEvent) => {
        event.preventDefault();

        const trimmedEmail = email.trim();
        const trimmedName = name.trim();
        const trimmedPassword = password.trim();
        const trimmedPasswordConfirm = passwordConfirm.trim();

        if (!isEmailVerified) {
            toast.error('이메일 인증을 완료해주세요.', { toastTheme: 'white' });
            return;
        }
        if (!nameRegex.test(trimmedName)) {
            toast.error('이름은 한글 또는 영문으로 입력해주세요.', {
                toastTheme: 'white',
            });
            return;
        }
        if (!passwordRegex.test(trimmedPassword)) {
            toast.error('비밀번호는 소문자 1개 이상, 숫자 1개, 특수문자를 포함해주세요.', {
                toastTheme: 'white',
            });
            return;
        }
        if (trimmedPassword !== trimmedPasswordConfirm) {
            toast.error('비밀번호가 일치하지 않습니다.', {
                toastTheme: 'white',
                position: 'topCenter',
            });
            return;
        }

        register({
            email: trimmedEmail,
            name: trimmedName,
            password: trimmedPassword,
            verifyCode: verifyCode,
        });
    };

    // effects

    return (
        <form css={RegisterContainer} onSubmit={handleSubmit}>
            <div css={RegisterBox}>
                <h1 css={titleContainer}>회원가입</h1>

                <div css={inputContainer}>
                    <div css={emailContainer}>
                        <Input
                            value={email}
                            onChange={(e) => {
                                if (isEmailLocked) return;
                                setEmail(e.target.value);
                            }}
                            placeholder="test@naver.com"
                            height={'4.5rem'}
                            label={'이메일'}
                            disabled={isEmailLocked}
                        />
                        {!isEmailLocked ? (
                            <Button
                                variant="primary"
                                size="full"
                                sx={css`
                                    height: 4.5rem;
                                    width: 11rem;
                                    margin-bottom: 0.1rem;
                                `}
                                onClick={openVerification}
                                loading={sendMutation.isPending}
                                disabled={sendMutation.isPending}
                            >
                                이메일 인증
                            </Button>
                        ) : (
                            <Button
                                variant="primary"
                                size="full"
                                sx={css`
                                    height: 4.5rem;
                                    width: 11rem;
                                    margin-bottom: 0.1rem;
                                `}
                                onClick={unlockEmail}
                            >
                                이메일 변경
                            </Button>
                        )}
                    </div>
                    <Input
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="홍길동"
                        height={'4.5rem'}
                        label={'이름'}
                    />
                    <PasswordInput
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="••••••"
                        height={'4.5rem'}
                        label={'비밀번호'}
                    />
                    <PasswordInput
                        value={passwordConfirm}
                        onChange={(e) => setPasswordConfirm(e.target.value)}
                        placeholder="••••••"
                        height={'4.5rem'}
                        label={'비밀번호확인'}
                    />
                </div>

                <div css={buttonContainer}>
                    <Button type="submit" variant="primary" size="full" loading={isPending}>
                        회원가입
                    </Button>
                    <Button
                        onClick={() => removeHistoryAndGo('/login')}
                        variant="transparent"
                        size="full"
                    >
                        이미 계정이 있으신가요?
                    </Button>
                </div>
                <ErrorDialog
                    open={errorDialogOpen}
                    handleClose={() => setErrorDialogOpen(false)}
                    errorStatusCode={500}
                />
            </div>

            <EmailVerificationDialog
                isOpen={verifyOpen}
                onClose={() => setVerifyOpen(false)}
                email={email}
                expiresAt={dialogExpiresAt}
                onVerify={async (code) => {
                    try {
                        await verifyMutation.mutateAsync({ email, code: Number(code) });
                        setVerifyCode(code);
                        lockEmail();
                        return true;
                    } catch {
                        return false;
                    }
                }}
                onResendCode={async () => {
                    try {
                        const { expiresAt } = await sendMutation.mutateAsync({ email });
                        setDialogExpiresAt(expiresAt);
                    } catch {
                        toast.error('코드 재전송에 실패했어요. 잠시 후 다시 시도해주세요.');
                    }
                }}
            />
        </form>
    );
}
export { RegisterPage };
