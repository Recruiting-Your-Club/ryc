import type { ReactNode } from 'react';
import type { CSSObject } from '@emotion/react';

export type ToastPosition =
    | 'topRight'
    | 'topCenter'
    | 'topLeft'
    | 'bottomRight'
    | 'bottomCenter'
    | 'bottomLeft';

export type Theme = 'light' | 'dark' | 'colored';
export type ToastType = 'info' | 'success' | 'error';

export interface ToastContainerProps {
    sx?: CSSObject;
    position?: ToastPosition;
    max?: number;
}

export interface ToastProps {
    id?: number;
    type?: ToastType;
    backgroundColor: string;
    content?: string;
    duration?: number;
    autoClose?: boolean;
    status?: string;
}
