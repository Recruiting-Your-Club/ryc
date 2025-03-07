import React from 'react';
import { descriptionText } from './Card.style';

interface DescriptionTextProps {
    description: string;
}

function DescriptionText({ description }: DescriptionTextProps) {
    return (
        <>
            <span css={descriptionText}>{description}</span>
        </>
    );
}

export { DescriptionText };
