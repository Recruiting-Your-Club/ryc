import React from 'react';
import { subTitleCss, titleContainer, titleCss } from './Card.style';

interface CardTitleContainerProps {
    titlePartPaddingLeft?: string;
    title: string;
    subTitle: string;
}
function CardTitleContainer({ titlePartPaddingLeft, title, subTitle }: CardTitleContainerProps) {
    // prop destruction
    // lib hooks
    // state, ref, querystring hooks
    // form hooks
    // query hooks
    // calculated values
    // effects
    // handlers

    return (
        <div css={titleContainer(titlePartPaddingLeft)}>
            <span css={titleCss}>{title}</span>
            <span css={subTitleCss}>{subTitle}</span>
        </div>
    );
}

export { CardTitleContainer };
