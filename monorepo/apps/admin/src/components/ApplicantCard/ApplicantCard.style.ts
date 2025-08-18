import { css } from '@emotion/react';

import theme from '@ssoc/styles';
import { hexToRgb } from '@ssoc/utils';

export const s_root = css`
    position: relative;
    padding-top: 1.3rem;
    border: 0px;
    box-shadow: 0px 0px 3px 0px rgba(${hexToRgb(theme.colors.black)}, 0.15);
    transition:
        transform 0.3s ease,
        box-shadow 0.3s ease;

    &:hover {
        cursor: pointer;
        transform: translateY(-1px);
        box-shadow: 0px 0px 5px 0px rgba(${hexToRgb(theme.colors.black)}, 0.3);
    }
`;

export const s_checkbox = css`
    display: flex;
    position: absolute;
    top: 0.5rem;
    right: 0.5rem;
`;

export const s_emailText = css`
    ${theme.typography.subCaptionSemibold};
    color: ${theme.colors.gray[500]};
`;

export const s_divider = css`
    border-top: 0.1rem solid rgba(${hexToRgb(theme.colors.black)}, 0.1);
`;

export const s_bottom = css`
    padding-block: 0.8rem;
`;

export const s_dateWrapper = css`
    display: inline-flex;
    align-items: center;
    gap: 0.3rem;
`;

export const s_timeCircleSvg = css`
    width: 1.4rem;
    vertical-align: middle;
    color: ${theme.colors.gray[500]};
`;

export const s_dateText = css`
    ${theme.typography.subCaptionSemibold}
`;

export const s_Footer = css`
    padding: 0.5rem 1rem;
    justify-content: space-between;
`;
