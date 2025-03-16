import type { CSSObject } from '@emotion/react';
import type { HTMLAttributes, ReactNode, Ref } from 'react';
import React, { forwardRef, useMemo } from 'react';
import { useSelectContext } from './SelectContext';
import { s_selectContent } from './Select.styles';

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

export { SelectContent };
