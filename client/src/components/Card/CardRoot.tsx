import type { SerializedStyles } from '@emotion/react';
import React from 'react';
import { baseCard } from './Card.style';

interface CardRootProps {
    width: string;
    radius: string;
    hover: boolean;
    customCss?: SerializedStyles;
    children?: React.ReactNode;
    onClick?: () => void;
    onClickHandler?: () => void;
}

function CardRoot({
    width,
    radius,
    hover,
    customCss,
    children,
    onClick,
    onClickHandler,
}: CardRootProps) {
    return (
        <div
            onClick={onClick}
            onKeyDown={onClickHandler}
            css={[baseCard(width, radius, hover), customCss]}
            tabIndex={0}
            role="button"
        >
            {children}
        </div>
    );
}

export { CardRoot };
