import Info from '@assets/images/info.svg';
import React from 'react';

import { Tooltip } from '@ssoc/ui';

import {
    s_descriptionContainer,
    s_fieldLabel,
    s_informSvg,
    s_informSvgWrapper,
    s_labelDescription,
    s_labelWrapper,
    s_requiredLabel,
} from './FieldLabel.style';
import type { FieldLabelProps } from './types';

function FieldLabel({
    label,
    description,
    additionalInformation,
    required,
    sx,
    htmlFor,
}: FieldLabelProps) {
    return (
        <div css={[s_labelWrapper, sx]}>
            <label htmlFor={htmlFor} css={s_fieldLabel}>
                {label} {required && <span css={s_requiredLabel}>*</span>}
            </label>
            <div css={s_descriptionContainer}>
                {description && <div css={s_labelDescription}>{description}</div>}
                {additionalInformation && (
                    <Tooltip
                        content={additionalInformation}
                        direction="right"
                        wrapperSx={s_informSvgWrapper}
                    >
                        <Info css={s_informSvg} />
                    </Tooltip>
                )}
            </div>
        </div>
    );
}

export { FieldLabel };
