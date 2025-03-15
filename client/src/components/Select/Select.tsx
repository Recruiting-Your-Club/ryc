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
import { useClickOutside } from '@hooks/useClickOutside';

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

function SelectRoot({ children, value, onValueChange, size = 'md', sx }: SelectProps) {
    const [open, setOpen] = useState(false);
    const [label, setLabel] = useState('');
    const triggerRef = useRef<HTMLButtonElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);

    const setValue = (newValue: string) => {
        onValueChange(newValue);
    };

    useClickOutside([triggerRef, contentRef], () => setOpen(false));

    const contextValue = useMemo(
        () => ({ open, setOpen, value, setValue, label, setLabel, triggerRef, contentRef }),
        [open, value, label, triggerRef, contentRef],
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
