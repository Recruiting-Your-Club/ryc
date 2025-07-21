import { css } from '@emotion/react';
import theme from '@styles/theme';

export const s_boxContainer = (height: string = '100%') => css`
    height: ${height};
    border-radius: 10px;
    background-color: ${theme.colors.white};
    justify-content: center;
    align-items: center;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    padding: 0.5rem 1rem;
    box-shadow: 0px 0px 30px 0px rgba(0, 27, 55, 0.1);
    overflow: hidden;
    min-height: 20rem;
`;

export const s_titleSection = css`
    flex: 0.5;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 1rem;
`;

export const s_contentSection = css`
    flex: 9.5;
    width: 100%;
    min-height: 0;
`;

export const s_titleText = css`
    margin-left: 1rem;
`;

export const s_documentWrapper = css`
    height: 100%;
    display: flex;
    flex-direction: column;
    overflow-x: hidden;
    overflow-y: auto;
    padding: 0.5rem 2rem;
    gap: 2rem;
    align-items: center;

    &::after {
        content: '';
        height: 0.5rem;
        flex-shrink: 0;
    }
`;

export const s_personalDataWrapper = css`
    display: flex;
    border-radius: 10px;
    padding: 2rem;
    gap: 1.3rem;
    align-items: center;
`;

export const s_avatar = css`
    width: 10rem;
    height: 12rem;
`;

export const s_textGroup = css`
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
`;

export const s_textContainer = css`
    display: flex;
    gap: 1rem;
`;

export const s_labelText = css`
    width: 6rem;
`;

export const s_valueText = css`
    flex: 1;
`;

export const s_invisibleText = css`
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;
