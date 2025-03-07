import React from 'react';
import { descriptionText } from './Card.style';

interface DescriptionTextProps {
    description: string;
}

function DescriptionText({ description }: DescriptionTextProps) {
    // prop destruction
    // lib hooks
    // state, ref, querystring hooks
    // form hooks
    // query hooks
    // calculated values
    // effects
    // handlers

    return (
        <>
            <span css={descriptionText}>{description}</span>
        </>
    );
}

export { DescriptionText };
