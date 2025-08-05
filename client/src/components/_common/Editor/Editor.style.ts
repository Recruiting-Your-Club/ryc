import { DEFAULT_FONT_SIZE } from '@constants/editor';
import { css } from '@emotion/react';
import theme from '@styles/theme';
import { hexToRgb } from '@utils/hexToRgb';
import type { TextColor } from './types';

export const selectCss = css`
    width: 75px;
`;

export const sizeSelect = css`
    background-color: transparent;
    border: 1px solid transparent;
    border-radius: 0;
    height: 100%;

    &:focus {
        box-shadow: 0 0 0 0 transparent;
        border-color: transparent;
    }
`;

export const rootContainer = css`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 1rem;
    min-width: 50rem;
`;
export const toolbarContainer = (radius: string = '4px') => css`
    width: 100%;
    height: 40px;
    box-sizing: border-box;
    border: 1px solid ${theme.colors.black};
    border-radius: ${radius};
    padding: 2px 10px;
    background-color: ${theme.colors.gray[100]};
    display: flex;
    align-items: center;
    gap: 6px;
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

export const textColorSvgCss = (isColor: boolean, selectedColor?: string) => css`
    height: 60%;
    color: ${theme.colors.black};
    align-items: center;
    justify-content: center;

    ${selectedColor &&
    css`
        color: ${selectedColor};
    `}

    ${isColor &&
    css`
        color: ${theme.colors.default};
    `}
`;

export const textareaContainer = (height: string = '350px', radius: string = '4px') => css`
    width: 100%;
    height: ${height};
    overflow-y: auto;
    resize: none;
    background-color: ${theme.colors.white};
    border: 1px solid ${theme.colors.gray[500]};
    border-radius: ${radius};
    padding: 8px;
    ${theme.typography.bodyRegular}
    font-size: ${DEFAULT_FONT_SIZE};
    text-align: left;

    &:focus {
        border-color: ${theme.colors.black};
        outline: none;
    }

    img {
        max-width: 100%;
        height: auto;
    }
    h1 {
        display: block;
        font-size: 2em;
        margin-block-start: 0.67em;
        margin-block-end: 0.67em;
        margin-inline-start: 0px;
        margin-inline-end: 0px;
        font-weight: bold;
    }
    h2 {
        display: block;
        font-size: 1.5em;
        margin-block-start: 0.83em;
        margin-block-end: 0.83em;
        margin-inline-start: 0px;
        margin-inline-end: 0px;
        font-weight: bold;
    }
    h3 {
        display: block;
        font-size: 1.17em;
        margin-block-start: 1em;
        margin-block-end: 1em;
        margin-inline-start: 0px;
        margin-inline-end: 0px;
        font-weight: bold;
    }

    strong {
        font-weight: bolder;
    }

    /* 추가적으로 필요한 경우 */
    blockquote {
        margin: 1em 40px;
        font-style: italic;
        border-left: 4px solid #ccc;
        padding-left: 16px;
    }
`;

export const editorListStyle = css`
    ul,
    ol {
        list-style-position: outside;
        padding-left: 30px;
    }

    ul li,
    ol li {
        line-height: 30px;
    }

    ul li > div,
    ol li > div {
        display: block;
        margin: 0;
    }

    ul {
        list-style-type: disc;
    }

    ol {
        list-style-type: decimal;
    }
`;

export const textButtonContainer = css`
    position: relative;
    height: 100%;
`;

export const pickerContainer = css`
    position: absolute;
    top: 100%;
    left: 0;
    background-color: ${theme.colors.white};

    box-shadow: rgba(${hexToRgb(theme.colors.black)}, 0.2) 0 2px 8px;

    display: grid;
    grid-template-columns: repeat(7, 16px);

    padding: 8px;
    gap: 3px;
    margin-top: -3px;
    z-index: 30;
`;

export const perColorCss = (color: string, text: TextColor) => css`
    width: 16px;
    height: 16px;
    background-color: ${color};
    cursor: pointer;

    ${text === 'background' &&
    color === theme.colors.white &&
    css`
        background: linear-gradient(
            45deg,
            transparent 47%,
            ${theme.colors.red[800]} 50%,
            transparent 53%
        );
    `}

    &:hover {
        border: 1px solid ${theme.colors.black};
        box-shadow: inset 0 0 0 1px ${theme.colors.gray[200]};
    }
`;
