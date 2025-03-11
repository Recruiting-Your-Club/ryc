import type {
    ButtonHTMLAttributes,
    ReactNode,
    Ref} from 'react';
import React, {
    useEffect,
    useMemo,
    useRef,
    useState,
} from 'react';
import { SelectContext, useSelectContext } from './SelectContext';
import type { CSSObject } from '@emotion/react';
import { s_select, s_size } from './Select.styles';
import { DownArrow } from '@assets/images/downArrow.svg';

export type SelectSize = 'xs' | 's' | 'md' | 'lg' | 'xl' | 'full';

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

interface SelectTriggerProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    children: ReactNode;
}

function SelectTrigger(
    { children, ...props }: SelectTriggerProps,
    forwardedRef: Ref<HTMLButtonElement>,
) {
    const { open, setOpen, triggerRef } = useSelectContext();

    const ref = useMemo(
        () => (forwardedRef ? forwardedRef : triggerRef),
        [forwardedRef, triggerRef],
    );

    return (
        <button type="button" onClick={() => setOpen(!open)} {...props}>
            {children}
            <DownArrow size={16} />
        </button>
    );
}

export { Select };
