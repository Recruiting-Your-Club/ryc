import type { SerializedStyles } from '@emotion/react';
import React from 'react';
import { baseCard } from './Card.style';

interface CardRootProps {
    width: string;
    radius: string;
    customCss?: SerializedStyles;
    children?: React.ReactNode;
    onClick?: () => void;
    onClickHandler?: () => void;
}

function CardRoot({ width, radius, children, customCss, onClick, onClickHandler }: CardRootProps) {
    return (
        <div
            onClick={onClick}
            onKeyDown={onClickHandler}
            css={[baseCard(width, radius), customCss]}
            tabIndex={0}
            role="button"
        >
            {children}
        </div>
    );
}

export { CardRoot };
