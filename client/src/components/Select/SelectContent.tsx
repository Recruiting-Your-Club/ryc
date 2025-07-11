import type { CSSObject } from '@emotion/react';
import type { HTMLAttributes, ReactNode, Ref } from 'react';
import React, { forwardRef, useMemo } from 'react';
import { useSelectContext } from './SelectContext';
import { s_selectContent } from './Select.styles';
import type { SelectContentProps } from './types';

/**
 * SelectContent 컴포넌트
 */

function SelectContent(
    { children, sx, ...props }: SelectContentProps,
    forwardedRef: Ref<HTMLDivElement>,
) {
    const { open, contentRef } = useSelectContext();

    const ref = forwardedRef || contentRef;

    return (
        <div role="listbox" ref={ref} css={[s_selectContent(open), sx]} {...props}>
            {children}
        </div>
    );
}

export { SelectContent };
