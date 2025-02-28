import { css } from '@emotion/react';

export const s_stepper = (orientation: string, alternativeLabel: boolean) => {
    return css`
        display: flex;
        flex-direction: ${orientation === 'vertical' ? 'column' : 'row'}
        align-items: ${alternativeLabel ? 'flex-start' : 'center'}
    `;
};
