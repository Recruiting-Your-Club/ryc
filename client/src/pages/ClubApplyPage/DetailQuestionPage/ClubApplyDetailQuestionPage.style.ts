import { css } from '@emotion/react';
import theme from '@styles/theme';

export const clubApplyDetailQuestionContainer = css`
    display: flex;
    flex-direction: column;
    width: 100%;

    @media (max-width: ${theme.breakpoint.mobile}) {
        width: 100%;
    }
`;
export const textAreaSx = css`
    border: 1px solid ${theme.colors.gray[500]};
    transition: border-color 0.3s ease-in-out;
    ${theme.typography.captionRegular};
    &:focus-within {
        border: 1.5px solid ${theme.colors.default};
        outline: none;
    }
`;
