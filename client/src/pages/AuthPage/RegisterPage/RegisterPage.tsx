import React from 'react';
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

function RegisterPage() {
    const { removeHistoryAndGo } = useRouter();

    return (
        <div css={RegisterContainer}>
            <div css={RegisterBox}>
                <h1 css={titleContainer}>회원가입</h1>

                <div css={inputContainer}>
                    <div css={emailContainer}>
                        <Input placeholder="test@naver.com" height={'4.5rem'} label={'이메일'} />
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
                    <Input placeholder="홍길동" height={'4.5rem'} label={'이름'} />
                    <PasswordInput placeholder="••••••" height={'4.5rem'} label={'비밀번호'} />
                    <PasswordInput placeholder="••••••" height={'4.5rem'} label={'비밀번호확인'} />
                </div>

                <div css={buttonContainer}>
                    <Button variant="primary" size="full">
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
        </div>
    );
}
export { RegisterPage };
