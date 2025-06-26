import { Button, Input } from '@components/_common';
import { PasswordInput } from '@components/PasswordInput';
import { css } from '@emotion/react';
import { useRouter } from '@hooks/useRouter';
import theme from '@styles/theme';
import React from 'react';

import {
    buttonContainer,
    inputContainer,
    LoginBox,
    LoginContainer,
    titleContainer,
} from './LoginPage.style';

function LoginPage() {
    const { removeHistoryAndGo } = useRouter();

    return (
        <div css={LoginContainer}>
            <div css={LoginBox}>
                <h1 css={titleContainer}>로그인</h1>

                <div css={inputContainer}>
                    <Input placeholder="이메일" height={'4.5rem'} />
                    <PasswordInput placeholder="비밀번호" height={'4.5rem'} />
                </div>

                <div css={buttonContainer}>
                    <Button variant="primary" size="full">
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
        </div>
    );
}
export { LoginPage };
