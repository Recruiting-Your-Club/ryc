import type { CSSObject } from '@emotion/react';
import type { HTMLAttributes, ReactNode } from 'react';
import React from 'react';
import { s_selectLabel } from './Select.styles';
import type { SelectLabelProps } from './types';

/**
 * SelectLabel 컴포넌트
 */

function SelectLabel({ children, ...props }: SelectLabelProps) {
    return (
        <label css={s_selectLabel} {...props}>
            {children}
        </label>
    );
}

export { SelectLabel };
