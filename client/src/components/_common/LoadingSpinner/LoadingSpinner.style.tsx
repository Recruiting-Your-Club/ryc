import { keyframes } from '@emotion/react';
import { css } from '@emotion/react';
import type { LoadingProps, SpinnerProps } from './LoadingSpinner';

const pulse = keyframes`
    0%{
        transform: scale(0.2);
    }
    50%{
        transform: scale(1);
    }
    100%{
        transform: scale(0.4);
    }
`;
const spin = keyframes`
    0%{
        transform: rotate(0deg);
    }
    100%{
        transform: rotate(360deg);
    }
`;

export const spinSpinnerContainer = (props: SpinnerProps) => css`
    border: 4px solid ${props.backgroundColor};
    border-radius: 50%;
    border-top: 4px solid ${props.color};
    display: flex;
    justify-content: center;
    align-items: center;
    width: ${props.size}px;
    height: ${props.size}px;
    animation: ${spin} 1s linear infinite;
`;

export const loadingSpinnerContainer = css`
    display: flex;
    gap: 5px;
`;

export const dotContainer = (delay: number, props: LoadingProps) => css`
    animation: ${pulse} 1s ease-in-out infinite;
    animation-delay: ${delay}s;
    width: ${props.size}px;
    height: ${props.size}px;
    border-radius: 50%;
    background-color: ${props.color};
`;
