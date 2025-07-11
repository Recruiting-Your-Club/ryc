import type { CSSObject } from '@emotion/react';
import type { ButtonHTMLAttributes, ReactNode, Ref } from 'react';
import React, { forwardRef, useMemo } from 'react';
import { useSelectContext } from './SelectContext';
import { s_selectTrigger } from './Select.styles';
import DownArrow from '@ssoc/assets/images/downArrow.svg';
import type { SelectTriggerProps } from './types';

function SelectTrigger(
    { children, sx, ...props }: SelectTriggerProps,
    forwardedRef: Ref<HTMLButtonElement>,
) {
    const { open, setOpen, triggerRef } = useSelectContext();

    const ref = forwardedRef || triggerRef;

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

export { SelectTrigger };
