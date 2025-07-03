import { css } from '@emotion/react';

import theme from '@ssoc/styles';

export const LoginContainer = css`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
`;

export const LoginBox = css`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    width: 40rem;
    height: 35rem;
    border-radius: 1rem;
    padding: 0 4rem;
    padding-top: 2rem;
    padding-bottom: 1rem;
    box-shadow: 0.1rem 0.2rem 0.6rem rgba(0, 0, 0, 0.2);
`;

export const titleContainer = css`
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-grow: 0.2;
    ${theme.typography.h4Bold};
`;

export const inputContainer = css`
    display: flex;
    flex-direction: column;
    gap: 2rem;
    width: 100%;
`;
export const buttonContainer = css`
    display: flex;
    flex-direction: column;
    gap: 1rem;
    width: 100%;
`;
// 태블릿 (iPad 등) max-width: 768px
// 모바일 (스마트폰) max-width: 480px
