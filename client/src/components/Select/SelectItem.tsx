import type { CSSObject } from '@emotion/react';
import type { HTMLAttributes, KeyboardEvent, ReactNode } from 'react';
import React, { useState } from 'react';
import { useSelectContext } from './SelectContext';
import { s_selectItem, s_selectItemIndicator } from './Select.styles';
import Check from '@assets/images/select_check.svg';
import type { SelectItemProps } from './types';

/**
 * SelectItem 컴포넌트
 */

function SelectItem({
    children,
    value: itemValue,
    disabled = false,
    sx,
    ...props
}: SelectItemProps) {
    const { value, setValue, setOpen, setLabel } = useSelectContext();
    const isSelected = value === itemValue;

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
            onClick={handleSelect}
            onKeyDown={handleKeyDown}
            tabIndex={0}
            css={[s_selectItem(), sx]}
            {...props}
        >
            {children}
            {isSelected && <Check css={s_selectItemIndicator} />}
        </div>
    );
}

export { SelectItem };
