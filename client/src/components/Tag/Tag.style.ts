import { css } from '@emotion/react';
import { colors } from '@styles/theme/colors';

const baseTag = css`
    display: inline-block;
    padding: 0.4rem 0.8rem;
    border-radius: 1rem;
    font-size: 1rem;
    font-weight: 700;
`;
export const tag = {
    primary: css`
        ${baseTag};
        background-color: ${colors.inputBorder};
        color: ${colors.textHelper};
    `,
    progress: css`
        ${baseTag};
        background-color: ${colors.default};
        color: ${colors.defaultHover};
    `,
    end: css`
        ${baseTag};
        background-color: ${colors.red[200]};
        color: ${colors.red[800]};
    `,
};
