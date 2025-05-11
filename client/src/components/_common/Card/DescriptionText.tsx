import { Text } from '@components/_common/Text';
import type { CSSObject } from '@emotion/react';
import React from 'react';

interface DescriptionTextProps {
    description: string;
    sx?: CSSObject;
}

function DescriptionText({ description, sx }: DescriptionTextProps) {
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
            <Text as="span" textAlign="start" type="helperTextBold" color="subCaption" sx={sx}>
                {description}
            </Text>
        </>
    );
}

export { DescriptionText };
