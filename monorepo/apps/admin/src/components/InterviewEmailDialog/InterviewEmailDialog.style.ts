import { css } from '@emotion/react';

import theme from '@ssoc/styles';

export const s_dialogContent = css`
    flex-direction: row;
`;

export const s_dialogAction = css`
    padding: 0 3.5rem 2.5rem 3.5rem;
`;

export const s_scheduleContainer = css`
    flex: 5;
    height: 100%;
    width: 100%;
    display: flex;
    flex-direction: column;
    padding: 1rem;
`;

export const s_emailContainer = css`
    flex: 5;
    height: 100%;
    padding: 1rem 1rem;
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
    justify-content: center;
`;

export const s_scheduleContentContainer = css`
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
    border: 1px solid ${theme.colors.gray[300]};
    border-radius: 9px;
    padding: 1rem;
`;

export const s_titleText = css`
    margin: 1.5rem 0 2rem 0;
`;

export const s_divider = css`
    margin: 0 0;
`;

export const s_titleWrapper = css`
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 1rem;
`;

export const s_titleInput = css`
    border: 1px solid ${theme.colors.gray[500]};
    border-radius: 8px;
    padding-left: 1rem;
    ${theme.typography.captionRegular}
`;

export const s_input = css`
    ::placeholder {
        ${theme.typography.captionRegular}
    }
`;

export const s_contentWrapper = css`
    flex: 9;
    display: flex;
    flex-direction: column;
    min-height: 35rem;
    gap: 1rem;
`;

export const s_editorRoot = css`
    min-width: 43rem;
    min-height: 35rem;
    height: 100%;
    justify-content: start;
`;

export const s_editorToolbar = css`
    height: 4rem;
    max-height: 4rem;
    background-color: ${theme.colors.white};
    border-radius: 8px;
    border: 1px solid ${theme.colors.gray[500]};
`;

export const s_editorTextarea = css`
    flex: 1;
    border-radius: 8px;
    transition: border-color 0.3s ease-in-out;
    &:focus {
        border-color: ${theme.colors.default};
        outline: none;
    }
`;

export const s_verticalDivider = css`
    border-left: 1px solid ${theme.colors.gray[200]};
    height: 100%;
    margin: 0 1rem;
`;

export const s_textAndTooltipContainer = css`
    display: flex;
    gap: 0.5rem;
`;

export const s_dialog = css`
    max-width: 64dvw;
    max-height: 90dvh;
    min-width: 115rem;
`;

export const s_header = css`
    justify-content: space-between;
    padding: 1.4rem 3rem;
`;

export const s_dateHeader = css`
    padding: 0.5rem 0.5rem;
`;

export const s_slotRow = css`
    display: flex;
    justify-content: flex-start; // 시작점으로 정렬
    align-items: center;
    padding: 0.2rem 0.5rem;
`;

export const s_slotInfo = css`
    display: flex;
    align-items: center;
`;

export const s_slotText = css`
    margin-right: 1.5rem;
    min-width: 120px;
`;

export const s_slotTitle = css`
    display: flex;
    flex-direction: column;
    padding: 0 2rem;
`;

export const s_allSlotContainer = css`
    display: flex;
    flex-direction: column;
    padding: 1rem 2rem;
    gap: 1rem;
    overflow-y: auto;
`;

export const s_perSlotContainer = css`
    display: flex;
    padding: 0 0 1rem 0;
    border-bottom: 1px solid ${theme.colors.gray[300]};
    &:last-of-type {
        border-bottom: none;
    }
`;

export const s_timeAndNumberContainer = css`
    display: flex;
    flex-direction: column;
    gap: 0.8rem;
`;

export const s_warningContainer = css`
    display: flex;
    flex-direction: column;
    height: 100%;
    align-items: center;
    justify-content: center;
    gap: 1rem;
`;

export const s_iconContainer = css`
    margin-bottom: 1rem;
    display: flex;
    align-items: center;
    justify-content: center;
`;

export const s_warningIconWrapper = css`
    display: flex;
    align-items: center;
    justify-content: center;
`;

export const s_warningIcon = css`
    width: 8rem;
    height: 8rem;
    fill: ${theme.colors.black};
`;

export const s_buttonToMove = css`
    width: 12rem;
    height: 3rem;
`;
