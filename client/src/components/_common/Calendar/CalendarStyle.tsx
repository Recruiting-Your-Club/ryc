import { css } from '@emotion/react';
import theme from '@styles/theme';

export const calendarContainer = css`
    display: flex;
    flex-direction: column;
    padding: 1rem 2rem 2rem 2rem;
    border-radius: 20px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
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

const selectedColor = (selectedDate: boolean, today: boolean) => {
    if (selectedDate) {
        return css`
            background-color: ${theme.colors.default};
            color: white;
            &:hover {
                background-color: ${theme.colors.default};
            }
        `;
    } else if (today) {
        return css`
            background-color: ${theme.colors.gray[200]};
            color: black;
            &:hover {
                background-color: ${theme.colors.default};
            }
        `;
    }
};
const currentMonthColor = (isCurrentMonth: boolean) => css`
    ${!isCurrentMonth &&
    css`
        opacity: 0.5;
    `}
`;

export const weekCell = (index: number) => {
    return weekendColor(index);
};

export const dayCell = (
    selectedDate: boolean,
    index: number,
    today: boolean,
    isCurrentMonth: boolean,
) => {
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
        ${selectedColor(selectedDate, today)}
        ${currentMonthColor(isCurrentMonth)}
    `;
};
