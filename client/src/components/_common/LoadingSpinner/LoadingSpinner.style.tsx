import { keyframes } from '@emotion/react';
import { css } from '@emotion/react';
import type { LoadingProps, SpinnerProps, Size } from './LoadingSpinner';
import type { CSSObject } from '@emotion/react';

const loading_pulse = keyframes`
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
const loading_spin = keyframes`
    0%{
        transform: rotate(0deg);
    }
    100%{
        transform: rotate(360deg);
    }
`;

const spinnerSize: Record<Size, CSSObject['px']> = {
    xs: '30px',
    s: '40px',
    md: '50px',
    lg: '60px',
    xl: '70px',
};
const pulseSize: Record<Size, CSSObject['px']> = {
    xs: '8px',
    s: '12px',
    md: '16px',
    lg: '20px',
    xl: '24px',
};

const borderSize = (size: Size) => {
    switch (size) {
        case 'xs':
            return '4px';
        case 's':
            return '4px';
        case 'md':
            return '6px';
        case 'lg':
            return '8px';
        case 'xl':
            return '10px';
    }
};

const loadingSpinnerSize = (size: Size) => {
    return spinnerSize[size];
};

const pulseSpinnerSize = (size: Size) => {
    return pulseSize[size];
};
export const spinSpinnerContainer = (props: SpinnerProps) => css`
    border: ${borderSize(props.size!)} solid ${props.backgroundColor};
    border-top: ${borderSize(props.size!)} solid ${props.color};
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    width: ${loadingSpinnerSize(props.size!)};
    height: ${loadingSpinnerSize(props.size!)};
    animation: ${loading_spin} 1s linear infinite;
`;

export const loadingSpinnerContainer = css`
    display: flex;
    gap: 5px;
`;

export const pulseContainer = (delay: number, props: LoadingProps) => css`
    animation: ${loading_pulse} 1s ease-in-out infinite;
    animation-delay: ${delay}s;
    width: ${pulseSpinnerSize(props.size!)};
    height: ${pulseSpinnerSize(props.size!)};
    border-radius: 50%;
    background-color: ${props.color};
`;
