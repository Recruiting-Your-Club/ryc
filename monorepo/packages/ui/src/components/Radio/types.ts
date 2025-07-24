import type { CSSObject } from '@emotion/react';
import type { HTMLAttributes } from 'react';

export type RadioSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
export type RadioOrientation = 'horizontal' | 'vertical';

export interface RadioOption {
    label?: string; // 실제로 보여질 옵션 값
    value?: string; // 서버에 넘겨질 옵션 값(직접 설정 가능)
}

export interface RadioProps {
    options?: RadioOption[];
    name?: string;
    value?: string;
    disabled?: boolean;
    orientation?: RadioOrientation;
    onChange?: (value: string) => void;
    sx?: CSSObject;
    size?: RadioSize;
}

export interface RadioItemProps extends HTMLAttributes<HTMLInputElement> {
    option?: string;
    checked?: boolean;
    disabled?: boolean;
    value?: string;
    name?: string;
    size?: RadioSize;
}
