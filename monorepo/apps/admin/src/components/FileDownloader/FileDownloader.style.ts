import { css } from '@emotion/react';

import theme from '@ssoc/styles';

export const s_fileNameText = css`
    cursor: pointer;
    color: ${theme.colors.black};
    text-decoration: underline;
    &:hover {
        color: ${theme.colors.defaultHover};
    }
`;
