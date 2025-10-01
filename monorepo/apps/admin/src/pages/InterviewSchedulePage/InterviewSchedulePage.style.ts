import { css } from '@emotion/react';

import theme from '@ssoc/styles';
import { hexToRgb } from '@ssoc/utils';

export const s_pageContainer = css`
    width: 100%;
    height: 100vh;
    max-height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 2rem;
    gap: 1rem;
    overflow-y: auto;
`;

export const s_weekMover = css`
    /* width: 50rem; */
    width: 50%;
    min-width: 50rem;
    border: 1px solid ${theme.colors.gray[300]};
    border-radius: 10px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 1rem 1rem;
`;

export const s_polygonSvg = css`
    width: 2.5rem;
    height: 2.5rem;
    cursor: pointer;
`;

export const s_tableContainer = css`
    display: flex;
    /* width: 50rem; */
    width: 50%;
    min-width: 50rem;
    padding: 1rem 0;
`;

export const s_table = css`
    width: 100%;
    border-collapse: collapse;
    border: 1px solid ${theme.colors.gray[300]};
    font-size: 0.9rem;
    table-layout: fixed;
`;

export const s_th = css`
    padding: 0.75rem;
    background-color: ${theme.colors.gray[100]};
    font-weight: 600;
    border: 1px solid ${theme.colors.gray[300]};
    text-align: center;
`;

export const s_td = css`
    padding: 0.75rem;
    border: 1px solid ${theme.colors.gray[300]};
    text-align: center;
`;

export const s_timeHeaderCell = css`
    background-color: ${theme.colors.gray[100]};
    min-width: 70px;
`;

export const s_slotCellFilled = css`
    background-color: rgba(${hexToRgb(theme.colors.default)}, 0.8);
`;

export const s_slotCellEmpty = css`
    background-color: ${theme.colors.gray[400]};
`;

export const s_slotNumberText = css`
    color: ${theme.colors.white};
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
    width: 100%;
    gap: 0.8rem;
`;

export const s_dateHeader = css`
    padding: 0.5rem 0.5rem;
    white-space: nowrap;
`;

export const s_slotRow = css`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 0.5rem;
`;

export const s_slotInfo = css`
    display: flex;
    align-items: center;
    gap: 2rem;
`;

export const s_slotText = css`
    margin-right: 1.5rem;
    min-width: 100px;
`;

export const s_slotTitle = css`
    display: flex;
    flex-direction: column;
    padding: 0 2rem;
`;

export const s_scheduleContentContainer = css`
    display: flex;
    flex-direction: column;
    /* width: 50rem; */
    width: 50%;
    min-width: 50rem;
    min-height: 20rem;
    max-height: 60rem;
    border: 1px solid ${theme.colors.gray[300]};
    border-radius: 9px;
    padding: 1rem;
`;

export const s_titleText = css`
    margin: 1.5rem 0 2rem 0;
`;

export const s_titleAdditionText = css`
    ${s_titleText}
    ${theme.typography.captionSemibold};
    color: ${theme.colors.default};
    padding: 0;
`;

export const s_slotTitleTextContainer = css`
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

export const s_remindContainer = css`
    display: flex;
    flex-direction: column;
    /* width: 50rem; */
    width: 50%;
    min-width: 50rem;
    min-height: 20rem;
    max-height: 20rem;
    border: 1px solid ${theme.colors.gray[300]};
    border-radius: 9px;
    padding: 1rem 4rem;
    justify-content: center;
    margin: 1rem 0 3rem 0;
`;

export const s_radios = css`
    display: flex;
    flex-direction: column;
    gap: 2rem;
`;

export const s_warningContainer = css`
    display: flex;
    flex-direction: column;
    height: 100%;
    align-items: center;
    justify-content: center;
    gap: 1rem;
`;

export const s_buttonContainer = css`
    display: flex;
    gap: 0.5rem; /* 버튼 사이의 간격 */
`;

export const s_informSvgWrapper = css`
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

export const s_remindTitleContainer = css`
    display: flex;
    gap: 0.5rem;
    margin: 0 0 2rem 0;
`;
