import { css } from '@emotion/react';

import theme from '@ssoc/styles';
import { hexToRgb } from '@ssoc/utils';

import type { Step } from './types';

export const s_boxContainer = (height: string = '100%', step: Step, width?: string) => css`
    width: 27rem;
    height: ${height};
    border-radius: 10px;
    background-color: rgba(${hexToRgb(theme.colors.gray[100])}, 1);
    justify-content: center;
    align-items: center;

    ${step === 'final' &&
    css`
        background-color: rgba(${hexToRgb(theme.colors.default)}, 0.1);
    `}
`;

export const s_titleGroup = css`
    display: flex;
    height: 5%;
    max-height: 5rem;
    min-height: 4rem;
    padding: 1rem 1.5rem;
    justify-content: space-between;
    align-items: center;
`;

export const s_cardGroupWrapper = css`
    height: 95%;
    padding: 0.5rem 1rem 1rem 1rem;
`;

export const s_cardGroup = css`
    height: 100%;
    padding: 0.5rem 0.5rem;
    overflow-x: hidden;
    overflow-y: auto;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.8rem;

    &::after {
        content: '';
        height: 0.5rem;
        flex-shrink: 0;
    }
`;

export const s_svg = css`
    height: 1.5rem;
    vertical-align: middle;
    cursor: pointer;
`;

export const s_divider = css`
    border-top: 0.2rem solid rgba(${hexToRgb(theme.colors.black)}, 0.1);
`;

export const s_meatballButton = css`
    height: 1.5rem;
    padding: 0;
    border: 0px;
    border-radius: 1;
    background-color: transparent;
    &:hover {
        background-color: ${theme.colors.gray[200]};
    }
`;

export const s_dropdownContent = css`
    width: 11.5rem;
`;

export const s_dropdownSeparator = css`
    margin: 0;
`;

export const s_dropdownItem = css`
    padding: 0.9rem 0.3rem;
    align-items: center;
    &:hover {
        background-color: ${theme.colors.gray[200]};
        border-radius: 0;
    }
    &:focus {
        background-color: ${theme.colors.gray[200]};
        border-radius: 0;
    }
`;

export const s_dropdownSubTrigger = css`
    ${s_dropdownItem}
`;

export const s_dropdownSubContent = css`
    width: 3rem;
`;

export const s_dropdownSubItem = css`
    ${s_dropdownItem}
    padding: 0.5rem 0.2rem;
`;

export const s_textToggle = (step: Step) => css`
    ${step !== 'final' &&
    css`
        background-color: ${theme.colors.gray[400]};
    `}
`;

export const s_textToggleRight = (isChecked: boolean, step: Step) => css`
    ${theme.typography.helperTextRegular}
    padding: 0.4rem 0.7rem;

    ${step !== 'final' &&
    isChecked &&
    css`
        color: ${theme.colors.gray[700]};
    `}
`;

export const s_textToggleLeft = (isChecked: boolean, step: Step) => css`
    ${theme.typography.helperTextRegular}
    padding: 0.4rem 0.7rem;
    ${step !== 'final' &&
    !isChecked &&
    css`
        color: ${theme.colors.gray[700]};
    `}
`;

export const s_rightSideContainer = css`
    display: flex;
    align-items: center;
    gap: 0.5rem;
`;
