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

export const informationContainer = css`
    flex: 4;
    display: flex;
    flex-direction: column;
    height: 100%;
    padding: 1rem;
    gap: 1rem;
`;

export const verticalDivider = css`
    border-left: 1px solid ${theme.colors.gray[300]};
    height: 100%;
    margin: 0 1rem;
`;

export const emailWrapper = css`
    flex: 6;
    height: 100%;
    padding: 2rem 2rem;
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
`;

export const titleInputCss = css`
    border: 1px solid ${theme.colors.gray[500]};
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
`;

export const informationInput = css`
    display: flex;
    gap: 5rem;
`;

export const perInformationInput = css`
    display: flex;
    flex-direction: column;
`;

export const informationInputCss = css`
    border: 1px solid ${theme.colors.gray[400]};
    border-radius: 10px;
    width: 4.5rem;
    height: 2.5rem;
`;

export const timeSelectCss = css`
    border: 1px solid ${theme.colors.gray[400]};
    border-radius: 8px;
    width: 5.7rem;
    height: 2.5rem;
`;

export const inputFormSection = css`
    display: flex;
    align-items: center;
    margin: 0.5rem 0;
`;

export const calendarCss = css`
    margin: 1.5rem 0;
    width: 100%;
`;
