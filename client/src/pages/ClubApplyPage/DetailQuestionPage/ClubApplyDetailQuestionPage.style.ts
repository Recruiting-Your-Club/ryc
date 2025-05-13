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
