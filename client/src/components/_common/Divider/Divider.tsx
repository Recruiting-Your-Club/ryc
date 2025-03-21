import type { CSSObject } from '@emotion/react';
import type { HTMLAttributes } from 'react';
import React from 'react';
import { divider } from './Divider.style';

export type DividerColor = 'black' | 'gray';
export type DividerWidth = '70' | '80' | '90' | 'full';
export type DividerWeight = '1' | '2' | '3';

interface DividerProps extends HTMLAttributes<HTMLHRElement> {
    width?: DividerWidth;
    color?: DividerColor;
    weight?: DividerWeight;
    sx?: CSSObject;
}
function Divider({ width = 'full', color = 'gray', weight = '1', sx, ...props }: DividerProps) {
    // prop destruction
    // lib hooks
    // state, ref, querystring hooks
    // form hooks
    // query hooks
    // calculated values
    // effects
    // handlers

    return (
        <>
            <hr css={[divider({ width, color, weight }), sx]} {...props} />
        </>
    );
}

export { Divider };
