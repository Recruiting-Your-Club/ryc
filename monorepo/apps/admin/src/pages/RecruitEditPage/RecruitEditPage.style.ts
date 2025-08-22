import { css } from '@emotion/react';

import theme from '@ssoc/styles';

export const s_stepButtonContainer = css`
    display: flex;
    margin-top: 5rem;
    justify-content: space-between;
`;

export const s_recruitCreatePageContainer = css`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    padding: 5rem;
    align-items: center;
    overflow-y: auto;
`;

export const s_stepWrapper = css`
    width: 100%;
    max-width: 100rem;
    min-width: 60rem;
`;

export const s_stepComponent = css`
    margin-top: 3rem;
`;

export const s_prohibitDragArea = css`
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
`;

export const s_dialogContent = css`
    align-items: center;
    justify-content: center;
`;

export const s_dialogHeader = css`
    ${theme.typography.bodySemibold}
`;
