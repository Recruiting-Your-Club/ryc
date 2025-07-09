import { css } from '@emotion/react';

import theme from '@ssoc/styles';

export const s_temp = css`
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
`;
export const s_reservationContainer = css`
    display: flex;
    flex-direction: column;
    padding: 2rem 3rem;
    @media (min-width: ${theme.breakpoint.tabletMini}) {
        flex-direction: row;
        max-height: 70rem;
    }
    @media (min-width: ${theme.breakpoint.tablet}) {
        min-width: 70rem;
    }
    width: 100%;
    height: 100%;
    max-width: 90rem;
    box-shadow: 0px 0px 30px 0px rgba(0, 27, 55, 0.1);
    border-radius: 10px;
    gap: 1rem;
`;

export const s_leftContainer = css`
    display: flex;
    flex-direction: column;
    align-items: start;
    flex: 1;
    @media (min-width: ${theme.breakpoint.tabletMini}) {
        border-right: 1px solid ${theme.colors.gray[200]};
    }
`;
export const s_clubInfoWrapper = css`
    display: flex;
    align-items: center;
    width: 100%;
    gap: 1rem;
    padding-bottom: 1rem;
    @media (max-width: ${theme.breakpoint.mobile}) {
        border-bottom: 1px solid ${theme.colors.gray[300]};
    }
`;
export const s_clubTextWrapper = css`
    display: flex;
    flex-direction: column;
    align-items: start;
    justify-content: space-between;
    padding-bottom: 0.2rem;
    min-width: 0;
    > div {
        width: 100%;
    }
`;
export const s_descriptionWrapper = css`
    display: flex;
    flex-direction: column;
    margin-top: 1rem;
`;
export const s_rightContainer = css`
    display: flex;
    flex-direction: column;
    flex: 1;
    height: 100%;
    gap: 1rem;
    border: 1px solid ${theme.colors.gray[200]};
    padding: 1rem;
    border-radius: 10px;
`;
export const s_calendarContainer = css`
    display: flex;
    justify-content: center;
    align-items: center;
    flex: 3;
    height: 100%;
`;
export const s_selectedDateWrapper = css`
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    padding: 0 2rem;
`;
export const s_selectExampleWrapper = css`
    display: flex;
    align-items: center;
    gap: 0.5rem;
`;
export const s_possibleBox = css`
    width: 1.2rem;
    height: 1.2rem;
    background-color: ${theme.colors.default};
`;
export const s_impossibleBox = css`
    width: 1.2rem;
    height: 1.2rem;
    background-color: ${theme.colors.gray[300]};
`;
export const s_timeContainer = css`
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 0.5rem;
    flex: 1;
    width: 100%;
    height: 100%;
    @media (min-width: ${theme.breakpoint.mobile}) {
        padding: 1rem 2rem;
    }
`;
export const s_timeButton = css`
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0.5rem 1rem;
    border: 1px solid ${theme.colors.gray[200]};
    :hover {
        color: white;
        background-color: ${theme.colors.default};
        border: none;
        cursor: pointer;
    }
`;

export const s_reserveButtonWrapper = css`
    width: 100%;
    @media (min-width: ${theme.breakpoint.mobile}) {
        padding: 0 2rem;
    }
`;
