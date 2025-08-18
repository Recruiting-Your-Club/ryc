import { css } from '@emotion/react';
import React from 'react';

export const confirmDialogHeaderContainer = (dialogPosition: string, type: string) => css`
    ${dialogPosition === 'center' && type !== 'text' ? `margin-right: 2.5rem;` : ``}
    display: flex;
    align-items: center;
    gap: 0.5rem;
`;
