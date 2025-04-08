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
    // 세로 크기로 각 셀의 크기 조정
`;

const weekendColor = (index: number) => {
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

const selectedColor = (startDay: number, endDay: number, index: number) => {
    if (index === startDay - 1 || (index >= startDay - 1 && index <= endDay - 1)) {
        return css`
            background-color: ${theme.colors.default};
            color: white;
            &:hover {
                background-color: ${theme.colors.default}; /* 호버 시에도 동일 색상 유지 */
            }
        `;
    }
};
export const weekCell = (index: number) => {
    return weekendColor(index);
};

export const dayCell = (startDay: number, endDay: number, index: number) => {
    return css`
        background-color: transparent;
        width: 100%;
        height: 100%;
        padding: 0.5rem;
        border-radius: 5px;
        ${weekendColor(index)}
        &:hover {
            background-color: #f0f0f0;
        }
        ${selectedColor(startDay, endDay, index)}
    `;
};
