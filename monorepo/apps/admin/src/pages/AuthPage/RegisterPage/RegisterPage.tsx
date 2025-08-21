import { userQueries } from '@api/queryFactory';
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
    // state, ref, querystring hooks
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirm, setPasswordConfirm] = useState('');

    // form hooks
    // query hooks
    const { mutate: register, isPending, error } = useRegister();
    const {
        data: isDuplicateEmail,
        isLoading: emailLoading,
        refetch: refetchEmail,
    } = useQuery(userQueries.checkDuplicateEmail(email));

    // calculated values
    // handlers
    const checkValidateEmail = async () => {
        if (email) {
            await refetchEmail();
        } else {
            toast.error('이메일을 입력해주세요.', {
                toastTheme: 'white',
            });
            return;
        }
        if (isDuplicateEmail) {
            toast.error('이미 존재하는 이메일이에요.', {
                toastTheme: 'white',
            });
            return;
        } else {
            toast.success('사용 가능한 이메일이에요.', {
                toastTheme: 'white',
            });
            return;
        }
    };
    const handleSubmit = (event: FormEvent) => {
        event.preventDefault();
        if (!isDuplicateEmail) {
            toast.error('이메일 중복확인을 해주세요.', {
                toastTheme: 'white',
            });
            return;
        }
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
                            onClick={checkValidateEmail}
                            loading={emailLoading}
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
