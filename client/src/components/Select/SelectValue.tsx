import type { CSSObject } from '@emotion/react';
import { useSelectContext } from './SelectContext';
import { s_selectPlaceholder, s_selectValue } from './Select.styles';
import React from 'react';

/**
 * SelectValue 컴포넌트
 */
interface SelectValueProps {
    placeholder?: string;
    sx?: CSSObject;
}

function SelectValue({ placeholder, sx }: SelectValueProps) {
    const { value, label } = useSelectContext();

    return (
        <span css={[s_selectValue, sx]}>
            {value ? label : placeholder && <span css={s_selectPlaceholder}>{placeholder}</span>}
        </span>
    );
}

export { SelectValue };
