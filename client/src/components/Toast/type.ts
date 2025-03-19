import type { ReactNode } from 'react';
import type { CSSObject } from '@emotion/react';

export type ToastPosition =
    | 'topRight'
    | 'topCenter'
    | 'topLeft'
    | 'bottomRight'
    | 'bottomCenter'
    | 'bottomLeft';

export type ToastTheme = 'white' | 'black' | 'colored';
export type Type = 'info' | 'success' | 'error' | 'default';

export type ToastMethod = (
    content?: ReactNode,
    options?: ToastProps,
    containerOptions?: ToastContainerProps,
) => void;

export interface ToastType {
    (content?: ReactNode, options?: ToastProps, containerOptions?: ToastContainerProps): void;
    info: ToastMethod;
    success: ToastMethod;
    error: ToastMethod;
}

export interface ToastContainerProps {
    sx?: CSSObject;
    limit?: number;
}

export interface ToastProps {
    id?: number;
    type?: Type;
    toastTheme?: ToastTheme;
    content?: ReactNode;
    duration?: number;
    autoClose?: boolean;
    status?: string;
    position?: ToastPosition;
    progressBar?: boolean;
    sx?: CSSObject;
}
export interface getToastAndPositionProps {
    getToastPosition: () => Record<ToastPosition, ToastProps[]>;
}
