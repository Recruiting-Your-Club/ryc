import type { CSSObject } from '@emotion/react';

export interface FieldLabelProps {
    label: string;
    required?: boolean;
    description?: string;
    additionalInformation?: string;
    htmlFor?: string;
    sx?: CSSObject;
}
