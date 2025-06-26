import type { CSSObject } from '@emotion/react';
import type { PropsWithChildren, ReactNode } from 'react';
import type { CSSProperties } from 'react';
export type ToastPosition = 'topRight' | 'topCenter' | 'topLeft' | 'bottomRight' | 'bottomCenter' | 'bottomLeft';
export type ToastTheme = 'white' | 'black' | 'colored';
export type Type = 'info' | 'success' | 'error' | 'default';
export type Status = 'entering' | 'exiting';
export type ToastMethod = (content?: ReactNode, options?: ToastProps) => void;
export interface ToastType {
    (content?: ReactNode, options?: ToastProps): void;
    info: ToastMethod;
    success: ToastMethod;
    error: ToastMethod;
}
export interface ToastContainerProps extends PropsWithChildren {
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
    status?: Status;
    position?: ToastPosition;
    progressBar?: boolean;
    sx?: CSSObject;
}
export interface getToastAndPositionProps {
    getToastPosition: () => Record<ToastPosition, ToastProps[]>;
}
export interface TypeColor {
    backgroundColor?: CSSProperties['backgroundColor'];
    coloredBackgroundColor?: CSSProperties['backgroundColor'];
}
//# sourceMappingURL=type.d.ts.map