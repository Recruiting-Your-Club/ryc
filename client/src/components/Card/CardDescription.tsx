import React from 'react';
import { subTitleCss, titleContainer, titleCss } from './Card.style';

interface CardMainContentProps {
    title: string;
    subTitle: string;
}
function CardDescription({ title, subTitle }: CardMainContentProps) {
    return (
        <div css={titleContainer}>
            <span css={titleCss}>{title}</span>
            <span css={subTitleCss}>{subTitle}</span>
        </div>
    );
}

export { CardDescription };
