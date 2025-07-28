import { useLogin } from '@hooks/useLogin';
import type { FormEvent } from 'react';
import React, { useEffect, useState } from 'react';

import { useRouter } from '@ssoc/hooks';
import { Button, Input, PasswordInput } from '@ssoc/ui';

import {
    buttonContainer,
    inputContainer,
    LoginBox,
    LoginContainer,
    titleContainer,
} from './LoginPage.style';

function LoginPage() {
    // prop destruction
    // lib hooks
    const { removeHistoryAndGo } = useRouter();

    // initial values
    // state, ref, querystring hooks
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    // form hooks
    // query hooks
    const { mutate: login, isPending, error } = useLogin();

    // calculated values
    // handlers
    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        login({ email, password });
    };
    // effects

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
            </div>
        </form>
    );
}
export { LoginPage };
