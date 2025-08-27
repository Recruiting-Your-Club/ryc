import { css } from '@emotion/react';

import theme from '@ssoc/styles';

export const s_emailIconContainer = css`
    width: 4.8rem;
    height: 4.8rem;
    background-color: ${theme.colors.blue[100]};
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
`;

export const s_emailIcon = css`
    color: ${theme.colors.default};
`;
