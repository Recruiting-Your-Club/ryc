import { css, keyframes } from '@emotion/react';
import type { CSSObject } from '@emotion/react';

import theme from '@ssoc/styles';

import type { ToastPosition, ToastTheme, Type, TypeColor } from './type';

// colored일 때 테마에 따른 색상 추출
const getColorByTypeAtColoredTheme = (type: Type): string => {
    switch (type) {
        case 'error':
            return theme.colors.red[800];
        case 'success':
            return theme.colors.green[200];
        case 'info':
            return theme.colors.default;
        default:
            return theme.colors.white;
    }
};

// 토스트 테마에 따른 배경색 및 글자색 추출
const getToastBackgroundStyles = (type: Type, toastTheme: ToastTheme) => {
    switch (toastTheme) {
        case 'white':
            return css`
                background-color: ${theme.colors.white};
                color: ${theme.colors.black};
            `;
        case 'black':
            return css`
                background-color: ${theme.colors.black};
                color: ${theme.colors.white};
                ${type === 'default' && `color: ${theme.colors.white};`}
            `;
        case 'colored':
            return css`
                background-color: ${getColorByTypeAtColoredTheme(type)};
                color: ${theme.colors.white};
                ${type === 'default' && `color: ${theme.colors.black};`}
            `;
        default:
            return css`
                background-color: ${theme.colors.white};
                color: ${theme.colors.black};
            `;
    }
};

// 타입에 따른 svg 컬러 추출
const svgColor = (type: Type) => {
    switch (type) {
        case 'info':
            return css`
                stroke: ${theme.colors.blue[300]};
                fill: ${theme.colors.white};
                color: ${theme.colors.blue[300]};
            `;
        case 'success':
            return css`
                stroke: ${theme.colors.green[200]};
                fill: ${theme.colors.white};
                color: ${theme.colors.green[200]};
            `;
        case 'error':
            return css`
                stroke: ${theme.colors.red[800]};
                fill: ${theme.colors.white};
                color: ${theme.colors.red[800]};
            `;
        default:
            return css`
                color: ${theme.colors.black};
            `;
    }
};

const ToastType: Record<Type, TypeColor> = {
    info: {
        backgroundColor: theme.colors.blue[300],
        coloredBackgroundColor: theme.colors.blue[200],
    },
    success: {
        backgroundColor: theme.colors.green[200],
        coloredBackgroundColor: theme.colors.green[100],
    },
    error: {
        backgroundColor: theme.colors.red[800],
        coloredBackgroundColor: theme.colors.red[600],
    },
    default: {
        backgroundColor: theme.colors.white,
        coloredBackgroundColor: theme.colors.black,
    },
};

const progressBarColor = (toastTheme: ToastTheme, type: Type) => {
    if (toastTheme === 'colored') {
        return css`
            background-color: ${ToastType[type].coloredBackgroundColor};
        `;
    }
    if (toastTheme === 'black' && type === 'default') {
        return css`
            background-color: ${ToastType[type].backgroundColor};
        `;
    }
    if (toastTheme === 'white' && type === 'default') {
        return css`
            background-color: ${ToastType[type].coloredBackgroundColor};
        `;
    }
    return css`
        background-color: ${ToastType[type].backgroundColor};
    `;
};

const toastFadeIn = keyframes`
    from {
        opacity: 0;
        transform: translateY(2rem);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
`;

const toastFadeOut = keyframes`
    from {
        opacity: 1;
        transform: translateY(0);
    }
    to {
        opacity: 0;
        transform: translateY(-2rem);
    }
`;

const progressBarAnimation = keyframes`
    0% {
        width: 100%;
    }
    100% {
        width: 0%;
    }
`;

export const Container = css`
    position: fixed;
    padding: 0.4rem 0.4rem;
`;

export const ContainerPosition: Record<ToastPosition, CSSObject> = {
    topRight: {
        top: '2rem',
        right: '2rem',
    },
    topCenter: {
        top: '2rem',
        left: '50%',
        transform: 'translateX(-50%)',
    },
    topLeft: {
        top: '2rem',
        left: '2rem',
    },
    bottomRight: {
        bottom: '2rem',
        right: '2rem',
    },
    bottomCenter: {
        bottom: '2rem',
        left: '50%',
        transform: 'translateX(-50%)',
    },
    bottomLeft: {
        bottom: '2rem',
        left: '2rem',
    },
};

export const toastStyle = (status: string, toastTheme: ToastTheme, type: Type) => css`
    ${getToastBackgroundStyles(type, toastTheme)}
    ${theme.typography.bodySemibold}
    position: relative;
    display: flex;
    align-items: center;
    justify-content: start;
    padding: 1rem 1rem;
    gap: 0.5rem;
    margin-bottom: 1rem;
    border-radius: 5px;
    min-width: 30rem;
    min-height: 5rem;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    animation: ${status === 'entering' ? toastFadeIn : status === 'exiting' ? toastFadeOut : 'none'}
        1000ms ease forwards;
`;

export const svgStyle = (type: Type) => css`
    width: 2rem;
    height: 2rem;
    ${svgColor(type)}
`;

export const progressBarStyle = (toastTheme: ToastTheme, type: Type, duration: number) => css`
    position: absolute;
    bottom: 0;
    left: 0.1rem;
    border-radius: 0 0 0 7px;
    height: 0.3rem;
    width: 100%;
    ${progressBarColor(toastTheme, type)}
    animation: ${progressBarAnimation} ${duration}ms linear forwards;
`;
