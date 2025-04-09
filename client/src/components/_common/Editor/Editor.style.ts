import { css } from '@emotion/react';
import theme from '@styles/theme';

export const rootContainer = css`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 1rem;
`;
export const toolbarContainer = (radius: string = '4px') => css`
    width: 100%;
    height: 30px;
    box-sizing: border-box;
    border: 1px solid ${theme.colors.black};
    border-radius: ${radius};
    padding: 2px 10px;
    background-color: ${theme.colors.gray[100]};
    display: flex;
    align-items: center;
    gap: 6px;

    @media screen and (max-width: 1024px) {
        // 태블릿 pc까지
        width: 100%;
    }
`;

export const buttonGroup = css`
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
    gap: 1.2px;
`;

export const perButtonCss = css`
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: transparent;
`;

export const svgCss = (isColor: boolean) => css`
    height: 60%;
    color: ${theme.colors.black};
    align-items: center;
    justify-content: center;
    ${isColor &&
    css`
        color: ${theme.colors.default};
    `}
`;

interface textareaContainerProps {
    height?: string;
    radius?: string;
    fontSize?: string;
    fontWeight?: string;
    fontStyle?: string;
    textDecoration?: string[];
}

export const textareaContainer = (height: string = '350px', radius: string = '4px') => css`
    width: 100%;
    height: ${height};
    resize: none;
    border: 1px solid ${theme.colors.gray[500]};
    border-radius: ${radius};
    padding: 8px;

    &:focus {
        border-color: ${theme.colors.black};
        outline: none;
    }
`;
