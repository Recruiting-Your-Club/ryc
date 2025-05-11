import { css } from '@emotion/react';
import theme from '@styles/theme';
import { hexToRgb } from '@utils/hexToRgb';

export const rootCss = css`
    position: relative;
    padding-top: 1.3rem;
    border: 0px;
    box-shadow: 0px 0px 3px 0px rgba(${hexToRgb(theme.colors.black)}, 0.15);
    :hover {
        cursor: pointer;
    }
`;

export const checkboxWrapper = css`
    display: flex;
    position: absolute;
    top: 0.5rem;
    right: 0.5rem;
`;

export const emailTextCss = css`
    ${theme.typography.subCaptionSemibold};
    color: ${theme.colors.gray[500]};
`;

export const dividerCss = css`
    border-top: 0.1rem solid rgba(${hexToRgb(theme.colors.black)}, 0.1);
`;

export const bottomCss = css`
    padding-block: 0.8rem;
`;

export const dateWrapper = css`
    display: inline-flex;
    align-items: center;
    gap: 0.3rem;
`;

export const timeCircleSvgCss = css`
    width: 1.4rem;
    vertical-align: middle;
    color: ${theme.colors.gray[500]};
`;

export const dateTextCss = css`
    ${theme.typography.subCaptionSemibold}
`;

export const FooterCss = css`
    padding: 0.5rem 1rem;
    justify-content: space-between;
`;
