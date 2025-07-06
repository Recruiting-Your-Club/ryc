import { css } from '@emotion/react';
import theme from '@styles/theme';
import { hexToRgb } from '@utils/hexToRgb';
export const s_interviewInformationButton = css`
    display: flex;
    background-color: ${theme.colors.white};
    border: 1px solid ${theme.colors.gray[300]};
    border-radius: 15px;
    align-items: center;
    justify-content: space-between;
    padding: 0.8rem 0.5rem 0.8rem 1rem;
    transition: all 0.3s ease;
    &:hover {
        cursor: pointer;
        color: ${theme.colors.white};
        background-color: ${theme.colors.default};
        border: 0;
        box-shadow: 0 2px 8px rgba(${hexToRgb(theme.colors.black)}, 0.15);
    }
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
