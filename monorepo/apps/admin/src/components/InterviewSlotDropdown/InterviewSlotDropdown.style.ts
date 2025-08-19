import { css } from '@emotion/react';

import theme from '@ssoc/styles';

export const s_selectionButton = css`
    border-color: ${theme.colors.gray[300]};
    border-radius: 20px;
    padding: 0 1.5rem;
    width: 12.5rem;
    height: 2.8rem;
    ${theme.typography.captionRegular}
`;

export const s_buttonGroup = css`
    height: 22rem;
`;
