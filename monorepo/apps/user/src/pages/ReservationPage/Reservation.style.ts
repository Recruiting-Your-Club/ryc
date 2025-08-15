import { css } from '@emotion/react';

import theme from '@ssoc/styles';

export const s_temp = css`
    width: 100%;
    height: 100%;
    padding: 1rem;
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
    @media (min-width: ${theme.breakpoint.tabletMini}) {
        border-right: 1px solid ${theme.colors.gray[200]};
    }
    @media (min-width: ${theme.breakpoint.tablet}) {
        flex: 1;
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
export const s_timeButton = (isSelected: boolean) => css`
    ${theme.typography.captionRegular}
    display: flex;
    justify-content: center;
    align-items: center;
    box-sizing: border-box;
    white-space: nowrap;
    padding: 0.5rem 1rem;
    height: 3.6rem;
    background-color: transparent;
    border-radius: 8px;
    border: 1px solid ${theme.colors.gray[200]};
    ${isSelected &&
    css`
        background-color: ${theme.colors.blue[100]};
        color: ${theme.colors.blue[200]};
    `}
`;

export const s_reserveButtonWrapper = css`
    width: 100%;
    @media (min-width: ${theme.breakpoint.mobile}) {
        padding: 0 2rem;
    }
`;

export const s_successContainer = css`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    gap: 1rem;
    padding: 2rem;
    width: 100%;
    height: 100%;
    max-width: 40rem;
    max-height: 60rem;
    box-shadow: 0px 0px 30px 0px rgba(0, 27, 55, 0.1);
    border-radius: 10px;
`;

export const s_successTitleWrapper = css`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 1rem;
    margin-bottom: 2rem;
`;

export const s_checkIconWrapper = css`
    width: 7rem;
    height: 7rem;
    padding: 1rem;
    border-radius: 50%;
    background-color: ${theme.colors.blue[100]};
`

export const s_checkIcon = css`
    width: 100%;
    height: 100%;
    color: ${theme.colors.default};
`;

export const s_infoContainer = css`
    display: flex;
    flex-direction: column;
    width: 100%;
    gap: 1rem;
`;

export const s_infoBox = (isPrimary?: boolean) => css`
    display: flex;
    align-items: center;
    gap: 1rem;
    padding: 1.5rem;
    border-radius: 10px;
    background-color: ${isPrimary ? theme.colors.blue[100] : theme.colors.gray[100]};
`;

export const s_infoTextWrapper = css`
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
`;

export const s_buttonContainer = css`
    display: flex;
    width: 100%;
    gap: 1rem;
    margin-top: 2rem;
`;
export const s_svgWrapper = css`
    width: 2rem;
    height: 2rem;
    display: flex;
    justify-content: center;
    align-items: center;
`