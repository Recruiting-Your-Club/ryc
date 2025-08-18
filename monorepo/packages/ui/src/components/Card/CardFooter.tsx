import type { CSSObject } from '@emotion/react';
import React from 'react';

import { footerContainer } from './Card.style';

interface CardFooterProps {
    footerHeight?: string;
    children?: React.ReactNode;
    sx?: CSSObject;
}

function CardFooter({ footerHeight = '3.3rem', children, sx }: CardFooterProps) {
    // prop destruction
    // lib hooks
    // state, ref, querystring hooks
    // form hooks
    // query hooks
    // calculated values
    // effects
    // handlers

    return <div css={[footerContainer(footerHeight), sx]}>{children}</div>;
}

export { CardFooter };
