import type { CSSObject } from '@emotion/react';
import type {
    ButtonHTMLAttributes,
    Dispatch,
    HTMLAttributes,
    ReactNode,
    RefObject,
    SetStateAction,
} from 'react';

export type SelectSize = 'xs' | 's' | 'md' | 'lg' | 'xl' | 'full';
export interface Option {
    value: string;
    label: string;
}

export interface SelectProps {
    children: ReactNode;
    value?: string;
    size?: SelectSize;
    onValueChange?: (value: string) => void;
    sx?: CSSObject;
    options?: Option[];
}

export interface SelectContentProps extends HTMLAttributes<HTMLDivElement> {
    children: ReactNode;
    sx?: CSSObject;
}

export interface SelectContextType {
    open: boolean; //Select가 열려있는지 여부
    setOpen: Dispatch<SetStateAction<boolean>>; //열림/닫힘을 관리하는 함수
    value: string; // 현재 선택된 값
    setValue: (value: string) => void; //값 변경 함수
    label: string; //현재 선택된 라벨 (value에 따른 UI 값)
    setLabel: Dispatch<SetStateAction<string>>; //라벨 변경 함수
    triggerRef: RefObject<HTMLButtonElement>; // Select.Trigger의 Ref
    contentRef: RefObject<HTMLDivElement>; // Select.Content의 Refa
}

export interface SelectGroupProps extends HTMLAttributes<HTMLDivElement> {
    children: ReactNode;
    sx?: CSSObject;
}

export interface SelectItemProps extends HTMLAttributes<HTMLDivElement> {
    children: ReactNode;
    value: string;
    disabled?: boolean;
    highlight?: boolean;
    sx?: CSSObject;
}

export interface SelectLabelProps extends HTMLAttributes<HTMLLabelElement> {
    children: ReactNode;
    sx?: CSSObject;
}

export interface SelectTriggerProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    children: ReactNode;
    sx?: CSSObject;
}

export interface SelectValueProps {
    placeholder?: string;
    sx?: CSSObject;
}
