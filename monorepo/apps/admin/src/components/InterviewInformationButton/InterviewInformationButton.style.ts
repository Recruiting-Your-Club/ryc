import { css } from '@emotion/react';

import theme from '@ssoc/styles';
import { hexToRgb } from '@ssoc/utils';

const fillButton = () => css`
    cursor: pointer;
    color: ${theme.colors.white};
    background-color: ${theme.colors.default};
    border: 0;
    box-shadow: 0 2px 8px rgba(${hexToRgb(theme.colors.black)}, 0.15);
`;
export const s_interviewInformationButton = (isSelected: boolean) => css`
    display: flex;
    background-color: ${theme.colors.white};
    border: 1px solid ${theme.colors.gray[300]};
    border-radius: 15px;
    align-items: center;
    justify-content: space-between;
    padding: 0.8rem 0.5rem 0.8rem 1rem;
    cursor: pointer;
    transition: all 0.3s ease;

    &:hover {
        color: ${theme.colors.default};
        border: 1px solid ${theme.colors.default};
        box-shadow: 0 2px 8px rgba(${hexToRgb(theme.colors.black)}, 0.15);
    }

    ${isSelected &&
    css`
        ${fillButton()};
        &:hover {
            color: ${theme.colors.white};
            border: 0;
        }
    `};
`;

export const s_interviewInformationTextContainer = css`
    display: flex;
    flex-direction: column;
    gap: 0.2rem;
`;

export const s_text = css`
    color: inherit;
`;

export const s_chevronRight = css`
    width: 3rem;
    height: 3rem;
`;
