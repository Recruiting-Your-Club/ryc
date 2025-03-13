import { css, keyframes } from '@emotion/react';
import theme from '@styles/theme';
import type { CSSObject } from '@emotion/react';
import type { ToastPosition } from './type';

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

export const ToastStyle = (status: string) => css`
    display: flex;
    align-items: center;
    justify-content: start;
    background-color: ${theme.colors.blue[100]};
    padding: 1rem 2rem;
    gap: 1rem;
    margin-bottom: 1rem;
    border-radius: 0.8rem;
    animation: ${status === 'entering' ? fadeIn : status === 'exiting' ? fadeOut : 'none'} 300ms
        ease forwards;
    //animation: bounce-in-right 1s ease-in-out;
    @keyframes bounce-in-right {
        0% {
            transform: translateX(60rem);
            animation-timing-function: ease-in;
            opacity: 0;
        }
        38% {
            transform: translateX(0);
            animation-timing-function: ease-out;
            opacity: 1;
        }
        55% {
            transform: translateX(6.8rem);
            animation-timing-function: ease-in;
        }
        72% {
            transform: translateX(0);
            animation-timing-function: ease-out;
        }
        81% {
            transform: translateX(3.2rem);
            animation-timing-function: ease-in;
        }
        90% {
            transform: translateX(0);
            animation-timing-function: ease-out;
        }
        95% {
            transform: translateX(1rem);
            animation-timing-function: ease-in;
        }
        100% {
            transform: translateX(0);
            animation-timing-function: ease-out;
        }
    }
`;

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
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
    transform: translateY(-20px);
  }
`;
