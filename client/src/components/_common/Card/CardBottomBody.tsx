import type { CSSObject } from '@emotion/react';
import type { ReactNode } from 'react';
import React from 'react';
import { cardBottomContainer } from './Card.style';

interface CardBottomBodyProps {
    children?: ReactNode;
    sx?: CSSObject;
}
function CardBottomBody({ children, sx }: CardBottomBodyProps) {
    // prop destruction
    // lib hooks
    // state, ref, querystring hooks
    // form hooks
    // query hooks
    // calculated values
    // effects
    // handlers

    return <div css={[cardBottomContainer, sx]}>{children}</div>;
}

export { CardBottomBody };
