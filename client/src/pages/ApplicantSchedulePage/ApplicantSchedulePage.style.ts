import { css } from '@emotion/react';
import theme from '@styles/theme';
import { hexToRgb } from '@utils/hexToRgb';

export const s_applicantSchedulePageContainer = css`
    width: 100%;
    height: 100%;
    max-height: 100vh;
    overflow: visible;
    padding: 3rem 2rem;
    display: flex;
    /* gap: 0.5rem; */
    justify-content: center;
`;

export const s_arrowContainer = css`
    flex: 0.05;
    /* background-color: olive; */
`;

export const s_contentComponentWrapper = css`
    flex: 3;
    height: 100%;
    /* background-color: gray; */
    padding: 2rem 1.8rem;
    align-items: center;
    justify-content: center;
    min-width: 28rem;
    max-width: 38rem;
    @media (max-width: 1600px) {
        padding: 2rem 0.3rem;
    }
`;

export const s_timeTable = css`
    justify-content: center;
    padding: 5rem 1.5rem;
    border-radius: 10px;
    box-shadow: 0px 0px 30px 0px rgba(0, 27, 55, 0.1);
    min-height: 20rem;
`;

export const s_buttonGroup = css`
    height: 22rem;
`;

export const s_selectionButton = css`
    border-color: ${theme.colors.gray[300]};
    border-radius: 20px;
    padding: 0 1.5rem;
    width: 11.5rem;
    height: 2.8rem;
    ${theme.typography.captionRegular}
`;

export const s_highlightedApplicantList = css`
    box-shadow: 0px 0px 30px 0px rgba(${hexToRgb(theme.colors.default)}, 0.25);
`;
