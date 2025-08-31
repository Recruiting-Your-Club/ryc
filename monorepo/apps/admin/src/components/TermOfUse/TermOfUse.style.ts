import { css, keyframes } from '@emotion/react';

import theme from '@ssoc/styles';

export const shadow = {
    soft: '0 8px 24px rgba(2,8,23,0.06)',
};

export const terms_fade_slide = keyframes`
    from { opacity: 0; transform: translateY(8px); }
    to { opacity: 1; transform: translateY(0); }
`;

export const s_page = css`
    min-height: 100dvh;
    display: grid;
    grid-template-rows: auto 1fr auto;
`;

export const s_header = css`
    max-width: 72rem;
    margin: 0 auto;
    padding: 2.8rem 2rem 0.8rem;
    animation: ${terms_fade_slide} 220ms ease-out;
`;

export const s_titleText = css`
    color: ${theme.colors.gray[700]};
    letter-spacing: -0.02rem;
    margin: 0 0 0.6rem;
`;

export const s_main = css`
    margin: 0 auto;
    max-width: 72rem;
    padding: 1.6rem 2rem 12rem;
    width: 100%;
`;

export const s_card = css`
    border: 1px solid ${theme.colors.gray[200]};
    border-radius: 18px;
    box-shadow: ${shadow.soft};
    overflow: clip;
`;

export const s_row = css`
    display: grid;
    grid-template-columns: 1fr auto;
    align-items: center;
    gap: 1.2rem;
    padding: 1.8rem 1.8rem;
    border-top: 1px solid ${theme.colors.gray[200]};

    &:first-of-type {
        border-top: 0;
    }
`;

export const s_allAgreeRow = css`
    ${s_row};
    background: ${theme.colors.gray[100]};
`;

export const s_labelBlock = css`
    display: flex;
    align-items: center;
    gap: 1rem;
    cursor: pointer;
`;

export const s_labelText = css`
    display: inline-flex;
    gap: 0.8rem;
    align-items: baseline;

    small {
        ${theme.typography.captionRegular}
        color: ${theme.colors.gray[700]}
    }
`;

export const s_allAgreeLabel = css`
    ${s_labelText}
`;

export const s_badgeRequired = css`
    width: 5rem;
`;

export const s_detailToggle = css`
    border: 1px solid ${theme.colors.gray[200]};
    border-radius: 999px;
    padding: 0.8rem 1.2rem;
    display: inline-flex;
    align-items: center;
    gap: 0.6rem;
    line-height: 1;
    cursor: pointer;

    &:hover {
    }

    svg {
        transition: transform 160ms ease;
    }

    &[data-expanded='true'] svg {
        transform: rotate(180deg);
    }
`;

export const s_details = css`
    max-height: 0;
    overflow: hidden;
    transition: max-height 260ms ease;
    will-change: max-height;
    border-top: 1px dashed ${theme.colors.gray[200]};
    background: ${theme.colors.gray[100]};
`;

export const s_detailsExpanded = css`
    max-height: 80rem;
`;

export const s_detailsInner = css`
    padding: 1.6rem 1.8rem 2rem;
    text-align: left;
    & :is(p, span, div, li, h1, h2, h3, h4, h5, h6) {
        text-align: left;
    }

    ul {
        margin: 0.8rem 0 0.8rem 1.8rem;
    }

    li {
        margin: 0.4rem 0;
    }

    code {
        border-radius: 6px;
        padding: 0.1rem 0.6rem;
    }
`;

export const s_h4Text = css`
    margin: 1.4rem 0 0.6rem;
`;

export const s_missingAnchor = css`
    height: 1px;
`;
export const s_footerButton = css`
    margin-top: 5rem;
`;
export const s_footerText = css`
    margin-top: 1rem;
`;
