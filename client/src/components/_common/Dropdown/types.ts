import type { CSSObject } from '@emotion/react';
import type {
    HTMLAttributes,
    ReactNode,
    Ref,
    MouseEvent as ReactMouseEvent,
    ButtonHTMLAttributes,
} from 'react';

export interface DropdownProps {
    children: ReactNode; // 자식 노드
    onOpenChange?: (open: boolean) => void; //제어 방식 시 open 관리 함수
    defaultOpen?: boolean; //비제어 방식을 위한 상태
    open?: boolean; //외부 제어에 따른 open값
    sx?: CSSObject;
}

export interface DropdownContentProps extends HTMLAttributes<HTMLDivElement> {
    children: ReactNode;
    offsetX?: number;
    offsetY?: number;
    sx?: CSSObject;
    forwardedRef?: Ref<HTMLDivElement>;
}

export interface DropdownGruopProps extends HTMLAttributes<HTMLDivElement> {
    children: ReactNode;
    sx?: CSSObject;
}

export interface DropdownItemProps extends HTMLAttributes<HTMLDivElement> {
    children: ReactNode;
    disabled?: boolean;
    inset?: boolean;
    onItemSelect?: (e: ReactMouseEvent<HTMLDivElement>) => void;
    sx?: CSSObject;
}

export interface DropdownLabelProps extends HTMLAttributes<HTMLLabelElement> {
    children: ReactNode;
    inset?: boolean;
    sx?: CSSObject;
}

export interface DropdownSeperatorProps extends HTMLAttributes<HTMLDivElement> {
    sx?: CSSObject;
}

export interface DropdownSubProps {
    children: ReactNode;
    onOpenChange?: (open: boolean) => void;
    defaultOpen?: boolean;
    open?: boolean;
}

export interface DropdownSubContentProps extends HTMLAttributes<HTMLDivElement> {
    children: ReactNode;
    align?: DropdownAlign;
    sx?: CSSObject;
    forwardedRef?: Ref<HTMLDivElement>;
}

export interface DropdownSubTriggerProps extends HTMLAttributes<HTMLDivElement> {
    children: ReactNode;
    disabled?: boolean;
    inset?: boolean;
    sx?: CSSObject;
    forwardedRef?: Ref<HTMLDivElement>;
}

export interface DropdownTriggerProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    children: ReactNode;
    asChild?: boolean;
    sx?: CSSObject;
    forwardedRef?: Ref<HTMLButtonElement>;
}

type DropdownAlign = 'top' | 'center' | 'bottom';
