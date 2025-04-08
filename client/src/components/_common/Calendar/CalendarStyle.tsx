import { css } from '@emotion/react';
import theme from '@styles/theme';

export const calendarContainer = css`
    display: flex;
    flex-direction: column;
    padding: 2rem;
    // 가로 크기로 전체 캘린더 크기 조정
`;

export const calendarHeaderContainer = css`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem;
    margin-bottom: 1rem;
    ${theme.typography.bodyBold}
`;

export const calendarBodyContainer = css`
    display: flex;
    flex-direction: column;
    align-items: center;
`;

export const weekdaysContainer = css`
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    gap: 0.5rem;
    margin-bottom: 1rem;
    text-align: center;
    width: 100%;
`;

export const daysContainer = css`
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    grid-template-rows: repeat(6, 1fr);
    width: 100%;
    gap: 0.5rem;
`;

export const weekendColor = (index: number) => {
    if (index % 7 === 0) {
        return css`
            color: ${theme.colors.red[900]};
        `;
    } else if (index % 7 === 6) {
        return css`
            color: #2020fb;
        `;
    }
};

export const weekCell = (index: number) => {
    return weekendColor(index);
};

export const dayCell = (index: number) => {
    return css`
        background-color: transparent;
        width: 100%;
        height: 100%;
        padding: 0.5rem;
        cursor: pointer;
        ${weekendColor(index)}
        // 세로 크기로 각 셀의 크기 조정
        &:hover {
            background-color: #f0f0f0;
            border-radius: 7px;
        }
    `;
};
