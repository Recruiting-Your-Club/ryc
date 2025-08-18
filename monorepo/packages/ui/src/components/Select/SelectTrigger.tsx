import type { Ref } from 'react';
import React from 'react';

import DownArrow from '@ssoc/assets/images/downArrow.svg';

import { s_selectTrigger } from './Select.styles';
import { useSelectContext } from './SelectContext';
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
