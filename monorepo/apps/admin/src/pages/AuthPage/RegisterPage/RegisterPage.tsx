import { css } from '@emotion/react';
import { useRegister } from '@hooks/useRegister';
import type { FormEvent} from 'react';
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
    // state, ref, querystring hooks
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirm, setPasswordConfirm] = useState('');

    // form hooks
    // query hooks
    const { mutate: register, isPending, error } = useRegister();

    // calculated values
    // handlers
    const handleSubmit = (event: FormEvent) => {
        event.preventDefault();
        if (password !== passwordConfirm) {
            toast.error('비밀번호가 일치하지 않습니다.', {
                toastTheme: 'black',
                position: 'topCenter',
            });
            return;
        }
        register({ email, name, password });
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
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="test@naver.com"
                            height={'4.5rem'}
                            label={'이메일'}
                        />
                        <Button
                            variant="primary"
                            size="full"
                            sx={css`
                                height: 4.5rem;
                                width: 11rem;
                                margin-bottom: 0.1rem;
                            `}
                        >
                            중복확인
                        </Button>
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

                {error && <div>회원가입에 실패했습니다.</div>}

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
            </div>
        </form>
    );
}
export { RegisterPage };
