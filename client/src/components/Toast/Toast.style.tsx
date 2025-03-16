import { css, keyframes } from '@emotion/react';
import theme from '@styles/theme';
import type { CSSObject } from '@emotion/react';
import type { ToastPosition, ToastTheme } from './type';

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

export const ToastStyle = (status: string, toastTheme: ToastTheme) => css`
    display: flex;
    align-items: center;
    justify-content: start;
    background-color: ${toastTheme === 'dark' ? theme.colors.black : theme.colors.white};
    color: white;
    padding: 1rem 1.5rem;
    gap: 1rem;
    margin-bottom: 1rem;
    border-radius: 0.625rem;
    animation: ${status === 'entering' ? fadeIn : status === 'exiting' ? fadeOut : 'none'} 1000ms
        ease forwards;
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
