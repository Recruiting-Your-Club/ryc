import type { CSSObject } from '@emotion/react';
import type { ReactNode } from 'react';

export type PositionType = 'start' | 'center' | 'end';
export type DialogSize = 'sm' | 'md' | 'lg' | 'xl' | 'full';
export type DialogType = 'text' | 'confirm' | 'warning';

export interface DialogProps {
    open: boolean;
    type?: DialogType; // 'text' 등이 포함될 수 있는 타입
    title?: string;
    content?: string;
    xIcon?: boolean;
    backdrop?: boolean;
    dialogSize?: DialogSize; // 'md' 등이 포함될 수 있는 타입
    closeIcon?: boolean;
    titlePosition?: PositionType; // 'start' 등이 포함될 수 있는 타입
    contentPosition?: PositionType; // 'center' 등이 포함될 수 있는 타입
    actionPosition?: PositionType; // 'end' 등이 포함될 수 있는 타입
    cancelButton?: boolean; // 오타로 보임, 'cancelButton'으로 수정 권장
    handleClose: () => void;
    actionHandler?: () => void;
}
