import type { HTMLAttributes } from 'react';
import React from 'react';
import { s_selectSeperator } from './Select.styles';

function SelectSeparator(props: HTMLAttributes<HTMLDivElement>) {
    return <div role="separator" css={s_selectSeperator} {...props} />;
}

export { SelectSeparator };
