import type { CSSObject } from '@emotion/react';
import React from 'react';

import { Text } from '../Text';
import { titleContainer } from './Card.style';

interface CardTitleContainerProps {
    titlePartPaddingLeft?: string;
    title: string;
    subTitle: string;
    titleSx?: CSSObject;
    subTitleSx?: CSSObject;
}
function CardTitleContainer({
    titlePartPaddingLeft,
    title,
    subTitle,
    titleSx,
    subTitleSx,
}: CardTitleContainerProps) {
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
            <Text
                as="span"
                textAlign="start"
                type="bodyBold"
                color="black"
                noWrap
                cropped
                sx={titleSx}
            >
                {title}
            </Text>
            <Text
                as="span"
                textAlign="start"
                type="subCaptionRegular"
                color="helper"
                noWrap
                cropped
                sx={subTitleSx}
            >
                {subTitle}
            </Text>
        </div>
    );
}

export { CardTitleContainer };
