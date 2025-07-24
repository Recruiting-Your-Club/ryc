import { css } from '@emotion/react';

import theme from '@ssoc/styles';

export const s_noticeBox = css`
    width: 60%;
    border: 1px solid ${theme.colors.gray[300]};
    padding: 1rem;
    padding-left: 2rem;
    border-radius: 6px;
    margin: 1rem 0rem;
`;

export const s_textHighlight = css`
    ${theme.typography.captionSemibold};
`;

export const s_checkboxWrapper = css`
    width: 60%;
    align-items: center;
    display: flex;
    justify-content: space-between;
    border: 1px solid ${theme.colors.gray[300]};
    border-radius: 6px;
    padding: 3rem 2rem;
`;

export const s_checkboxLabel = css`
    margin-left: 0.5rem;
`;

export const s_additionalInfoWrapper = css`
    margin-top: 3rem;
`;

export const s_questionCard = css`
    border: 1px solid ${theme.colors.gray[300]};
    border-radius: 0.6rem;
    padding: 2rem;
    margin-bottom: 1.6rem;
`;

export const s_questionHeader = css`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1.6rem;
`;

export const s_removeQuestion = css`
    margin-left: 1rem;
`;

export const s_questionSection = css`
    margin-top: 1rem;
`;

export const s_selectToggleContainer = css`
    display: flex;
`;

export const s_selectContainer = css`
    //margin-right: 2rem;
`;

export const s_toggleContainer = css`
    display: flex;
    align-items: center;
    padding-right: 2rem;
    border-right: solid 1px ${theme.colors.gray[300]};
`;

export const s_toggleLabel = css`
    ${theme.typography.subCaptionRegular};
    color: ${theme.colors.gray[800]};
    margin-right: 0.5rem;
`;

export const s_trashIcon = css`
    width: 2rem;
    height: 2rem;
`;
