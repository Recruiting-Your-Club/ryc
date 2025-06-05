import type { CSSObject } from '@emotion/react';
import type { HTMLAttributes, ReactNode } from 'react';
import React from 'react';
import { s_selectGroup } from './Select.styles';
import type { SelectGroupProps } from './type';

/**
 * SelectGroup 컴포넌트
 */

function SelectGroup({ children, ...props }: SelectGroupProps) {
    return (
        <div role="group" css={s_selectGroup} {...props}>
            {children}
        </div>
    );
}

export { SelectGroup };
