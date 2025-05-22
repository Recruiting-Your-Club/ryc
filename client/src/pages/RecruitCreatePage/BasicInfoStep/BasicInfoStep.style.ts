import { css } from '@emotion/react';
import theme from '@styles/theme';

export const s_noticeBox = css`
    width: 60%;
    border: 1px solid ${theme.colors.gray[300]};
    padding: 1rem;
    padding-left: 2rem;
    border-radius: 6px;
    ${theme.typography.captionRegular};
    margin: 1rem 0rem;
`;

export const s_textHighlight = css`
    color: ${theme.colors.default};
    ${theme.typography.captionSemibold};
`;

export const s_checkboxWrapper = css`
    width: 60%;
    align-items: center;
    display: flex;
    justify-content: space-between;
    border: 1px solid ${theme.colors.gray[300]};
    border-radius: 6px;
    padding: 3rem 2rem;
`;

export const s_checkboxLabel = css`
    margin-left: 0.5rem;
`;

export const s_additionalInfoWrapper = css`
    margin-top: 3rem;
`;
