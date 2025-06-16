import { css } from '@emotion/react';
import theme from '@styles/theme';
import type { Size, SizeStyle, CalendarData, CalendarProps } from './types';
import { SATURDAY, SUNDAY } from '@constants/calendar';

export const SizeMap: Record<Size, SizeStyle> = {
    sm: {
        width: '30rem',
        height: '32rem',
    },
    md: {
        width: '35rem',
        height: '37rem',
    },
    lg: {
        width: '40rem',
        height: '42rem',
    },
    full: {
        width: '100%',
        height: '100%',
    },
};

export const calendarContainer = ({ size, border, shadow, zIndex }: CalendarProps) => css`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 1rem;
    border-radius: 10px;
    ${border &&
    css`
        border: 1px solid ${theme.colors.gray[300]};
    `}
    ${shadow &&
    css`
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    `}
    width: ${SizeMap[size || 'md'].width};
    height: ${SizeMap[size || 'md'].height};
    z-index: ${zIndex || 1};
`;

export const calendarHeaderContainer = css`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0rem 1rem 1rem 1rem;
    margin-left: 1rem;
    width: 100%;
    ${theme.typography.bodyBold}
`;

export const monthControlButton = css`
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 5px;
    height: 2.7rem;
    width: 4rem;
    padding: 0.6rem;
    border: none;
    ${theme.typography.captionRegular};
    color: ${theme.colors.textHelper};
    transition: background-color 0.2s;
    background-color: transparent;
    &:hover {
        background-color: ${theme.colors.gray[100]};
    }
    &:disabled {
        cursor: not-allowed;
    }
    &:disabled:hover {
        background-color: transparent;
    }
`;

export const calendarBodyContainer = css`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
`;

export const weekdaysContainer = css`
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    gap: 0.5rem;
    margin-bottom: 1rem;
    text-align: center;
    width: 100%;
`;

export const daysContainer = (mode: CalendarProps['mode']) => css`
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    grid-template-rows: repeat(6, 1fr);
    width: 100%;
    height: 100%;
    row-gap: 0.5rem;
    ${mode !== 'range' &&
    css`
        gap: 0.5rem;
    `}
`;

const weekendColor = (weekend: number) => {
    if (weekend === SUNDAY) {
        return css`
            color: ${theme.colors.red[900]};
        `;
    } else if (weekend === SATURDAY) {
        return css`
            color: #2020fb;
        `;
    }
};

const selectedColor = (isSelected: boolean, today: boolean, disabled: boolean) => {
    if (isSelected) {
        return css`
            background-color: ${theme.colors.blue[100]};
            color: ${theme.colors.default};
            ${!disabled &&
            css`
                &:hover {
                    background-color: ${theme.colors.defaultHover};
                }
            `}
        `;
    } else if (today) {
        return css`
            background-color: ${theme.colors.gray[200]};
            ${!disabled &&
            css`
                &:hover {
                    color: ${theme.colors.white};
                    background-color: ${theme.colors.default};
                }
            `}
        `;
    }
};
const rangeSelectedColor = (selectedDate: string[], date: CalendarData, disabled: boolean) => {
    if (selectedDate.length === 2) {
        if (selectedDate[0] <= date.dateString && date.dateString <= selectedDate[1]) {
            return css`
                background-color: ${theme.colors.default};
                color: ${theme.colors.white};
                ${selectedDate[0] === date.dateString &&
                css`
                    border-top-left-radius: 10px;
                    border-bottom-left-radius: 10px;
                `}
                ${selectedDate[1] === date.dateString &&
                css`
                    border-top-right-radius: 10px;
                    border-bottom-right-radius: 10px;
                `}
                ${!disabled &&
                css`
                    &:hover {
                        background-color: ${theme.colors.defaultHover};
                    }
                `}
            `;
        }
    } else {
        if (selectedDate[0] === date.dateString) {
            return css`
                background-color: ${theme.colors.default};
                color: ${theme.colors.white};
            `;
        }
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
    selectedDate: string[],
    date: CalendarData,
    today: boolean,
    isSelected: boolean,
    disabled: boolean,
    mode: CalendarProps['mode'],
) => {
    return css`
        background-color: transparent;
        width: 100%;
        height: 100%;
        padding: 0.5rem;
        ${theme.typography.captionSemibold}
        transition: background-color 0.15s ease;
        ${weekendColor(date.weekend)}
        ${!disabled &&
        css`
            &:hover {
                background-color: ${theme.colors.gray[200]};
            }
        `}
        ${disabled &&
        css`
            opacity: 0.7;
            cursor: not-allowed;
        `}
        ${mode !== 'range' &&
        css`
            border-radius: 5px;
        `}
        ${mode !== 'range' && selectedColor(isSelected, today, disabled)}
        ${mode === 'range' && rangeSelectedColor(selectedDate, date, disabled)}
        ${currentMonthColor(date.isCurrentMonth)}
    `;
};
