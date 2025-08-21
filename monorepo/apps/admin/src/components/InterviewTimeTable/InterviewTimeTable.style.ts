import { css } from '@emotion/react';

export const s_interviewTimeTableContainer = css`
    display: flex;
    flex-direction: column;
    padding: 2rem 2.5rem;
    gap: 2rem;
    align-items: center;
    justify-content: center;
    height: 100%;
`;

export const s_calendar = css`
    width: 25rem;
    height: 30rem;
`;

export const s_timeContentContainer = css`
    display: flex;
    flex-direction: column;
    gap: 1rem;
    width: 100%;
`;

export const s_interviewInformationButtonGroupWrapper = (isSchedule: boolean = true) => css`
    display: flex;
    flex-direction: column;
    height: 100%;
    gap: 1rem;
    padding: 0 0.5rem;
    overflow-y: auto;
    ${!isSchedule &&
    css`
        justify-content: center;
    `}
`;
