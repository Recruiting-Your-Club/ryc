import { css } from '@emotion/react';
import theme from '@styles/theme';
const TEXT_COLORS = {
    black: theme.colors.black,
    white: theme.colors.white,
    primary: theme.colors.default,
    warning: theme.colors.red[800],
    caption: theme.colors.gray[600],
    subCaption: theme.colors.gray[500],
    helper: theme.colors.gray[400],
};
const TEXT = {
    displayBold: css(theme.typography.displayBold),
    h1Bold: css(theme.typography.h1Bold),
    h1Semibold: css(theme.typography.h1Semibold),
    h1Light: css(theme.typography.h1Light),
    h2Bold: css(theme.typography.h2Bold),
    h2Semibold: css(theme.typography.h2Semibold),
    h2Light: css(theme.typography.h2Light),
    h3Bold: css(theme.typography.h3Bold),
    h3Semibold: css(theme.typography.h3Semibold),
    h3Light: css(theme.typography.h3Light),
    h4Bold: css(theme.typography.h4Bold),
    h4Semibold: css(theme.typography.h4Semibold),
    h4Light: css(theme.typography.h4Light),
    bodyBold: css(theme.typography.bodyBold),
    bodySemibold: css(theme.typography.bodySemibold),
    bodyRegular: css(theme.typography.bodyRegular),
    bodyLight: css(theme.typography.bodyLight),
    captionBold: css(theme.typography.captionBold),
    captionSemibold: css(theme.typography.captionSemibold),
    captionRegular: css(theme.typography.captionRegular),
    captionLight: css(theme.typography.captionLight),
    subCaptionBold: css(theme.typography.subCaptionBold),
    subCaptionSemibold: css(theme.typography.subCaptionSemibold),
    subCaptionRegular: css(theme.typography.subCaptionRegular),
    subCaptionLight: css(theme.typography.subCaptionLight),
    helperTextBold: css(theme.typography.helperTextBold),
    helperTextSemibold: css(theme.typography.helperTextSemibold),
    helperTextRegular: css(theme.typography.helperTextRegular),
    helperTextLight: css(theme.typography.helperTextLight),
};
export const textStyle = ({ type, color, textAlign, noWrap, cropped, }) => {
    return css `
        ${TEXT[type]}
        color: ${TEXT_COLORS[color]};
        text-align: ${textAlign};
        white-space: ${noWrap ? 'nowrap' : 'pre-wrap'};
        overflow: ${cropped ? 'hidden' : ''};
        text-overflow: ${cropped ? 'ellipsis' : ''};
    `;
};
export const highlightStyle = css `
    color: ${theme.colors.default};
`;
//# sourceMappingURL=Text.style.js.map