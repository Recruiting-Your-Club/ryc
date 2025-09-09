import { css, keyframes } from '@emotion/react';

import theme from '@ssoc/styles';
import { hexToRgb } from '@ssoc/utils';

export const s_dialog = css`
    max-width: 24dvw;
    max-height: 90dvh;
    min-width: 50rem;
`;

export const s_header = css`
    justify-content: space-between;
    padding: 1.4rem 3rem;
`;

export const s_content = css`
    display: flex;
    flex-direction: row;
    padding: 1rem 4rem 1rem 4rem;
    overflow-y: auto;
`;

export const s_action = css`
    display: flex;
    padding: 1rem 4rem 2rem 4rem;
`;

export const s_selectContainer = css`
    display: flex;
    flex-direction: column;
    height: 100%;
    padding: 1rem 1rem 1rem 1rem;
    gap: 1rem;
`;

export const s_perInformationContainer = css`
    display: flex;
    flex-direction: column;
    border: 1px solid ${theme.colors.gray[200]};
    border-radius: 8px;
    width: 38rem;
    padding: 1.5rem;
`;

export const s_emptyPlace = css`
    height: 100%;
`;

export const s_actionButton = css`
    width: 6rem;
    height: 3.5rem;
`;

export const s_informationContainer = css`
    display: flex;
    flex-direction: column;
    border: 1px solid ${theme.colors.gray[200]};
    border-radius: 8px;
    height: 100%;
    max-height: 50rem;
    width: 38rem;
    padding: 1.5rem;
    /* gap: 1rem; */
`;

export const s_textAreaInner = css`
    ${theme.typography.captionRegular}
    margin: -2.5rem 0;
    padding: 1rem 1.5rem;
    min-height: 30rem;
    height: 100%;

    ::placeholder {
        ${theme.typography.captionRegular}
    }

    &:focus {
        border-color: ${theme.colors.default};
        outline: none;
    }
`;

export const s_textareaInner = css`
    ${theme.typography.captionRegular}
    margin: -2.5rem 0;
    padding: 1rem 1.5rem;
    min-height: 35rem;
    height: 100%;

    ::placeholder {
        ${theme.typography.captionRegular}
    }
    &:focus {
        border-color: ${theme.colors.default};
        outline: none;
    }
`;

export const s_textAreaOuter = css`
    height: 100%;
    margin: 0;
`;

export const s_informationInput = css`
    display: flex;
    gap: 5rem;
`;

export const s_perInformationInput = css`
    display: flex;
    flex-direction: column;
`;

export const s_informationInputCss = (isError: boolean) => css`
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

export const s_inputFormSection = css`
    display: flex;
    height: 3rem;
    align-items: center;
    margin: 0.5rem 0;
`;

export const s_calendar = css`
    margin: 1.5rem 0;
    width: 100%;
    height: 28rem;
`;

export const s_helper = css`
    ${theme.typography.helperTextRegular}
    margin: -0.3rem 0.5rem;
`;

export const s_numberUnitText = css`
    margin: 0 0 0 -7.5rem;
`;

export const s_textAndTooltipContainer = css`
    display: flex;
    gap: 0.5rem;
`;

export const s_informSvgWrapper = css`
    margin: 0.4rem 0 0 0;
    align-items: center;
`;

export const s_informSvg = css`
    width: 1.5rem;
    height: 1.5rem;
    color: ${theme.colors.gray[700]};
    &:hover {
        cursor: pointer;
    }
`;

export const s_tooltipContent = css`
    white-space: pre-line;
`;

export const s_buttonGrid = css`
    display: grid;
    grid-template-columns: repeat(3, 1fr); // 가로 3개
    grid-gap: 0.5rem; // 버튼 간격
`;

export const s_numberButton = (isSelected: boolean) => css`
    height: 3.8rem;
    ${isSelected &&
    css`
        background-color: rgba(${hexToRgb(theme.colors.default)}, 0.1);
        color: ${theme.colors.default};
        border-color: ${theme.colors.default};
    `};
`;

export const s_contentText = css`
    margin: 0 0 1rem 0;
`;

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

export const s_stepContainer = css`
    animation: ${fadeIn} 0.3s ease forwards;
`;
