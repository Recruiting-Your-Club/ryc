import React from 'react';
import {
    s_fieldLabel,
    s_labelDescription,
    s_labelWrapper,
    s_requiredLabel,
} from './FieldLabel.style';

function FieldLabel({ label, description, required }: FieldLabelProps) {
    return (
        <div css={s_labelWrapper}>
            <div css={s_fieldLabel}>
                {label} {required && <span css={s_requiredLabel}>*</span>}
            </div>
            {description && <div css={s_labelDescription}>{description}</div>}
        </div>
    );
}

export { FieldLabel };
