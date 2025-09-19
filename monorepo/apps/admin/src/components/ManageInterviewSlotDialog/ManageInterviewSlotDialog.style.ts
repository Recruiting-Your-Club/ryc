import { css } from '@emotion/react';

import theme from '@ssoc/styles';
import { hexToRgb } from '@ssoc/utils';

export const s_perInformationContainer = css`
    display: flex;
    flex-direction: column;
    /* border: 1px solid ${theme.colors.gray[200]}; */
    /* border-radius: 8px; */
    width: 38rem;
    padding: 1rem 1.5rem 1.5rem 1.5rem;
    gap: 1rem;
`;

export const s_buttonGrid = css`
    display: grid;
    grid-template-columns: repeat(3, 1fr); // 가로 3개
    grid-gap: 0.5rem; // 버튼 간격
`;

export const s_contentText = css`
    margin: 0 0 1rem 0;
`;

export const s_numberButton = (isSelected: boolean) => css`
    height: 3.8rem;
    ${isSelected &&
    css`
        background-color: rgba(${hexToRgb(theme.colors.default)}, 0.1);
        color: ${theme.colors.default};
        border-color: ${theme.colors.default};
    `};
`;

export const s_dialogContent = css`
    padding: 0;
`;
