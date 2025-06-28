import type { CSSObject } from '@emotion/react';
import type { ReactNode } from 'react';

export type PositionType = 'start' | 'center' | 'end';
export type DialogSize = 'sm' | 'md' | 'lg' | 'xl' | 'full';
export type DialogType = 'text' | 'confirm' | 'warning';

export interface DialogHeaderProps {
    position?: PositionType;
    border?: boolean;
    children: ReactNode;
    sx?: CSSObject;
    handleClose?: () => void;
    closeIcon?: boolean;
}
export interface DialogContentProps {
    children?: ReactNode;
    sx?: CSSObject;
}
export interface DialogActionProps {
    children?: ReactNode;
    sx?: CSSObject;
    border?: boolean;
    position?: PositionType;
}

export interface Size extends CSSObject {
    width?: CSSObject['width'];
    height?: CSSObject['height'];
}

export interface BaseDialogProps {
    children?: React.ReactNode;
    open?: boolean;
    backdrop?: boolean;
    size?: DialogSize;
    sx?: CSSObject;
    handleClose?: () => void;
}
