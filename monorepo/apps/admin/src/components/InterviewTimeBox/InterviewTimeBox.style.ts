import { css } from '@emotion/react';

import theme from '@ssoc/styles';

export const baseBox = css`
    display: flex;
    flex-direction: column;
    height: 100%;
    min-height: 10rem;
    width: 100%;
    max-width: 35rem;
    min-width: 35rem;
    border: 1px solid ${theme.colors.gray[400]};
    border-radius: 8px;
    overflow: hidden;
`;

export const timeSelectSection = css`
    display: flex;
    align-items: center;
    padding: 1.5rem;
    justify-content: space-between;
    height: 6rem;
`;

export const s_timeRangeSettingContainer = css`
    display: flex;
    align-items: center;
    gap: 0.5rem;
`;

export const s_select = css`
    width: 7rem;
    margin: 0.7rem 0;
`;

export const s_selectTrigger = css`
    border: 1px solid ${theme.colors.gray[400]};
    border-radius: 6px;
    width: 7rem;
    height: 2.5rem;
`;

export const s_selectContent = css`
    background-color: ${theme.colors.white};
`;

export const dividerCss = css`
    border-top: 1px solid ${theme.colors.gray[400]};
`;

export const selectedTimeSection = css`
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
    padding: 1rem;
    overflow-y: auto;
`;

export const s_applyButton = css`
    ${theme.typography.subCaptionSemibold}
    height: 2.5rem;
    padding: 0 1.7rem;
`;

export const timeButtonCss = (active: boolean) => css`
    ${theme.typography.subCaptionSemibold}
    width: 7rem;
    height: 3rem;
    padding: 0 1.5rem;

    ${active &&
    css`
        color: white;
        border: none;
        background-color: ${theme.colors.default};
        &:hover {
            color: white;
            background-color: ${theme.colors.defaultHover};
        }
    `}
`;
