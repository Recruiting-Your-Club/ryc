import { css } from '@emotion/react';
import theme from '@styles/theme';

const baseDisplay = css`
    display: flex;
    padding-inline: 1.5rem;
`;

const baseCardRoot = css`
    background-color: ${theme.colors.white};
    padding-block: 1.5rem;
    border: 0.0625rem solid ${theme.colors.gray[300]};
`;

export const baseCard = (width: string, radius: string, hover: boolean) => {
    if (hover) {
        return css`
            ${baseCardRoot}
            width: ${width};
            border-radius: ${radius};
            transition: all 200ms;

            &:hover {
                cursor: pointer;
                box-shadow: 0 0.625rem 0.9375rem rgba(0, 0, 0, 0.1);
                transform: translateY(-0.25rem);
            }
        `;
    } else {
        return css`
            ${baseCardRoot}
            width: ${width};
            border-radius: ${radius};
        `;
    }
};

export const baseClubCard = css`
    width: 38rem;
    background-color: ${theme.colors.white};
    padding-top: 1.5rem;
    border-radius: 0.3125rem;
    border: 0.0625rem solid ${theme.colors.gray[300]};
    transition: all 200ms;

    &:hover {
        cursor: pointer;
        box-shadow: 0 0.625rem 0.9375rem rgba(0, 0, 0, 0.1);
        transform: translateY(-0.25rem);
    }
`;

export const cardTopContainer = css`
    ${baseDisplay};
`;

export const titleContainer = (paddingLeft?: string) => css`
    width: 65%;
    display: flex;
    flex-direction: column;
    padding-left: ${paddingLeft ? paddingLeft : 0};
    overflow: hidden;
`;

export const titleCss = css`
    max-width: 100%;
    display: block;
    overflow: hidden;
    ${theme.typography.bodyBold};
    text-overflow: ellipsis;
    padding-bottom: 0.2rem;
    white-space: nowrap;
`;

export const subTitleCss = css`
    ${theme.typography.subCaptionRegular}
    color: ${theme.colors.gray[400]};
`;

export const cardBottomContainer = css`
    /* ${baseDisplay}; */
    padding-inline: 1.5rem;
    padding-block: 0.95rem;
`;

export const descriptionText = css`
    font-size: 1rem;
    font-weight: 600;
    white-space: pre-line;
    /* ${theme.typography.subCaptionBold} */
    color: ${theme.colors.gray[500]};
`;

export const line = css`
    border: 0;
    height: 0;
    margin: 0;
    border-top: 0.0625rem solid ${theme.colors.gray[300]};
`;

export const footerContainer = (footerHeight: string) => css`
    ${baseDisplay};
    height: ${footerHeight};
    align-items: center;
    margin-bottom: -1.5rem;
    overflow: hidden;
`;
