import type { CSSObject } from '@emotion/react';
import { useSelectContext } from './SelectContext';
import { s_selectPlaceholder, s_selectValue } from './Select.styles';
import React from 'react';
import type { SelectValueProps } from './types';

/**
 * SelectValue 컴포넌트
 */

function SelectValue({ placeholder, sx }: SelectValueProps) {
    const { value, label } = useSelectContext();

    return (
        <span css={[s_selectValue, sx]}>
            {value ? label : placeholder && <span css={s_selectPlaceholder}>{placeholder}</span>}
        </span>
    );
}

export { SelectValue };
