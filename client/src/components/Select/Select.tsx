import type { ButtonHTMLAttributes, HTMLAttributes, KeyboardEvent, ReactNode, Ref } from 'react';
import React, { forwardRef, useEffect, useMemo, useRef, useState } from 'react';
import { SelectContext, useSelectContext } from './SelectContext';
import type { CSSObject } from '@emotion/react';
import { s_select, s_size } from './Select.styles';
import { SelectContent } from './SelectContent';
import { SelectGroup } from './SelectGroup';
import { SelectItem } from './SelectItem';
import { SelectLabel } from './SelectLabel';
import { SelectSeparator } from './SelectSeparator';
import { SelectTrigger } from './SelectTrigger';
import { SelectValue } from './SelectValue';
import { useClickOutside } from '@hooks/components/useClickOutside';

export type SelectSize = 'xs' | 's' | 'md' | 'lg' | 'xl' | 'full';

/**
 * Select 루트 컴포넌트
 */
interface SelectProps {
    children: ReactNode;
    value?: string;
    size?: SelectSize;
    onValueChange?: (value: string) => void;
    sx?: CSSObject;
}

function SelectRoot({
    children,
    value: controlledValue,
    onValueChange,
    size = 'md',
    sx,
}: SelectProps) {
    const [open, setOpen] = useState(false);
    const [label, setLabel] = useState('');
    const [internalValue, setInternalValue] = useState(controlledValue || '');
    const triggerRef = useRef<HTMLButtonElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);

    const value = controlledValue ?? internalValue;

    const setValue = (newValue: string) => {
        if (onValueChange) {
            onValueChange(newValue);
        } else {
            setInternalValue(newValue);
        }
    };

    useClickOutside([triggerRef, contentRef], () => setOpen(false));

    const contextValue = useMemo(
        () => ({ open, setOpen, value, setValue, label, setLabel, triggerRef, contentRef }),
        [open, value, label],
    );

    return (
        <SelectContext.Provider value={contextValue}>
            <div css={[s_size(size), s_select, sx]}>{children}</div>
        </SelectContext.Provider>
    );
}

const Select = Object.assign(SelectRoot, {
    Trigger: SelectTrigger,
    Value: SelectValue,
    Content: SelectContent,
    Group: SelectGroup,
    Label: SelectLabel,
    Item: SelectItem,
    Separator: SelectSeparator,
});

export { Select };
