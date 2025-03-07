import React from 'react';
import { cardBottomContainer } from './Card.style';

interface CardBottomBodyProps {
    children?: React.ReactNode;
}
function CardBottomBody({ children }: CardBottomBodyProps) {
    return <div css={cardBottomContainer}>{children}</div>;
}

export { CardBottomBody };
