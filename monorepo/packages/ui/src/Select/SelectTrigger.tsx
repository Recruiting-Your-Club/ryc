import type { CSSObject } from '@emotion/react';
import type { ButtonHTMLAttributes, ReactNode, Ref } from 'react';

import DownArrow from '@ssoc/assets/images/downArrow.svg';

import { s_selectTrigger } from './Select.styles';
import { useSelectContext } from './SelectContext';

interface SelectTriggerProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    children: ReactNode;
    sx?: CSSObject;
}

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
