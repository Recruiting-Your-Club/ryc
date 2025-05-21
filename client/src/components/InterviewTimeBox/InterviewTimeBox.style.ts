import { css } from '@emotion/react';
import theme from '@styles/theme';

export const baseBox = css`
    display: flex;
    flex-direction: column;
    height: 100%;
    min-height: 10rem;
    border: 1px solid ${theme.colors.gray[300]};
    border-radius: 8px;
`;

export const timeSelectSection = css`
    display: flex;
    align-items: center;
    padding: 1.5rem;
    justify-content: space-between;
`;

export const selectedTimeSection = css`
    display: flex;
    min-height: 5rem;
    flex-wrap: wrap;
    gap: 0.5rem;
    padding: 1rem;
    overflow-y: auto;
`;

export const selectRootCss = css`
    width: 7rem;
    margin: 0 0.5rem;
`;

export const selectTriggerCss = css`
    border: 1px solid ${theme.colors.gray[400]};
    border-radius: 8px;
    width: 7rem;
    height: 3rem;
`;

export const buttonCss = css`
    ${theme.typography.subCaptionSemibold}
    height: 3rem;
    padding: 0 1.5rem;
    background-color: ${theme.colors.gray[100]};
    &:hover {
        background-color: ${theme.colors.gray[200]};
    }
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
