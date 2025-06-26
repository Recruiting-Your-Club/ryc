import { keyframes } from '@emotion/react';
import { css } from '@emotion/react';
const loading_pulse = keyframes `
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
const loading_spin = keyframes `
    0%{
        transform: rotate(0deg);
    }
    100%{
        transform: rotate(360deg);
    }
`;
const spinnerSize = {
    xs: '30px',
    s: '40px',
    md: '50px',
    lg: '60px',
    xl: '80px',
};
const pulseSize = {
    xs: '8px',
    s: '12px',
    md: '16px',
    lg: '20px',
    xl: '24px',
};
const borderSize = (size) => {
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
const loadingSpinnerSize = (size) => {
    return spinnerSize[size];
};
const pulseSpinnerSize = (size) => {
    return pulseSize[size];
};
export const spinSpinnerContainer = (props) => css `
    border: ${borderSize(props.size)} solid ${props.backgroundColor};
    border-top: ${borderSize(props.size)} solid ${props.color};
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    width: ${loadingSpinnerSize(props.size)};
    height: ${loadingSpinnerSize(props.size)};
    animation: ${loading_spin} 1s linear infinite;
`;
export const loadingSpinnerContainer = css `
    display: flex;
    gap: 5px;
`;
export const pulseContainer = (delay, props) => css `
    animation: ${loading_pulse} 1s ease-in-out infinite;
    animation-delay: ${delay}s;
    width: ${pulseSpinnerSize(props.size)};
    height: ${pulseSpinnerSize(props.size)};
    border-radius: 50%;
    background-color: ${props.color};
`;
//# sourceMappingURL=LoadingSpinner.style.js.map