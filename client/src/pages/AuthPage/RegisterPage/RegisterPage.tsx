import React, { FormEvent, useState } from 'react';
import {
    RegisterContainer,
    RegisterBox,
    titleContainer,
    inputContainer,
    buttonContainer,
    emailContainer,
} from './RegisterPage.style';
import { Input, Button } from '@components/_common';
import { PasswordInput } from '@components/PasswordInput';
import { css } from '@emotion/react';
import { useRouter } from '@hooks/useRouter';
import { useRegister } from '@hooks/useRegister';
import { useToast } from '@hooks/useToast';

function RegisterPage() {
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirm, setPasswordConfirm] = useState('');
    const {mutate: register, isPending, error} = useRegister();
    const {toast} = useToast();
    const { removeHistoryAndGo } = useRouter();

    const handleSubmit = (event: FormEvent) => {
        event.preventDefault();
        if(password !== passwordConfirm){
            toast.error('비밀번호가 일치하지 않습니다.', {
                toastTheme: 'black',
                position: 'topCenter',
            });
            return;
        }
        register({email, name, password});
    }

    return (
        <form css={RegisterContainer} onSubmit={handleSubmit}>
            <div css={RegisterBox}>
                <h1 css={titleContainer}>회원가입</h1>

                <div css={inputContainer}>
                    <div css={emailContainer}>
                        <Input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="test@naver.com" height={'4.5rem'} label={'이메일'} />
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
                    <Input value={name} onChange={(e) => setName(e.target.value)} placeholder="홍길동" height={'4.5rem'} label={'이름'} />
                    <PasswordInput value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••" height={'4.5rem'} label={'비밀번호'} />
                    <PasswordInput value={passwordConfirm} onChange={(e) => setPasswordConfirm(e.target.value)} placeholder="••••••" height={'4.5rem'} label={'비밀번호확인'} />
                </div>

                {error && (
                    <div>회원가입에 실패했습니다.</div>
                )}

                <div css={buttonContainer}>
                    <Button type='submit' variant="primary" size="full">
                        {isPending ? '로딩 중...' : '회원가입'}
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
