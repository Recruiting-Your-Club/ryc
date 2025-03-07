import React from 'react';
import { tag } from './Tag.style';

export type tagVariant = 'primary' | 'progress' | 'end';

export interface TagProps {
    text: string;
    variant: tagVariant;
}
function Tag({ text = 'sample', variant = 'primary' }: TagProps) {
    return (
        <div>
            <span css={tag(variant)}>{text}</span>
        </div>
    );
}
export { Tag };
