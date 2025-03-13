import type { ButtonHTMLAttributes, HTMLAttributes, KeyboardEvent, ReactNode, Ref } from 'react';
import React, { forwardRef, useEffect, useMemo, useRef, useState } from 'react';
import { SelectContext, useSelectContext } from './SelectContext';
import type { CSSObject } from '@emotion/react';
import { s_select, s_selectContent, s_selectItem, s_selectTrigger, s_size } from './Select.styles';
import DownArrow from '@assets/images/downArrow.svg';
import Check from '@assets/images/select_check.svg';

export type SelectSize = 'xs' | 's' | 'md' | 'lg' | 'xl' | 'full';

/**
 * Select 루트 컴포넌트
 */
interface SelectProps {
    children: ReactNode;
    value: string;
    size?: SelectSize;
    onValueChange: (value: string) => void;
    sx?: CSSObject;
}

function Select({ children, value, onValueChange, size = 'md', sx }: SelectProps) {
    const [open, setOpen] = useState(false);
    const [label, setLabel] = useState('');
    const triggerRef = useRef<HTMLButtonElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);

    const setValue = (newValue: string) => {
        onValueChange(newValue);
    };

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                contentRef.current &&
                triggerRef.current &&
                !contentRef.current.contains(event.target as Node) &&
                !triggerRef.current.contains(event.target as Node)
            ) {
                setOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <SelectContext.Provider
            value={{ open, setOpen, value, setValue, label, setLabel, triggerRef, contentRef }}
        >
            <div css={[s_size(size), s_select, sx]}>{children}</div>
        </SelectContext.Provider>
    );
}

/**
 * SelectTrigger 컴포넌트
 */
interface SelectTriggerProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    children: ReactNode;
    sx?: CSSObject;
}

function SelectTriggerFunction(
    { children, sx, ...props }: SelectTriggerProps,
    forwardedRef: Ref<HTMLButtonElement>,
) {
    const { open, setOpen, triggerRef } = useSelectContext();

    const ref = useMemo(
        () => (forwardedRef ? forwardedRef : triggerRef),
        [forwardedRef, triggerRef],
    );

    return (
        <button
            css={[s_selectTrigger, sx]}
            type="button"
            ref={ref}
            onClick={() => setOpen(!open)}
            {...props}
        >
            {children}
            <DownArrow />
        </button>
    );
}

//forwardRef 적용을 위해 HOC 적용
const SelectTrigger = forwardRef(SelectTriggerFunction);

/**
 * SelectValue 컴포넌트
 */
interface SelectValueProps {
    placeholder?: string;
    sx?: CSSObject;
}

function SelectValue({ placeholder, sx }: SelectValueProps) {
    const { value, label } = useSelectContext();

    return <span css={sx}>{value ? label : (placeholder ?? <span>{placeholder}</span>)}</span>;
}

/**
 * SelectContent 컴포넌트
 */
interface SelectContentProps extends HTMLAttributes<HTMLDivElement> {
    children: ReactNode;
    sx?: CSSObject;
}

function SelectContentFunction(
    { children, sx, ...props }: SelectContentProps,
    forwardedRef: Ref<HTMLDivElement>,
) {
    const { open, contentRef } = useSelectContext();

    const ref = useMemo(
        () => (forwardedRef ? forwardedRef : contentRef),
        [forwardedRef, contentRef],
    );

    return (
        <div role="listbox" ref={ref} css={[s_selectContent(open), sx]} {...props}>
            {children}
        </div>
    );
}

const SelectContent = forwardRef(SelectContentFunction);

/**
 * SelectItem 컴포넌트
 */
interface SelectItemProps extends HTMLAttributes<HTMLDivElement> {
    children: ReactNode;
    value: string;
    disabled?: boolean;
    sx?: CSSObject;
}

function SelectItemFunction({
    children,
    value: itemValue,
    disabled = false,
    sx,
    ...props
}: SelectItemProps) {
    const { value, setValue, setOpen, setLabel } = useSelectContext();
    const isSelected = value === itemValue;
    const [isHighlighted, setIsHighlighted] = useState(false);

    const handleSelect = () => {
        if (!disabled) {
            setValue(itemValue);
            setLabel(typeof children === 'string' ? children : ''); //item의 children이 Node일 경우 저장X
            setOpen(false);
        }
    };

    //div에 onClick 달려면 필요
    const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
        if (!disabled && (event.key === 'Enter' || event.key === ' ')) {
            handleSelect();
        }
    };

    return (
        <div
            role="option"
            aria-selected={isSelected}
            onMouseEnter={() => setIsHighlighted(true)}
            onMouseLeave={() => setIsHighlighted(false)}
            onClick={handleSelect}
            onKeyDown={handleKeyDown}
            tabIndex={0}
            css={[s_selectItem(isHighlighted, isSelected), sx]}
            {...props}
        >
            {children}
            {isSelected && (
                <span>
                    <Check size={16} />
                </span>
            )}
        </div>
    );
}

/**
 * SelectLabel 컴포넌트
 */
interface SelectLabelProps extends HTMLAttributes<HTMLDivElement> {
    children: ReactNode;
    sx?: CSSObject;
}

function SelectLabel({ children, ...props }: SelectLabelProps) {
    return <div {...props}>{children}</div>;
}

/**
 * SelectGroup 컴포넌트
 */
interface SelectGroupProps extends HTMLAttributes<HTMLDivElement> {
    children: ReactNode;
    sx?: CSSObject;
}

function SelectGroup({ children, ...props }: SelectGroupProps) {
    return (
        <div role="group" {...props}>
            {children}
        </div>
    );
}

function SelectSeparator(props: HTMLAttributes<HTMLDivElement>) {
    <div role="separator" {...props}></div>;
}

export { Select, SelectTrigger, SelectValue };
