import { css } from '@emotion/react';
import theme from '@styles/theme';

export const s_moverComponent = css`
    height: 100%;
    padding: 0.5rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 0.4rem;
`;

export const s_arrowButton = css`
    width: 5rem;
    height: 5rem;
    padding: 0;
`;

export const s_arrowSvg = css`
    width: 5rem;
    height: 5rem;
    color: ${theme.colors.black};
`;
