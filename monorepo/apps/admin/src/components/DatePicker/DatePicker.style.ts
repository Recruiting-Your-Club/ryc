import { css } from '@emotion/react';

import theme from '@ssoc/styles';

export const s_triggerButton = (selectedDate: string[]) => css`
    display: 'flex';
    align-items: center;
    justify-content: center;
    width: 100%;
    padding: 0.6rem 0.75rem;
    border-radius: 6px;
    border: 1px solid ${theme.colors.gray[200]};
    background: ${theme.colors.white};
    color: ${selectedDate.length === 0
        ? css`
              ${theme.colors.gray[600]}
          `
        : css`
              ${theme.colors.black}
          `};
`;
