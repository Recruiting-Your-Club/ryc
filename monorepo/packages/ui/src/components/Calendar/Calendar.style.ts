import { css } from '@emotion/react';

import theme from '@ssoc/styles';

import { SATURDAY, SUNDAY } from '../../constants/calendar';
import type { CalendarData, CalendarProps, Size, SizeStyle } from './types';

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

export const daysContainer = (mode: CalendarProps['mode'], disabled: boolean) => css`
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
    ${disabled &&
    css`
        pointer-events: none;
        opacity: 0.6;
    `}
`;

export const weekendColor = (weekend: number) => {
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

const currentMonthColor = (isCurrentMonth: boolean) => css`
    ${!isCurrentMonth &&
    css`
        opacity: 0.5;
    `}
`;

const SelectedColor = (isSelected: boolean) => {
    return css`
        opacity: 0.9;
        ${isSelected &&
        css`
            background-color: ${theme.colors.blue[100]};
            color: ${theme.colors.default};
            :hover {
                opacity: 1;
                color: ${theme.colors.defaultHover};
            }
        `}
    `;
};

const rangeSelected = (selectedDate: string[], date: CalendarData) => {
    if (selectedDate.length === 2) {
        if (selectedDate[0] <= date.dateString && date.dateString <= selectedDate[1]) {
            return css`
                background-color: ${theme.colors.blue[100]};
                color: ${theme.colors.default};
                border-radius: 0;
                ${selectedDate[0] === date.dateString &&
                css`
                    background-color: ${theme.colors.blue[300]};
                    color: ${theme.colors.white};
                    border-top-left-radius: 15px;
                    border-bottom-left-radius: 15px;
                `}
                ${selectedDate[1] === date.dateString &&
                css`
                    background-color: ${theme.colors.blue[300]};
                    color: ${theme.colors.white};
                    border-top-right-radius: 15px;
                    border-bottom-right-radius: 15px;
                `}
            `;
        }
    } else {
        if (selectedDate[0] === date.dateString) {
            return css`
                background-color: ${theme.colors.blue[100]};
                color: ${theme.colors.default};
            `;
        }
    }
};
const onlySelectedCalendar = (isSelected: boolean) => {
    return css`
        ${!isSelected &&
        css`
            color: ${theme.colors.gray[400]};
            cursor: not-allowed;
            pointer-events: none;
        `}
        ${isSelected &&
        css`
            opacity: 1;
        `}
    `;
};
export const highlightDate = (highlightedDate: string[], date: CalendarData) => {
    return css`
        ${highlightedDate.includes(date.dateString) &&
        css`
            background-color: ${theme.colors.blue[300]};
            color: ${theme.colors.white};
            &:hover {
                background-color: ${theme.colors.blue[300]};
                color: ${theme.colors.white};
                opacity: 0.9;
            }
        `}
    `;
};
export const dayCell = (
    selectedDate: string[],
    date: CalendarData,
    today: boolean,
    isSelected: boolean,
    onlySelected: boolean,
    mode: CalendarProps['mode'],
    highlightedDate: string[],
) => {
    return css`
        background-color: transparent;
        width: 100%;
        height: 100%;
        padding: 0.5rem;
        border-radius: 10px;
        ${theme.typography.captionSemibold}
        ${today &&
        css`
            background-color: ${theme.colors.gray[200]};
        `}
        ${weekendColor(date.weekend)}
        ${mode !== 'range' && SelectedColor(isSelected)}
        ${mode === 'range' && rangeSelected(selectedDate, date)}
        ${currentMonthColor(date.isCurrentMonth)}
        ${onlySelected && onlySelectedCalendar(isSelected)}
        ${highlightDate(highlightedDate, date)}
        transition: background-color 0.15s ease;
    `;
};
