import { css } from '@emotion/react';
import theme from '@styles/theme';

export const dialogCss = css`
    max-width: 64dvw;
    max-height: 90dvh;
    min-width: 115rem;
`;

export const headerCss = css`
    justify-content: space-between;
    padding: 1.4rem 3rem;
`;

export const contentCss = css`
    display: flex;
    flex-direction: row;
    padding: 2rem 4rem;
    overflow: hidden;
`;

export const s_selectContainer = css`
    flex: 2.5;
    display: flex;
    flex-direction: column;
    height: 100%;
    padding: 1rem 1rem 5.5rem 1rem;
    gap: 1rem;
`;

export const s_perInformationContainer = css`
    display: flex;
    flex-direction: column;
`;

export const s_emptyPlace = css`
    height: 100%;
`;

export const s_resetButton = css`
    /* width: 8rem; */
    margin: 1rem 0 0 0;
    background-color: ${theme.colors.gray[100]};
    &:hover {
        background-color: ${theme.colors.gray[200]};
    }
`;

export const informationContainer = css`
    flex: 4;
    display: flex;
    flex-direction: column;
    height: 100%;
    padding: 3.5rem 1rem 5.7rem 1rem;
    gap: 1rem;
`;

export const verticalDivider = css`
    border-left: 1px solid ${theme.colors.gray[200]};
    height: 100%;
    margin: 0 1rem;
`;

export const s_emailContainer = css`
    flex: 3.5;
    height: 100%;
    padding: 1rem 1rem;
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
`;

export const titleInputCss = css`
    border: 1px solid ${theme.colors.gray[500]};
    border-radius: 8px;
    padding-left: 1rem;
    ${theme.typography.captionRegular}
`;

export const inputCss = css`
    ::placeholder {
        ${theme.typography.captionRegular}
    }
`;

export const textareaCss = css`
    ${theme.typography.captionRegular}
    margin: -2.5rem 0;
    padding: 1rem 1.5rem;
    min-height: 30rem;
    height: 100%;

    ::placeholder {
        ${theme.typography.captionRegular}
    }
`;

export const titleWrapper = css`
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 1rem;
`;

export const contentWrapper = css`
    flex: 8.5;
    height: 100%;
    display: flex;
    flex-direction: column;
    min-height: 35rem;
    gap: 1rem;
`;

export const submitButtonWrapper = css`
    flex: 0.5;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    height: 3rem;
    max-height: 3rem;
`;

export const informationInput = css`
    display: flex;
    gap: 5rem;
`;

export const perInformationInput = css`
    display: flex;
    flex-direction: column;
`;

export const informationInputCss = (isError: boolean) => css`
    border: 1px solid ${theme.colors.gray[400]};
    border-radius: 10px;
    width: 4.5rem;
    height: 2.5rem;
    ${isError &&
    css`
        border-color: ${theme.colors.red[800]};
    `}
`;

export const s_select = css`
    width: 6.5rem;
    margin: 0.7rem 0;
`;

export const s_selectTrigger = css`
    border: 1px solid ${theme.colors.gray[400]};
    border-radius: 6px;
    width: 6.5rem;
    height: 2.5rem;
`;

export const inputFormSection = css`
    display: flex;
    height: 3rem;
    align-items: center;
    margin: 0.5rem 0;
`;

export const calendarCss = css`
    margin: 1.5rem 0;
    width: 100%;
    height: 60rem;
    box-shadow: rgba(0, 27, 55, 0.1) 0px 2px 30px 0px;
`;

export const helperCss = css`
    ${theme.typography.helperTextRegular}
    margin: -0.3rem 0.5rem;
`;

export const numberUnitText = css`
    margin: 0 0 0 -7.5rem;
`;
