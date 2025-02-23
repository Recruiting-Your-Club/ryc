import React from 'react';
import { LoginContainer, LoginBox, inputContainer, buttonContainer, titleContainer } from './LoginPage.style';
import { Button, BaseInput, PasswordInput } from '@components';
import { css } from '@emotion/react';
import { colors } from '@styles/color';

function LoginPage() {
    return (
        <div css={LoginContainer}>
            <div css={LoginBox}>
                <h1 css={titleContainer}>로그인</h1>

                <div css={inputContainer}>
                    <BaseInput placeholder="이메일" height={'4.5rem'} />
                    <PasswordInput placeholder="비밀번호" height={'4.5rem'} />
                </div>

                <div css={buttonContainer}>
                    <Button variant="primary" size="full">
                        로그인
                    </Button>
                    <Button
                        variant="transparent"
                        size="full"
                        customCss={css`
                            :hover {
                                color: ${colors.defaultHover};
                            }
                        `}
                    >
                        회원가입
                    </Button>
                </div>
            </div>
        </div>
    );
}
export { LoginPage };
