import React from 'react';
import { cardTopContainer } from './Card.style';

interface CardTopBody {
    children?: React.ReactNode;
}
function CardTopBody({ children }: CardTopBody) {
    return (
        <>
            <div css={cardTopContainer}>{children}</div>
        </>
    );
}

export { CardTopBody };
