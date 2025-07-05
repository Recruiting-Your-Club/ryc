import type { CSSObject, SerializedStyles } from '@emotion/react';
import React from 'react';
import { baseCard } from './Card.style';

interface CardRootProps {
    width?: string;
    radius?: string;
    hover?: boolean;
    sx?: CSSObject;
    children?: React.ReactNode;
    onClick?: () => void;
    onClickHandler?: () => void;
}

function CardRoot({
    width = '35rem',
    radius = '0.3125rem',
    hover = false,
    sx,
    children,
    onClick,
    onClickHandler,
}: CardRootProps) {
    // prop destruction
    // lib hooks
    // state, ref, querystring hooks
    // form hooks
    // query hooks
    // calculated values
    // effects
    // handlers

    return (
        <div
            onClick={onClick}
            onKeyDown={onClickHandler}
            css={[baseCard(width, radius, hover), sx]}
            tabIndex={0}
            role="button"
        >
            {children}
        </div>
    );
}

export { CardRoot };
