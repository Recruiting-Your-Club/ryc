import React, { FormEvent, useState } from 'react';
import {
    LoginContainer,
    LoginBox,
    inputContainer,
    buttonContainer,
    titleContainer,
} from './LoginPage.style';
import { Input, Button } from '@components/_common';
import { PasswordInput } from '@components/PasswordInput';
import { css } from '@emotion/react';
import theme from '@styles/theme';
import { useRouter } from '@hooks/useRouter';
import { useLogin } from '@hooks/useLogin';

function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const {mutate: login, isPending, error} = useLogin();
    const { removeHistoryAndGo } = useRouter();

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        login({email, password})
    }

    return (
        <form css={LoginContainer} onSubmit={handleSubmit}>
            <div css={LoginBox}>
                <h1 css={titleContainer}>로그인</h1>

                <div css={inputContainer}>
                    <Input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="이메일" height={'4.5rem'} />
                    <PasswordInput value={password} onChange={(e) => setPassword(e.target.value)} placeholder="비밀번호" height={'4.5rem'} />
                </div>

                {error && (
                    <div>로그인 실패</div>
                )}

                <div css={buttonContainer}>
                    <Button variant="primary" size="full" type='submit'>
                        {isPending ? '로딩 중...' : '로그인'}
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
