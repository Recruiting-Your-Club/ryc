import { css } from '@emotion/react';
import { keyframes } from '@emotion/react';

const contentFadeIn = keyframes`
    from {
        opacity: 0.5;
        transform: translateY(2rem);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
`;

export const outletWrapper = css`
    animation: ${contentFadeIn} 0.3s ease-in-out;
    width: 100%;
    height: 100%;
    overflow-y: auto;
`;
