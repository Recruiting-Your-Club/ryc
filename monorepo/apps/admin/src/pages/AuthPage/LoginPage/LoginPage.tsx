import { ErrorDialog } from '@components';
import { useLogin } from '@hooks/useLogin';
import type { FormEvent } from 'react';
import React, { useCallback, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

import { useRouter } from '@ssoc/hooks';
import { Button, Input, PasswordInput, useToast } from '@ssoc/ui';

import {
    buttonContainer,
    inputContainer,
    LoginBox,
    LoginContainer,
    titleContainer,
} from './LoginPage.style';

interface LocationState {
    from?: string;
}

function LoginPage() {
    // prop destruction
    // lib hooks
    const { removeHistoryAndGo } = useRouter();
    const location = useLocation();
    const state = location.state as LocationState | null;
    const { toast } = useToast();

    // initial values
    // state, ref, querystring hooks
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorDialogOpen, setErrorDialogOpen] = useState<boolean>(false);

    // form hooks
    // query hooks
    const {
        mutate: login,
        isPending,
        error,
    } = useLogin(setErrorDialogOpen, {
        redirectPath: state?.from,
    });

    // calculated values
    const fromLogout = useCallback(() => {
        const urlParams = new URLSearchParams(location.search);
        const reason = urlParams.get('reason');
        if (reason === 'MANUAL') {
            toast.success('로그아웃되었습니다.');
        }
    }, []);

    // handlers
    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        login({ email, password });
    };

    // effects
    useEffect(() => {
        fromLogout();
    }, []);

    return (
        <form css={LoginContainer} onSubmit={handleSubmit}>
            <div css={LoginBox}>
                <h1 css={titleContainer}>로그인</h1>

                <div css={inputContainer}>
                    <Input
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="이메일"
                        height={'4.5rem'}
                    />
                    <PasswordInput
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="비밀번호"
                        height={'4.5rem'}
                    />
                </div>

                <div css={buttonContainer}>
                    <Button variant="primary" size="full" type="submit" loading={isPending}>
                        로그인
                    </Button>
                    <Button
                        onClick={() => removeHistoryAndGo('/register')}
                        variant="transparent"
                        size="full"
                    >
                        계정이 없으신가요?
                    </Button>
                </div>
                <ErrorDialog
                    open={errorDialogOpen}
                    handleClose={() => setErrorDialogOpen(false)}
                    errorStatusCode={500}
                />
            </div>
        </form>
    );
}
export { LoginPage };
