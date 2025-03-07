import React from 'react';
import { footerContainer } from './Card.style';

interface CardFooterProps {
    footerHeight: string;
    children?: React.ReactNode;
}

function CardFooter({ footerHeight, children }: CardFooterProps) {
    return <div css={footerContainer(footerHeight)}>{children}</div>;
}

export { CardFooter };
