import type { CSSObject } from '@emotion/react';
import type { HTMLAttributes, KeyboardEvent, ReactNode } from 'react';
import React, { useState } from 'react';
import { useSelectContext } from './SelectContext';
import { s_selectItem, s_selectItemIndicator } from './Select.styles';
import Check from '@assets/images/select_check.svg';

/**
 * SelectItem 컴포넌트
 */
interface SelectItemProps extends HTMLAttributes<HTMLDivElement> {
    children: ReactNode;
    value: string;
    disabled?: boolean;
    sx?: CSSObject;
}

function SelectItem({
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
            css={[s_selectItem(isHighlighted), sx]}
            {...props}
        >
            {children}
            {isSelected && (
                <span css={s_selectItemIndicator}>
                    <Check />
                </span>
            )}
        </div>
    );
}

export { SelectItem };
