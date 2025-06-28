import React from 'react';
import {
    s_fieldLabel,
    s_labelDescription,
    s_labelWrapper,
    s_requiredLabel,
} from './FieldLabel.style';
import type { FieldLabelProps } from './typs';

function FieldLabel({ label, description, required, sx, htmlFor }: FieldLabelProps) {
    return (
        <div css={[s_labelWrapper, sx]}>
            <label htmlFor={htmlFor} css={s_fieldLabel}>
                {label} {required && <span css={s_requiredLabel}>*</span>}
            </label>
            {description && <div css={s_labelDescription}>{description}</div>}
        </div>
    );
}

export { FieldLabel };
