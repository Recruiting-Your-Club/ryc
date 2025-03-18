import { css, keyframes } from '@emotion/react';
import theme from '@styles/theme';
import type { CSSObject } from '@emotion/react';
import type { ToastPosition, ToastTheme, Type } from './type';

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
export const labelStyle = (error: boolean) => css`
    ${theme.typography.bodySemibold}
    color: ${error ? theme.colors.red[800] : theme.colors.black};
    padding-left: 0.2rem;
`;

const getColorByType = (type: Type): string => {
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

const getToastBackgroundStyles = (type: Type, toastTheme: ToastTheme): string => {
    switch (toastTheme) {
        case 'white':
            return `
                background-color: ${theme.colors.white};
                color: ${theme.colors.black};
            `;
        case 'dark':
            return `
                background-color: ${theme.colors.black};
                color: ${theme.colors.white};
            `;
        case 'colored':
            return `
                background-color: ${getColorByType(type)};
                color: ${theme.colors.white};
            `;
        default:
            return `
                background-color: ${theme.colors.white};
                color: ${theme.colors.black};
            `;
    }
};

export const toastStyle = (status: string, toastTheme: ToastTheme, type: Type) => css`
    ${getToastBackgroundStyles(type, toastTheme)}
    ${theme.typography.bodySemibold}
    display: flex;
    align-items: center;
    justify-content: start;
    padding: 1rem 1rem;
    gap: 0.5rem;
    margin-bottom: 1rem;
    border-radius: 0.625rem;
    min-width: 30rem;
    min-height: 5rem;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    animation: ${status === 'entering' ? fadeIn : status === 'exiting' ? fadeOut : 'none'} 1000ms
        ease forwards;
`;

const svgColor = (type: Type) => {
    switch (type) {
        case 'info':
            return `
                stroke: ${theme.colors.blue[300]};
                fill: ${theme.colors.white};
                color: ${theme.colors.blue[300]};
            `;
        case 'success':
            return `
                stroke: ${theme.colors.green[200]};
                fill: ${theme.colors.white};
                color: ${theme.colors.green[200]};
            `;
        case 'error':
            return `
                stroke: ${theme.colors.red[800]};
                fill: ${theme.colors.white};
                color: ${theme.colors.red[800]};
            `;
        default:
            return `
                color: ${theme.colors.black};
        `;
    }
};

export const svgStyle = (type: Type) => css`
    width: 2rem;
    height: 2rem;
    ${svgColor(type)}
`;

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(2rem);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const fadeOut = keyframes`
  from {
    opacity: 1;
    transform: translateY(0);
  }
  to {
    opacity: 0;
    transform: translateY(-2rem);
  }
`;
