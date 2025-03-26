import { css } from '@emotion/react';
import theme from '@styles/theme';

export const rootContainer = css`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 1rem;
`;
export const toolbarContainer = (width: string = '100%', radius: string = '4px') => css`
    width: ${width};
    box-sizing: border-box;
    aspect-ratio: 16 / 1;
    border: 0.0625rem solid ${theme.colors.black};
    border-radius: ${radius};
    padding: 0.3rem 0.3rem;
    background-color: ${theme.colors.gray[100]};

    @media screen and (max-width: 1024px) {
        // 태블릿 pc까지
        width: 100%;
    }
`;

export const textareaContainer = (
    width: string = '100%',
    height: string = '30rem',
    radius: string = '4px',
) => css`
    width: ${width};
    height: ${height};
    resize: none;
    border: 0.0625rem solid ${theme.colors.gray[500]};
    border-radius: ${radius};

    &:focus {
        border-color: ${theme.colors.black};
        outline: none;
    }
`;
