import { css } from '@emotion/react';

import theme from '@ssoc/styles';
import { hexToRgb } from '@ssoc/utils';

export const s_applicantSchedulePageContainer = css`
    width: 100%;
    height: 100%;
    max-height: 100vh;
    overflow: visible;
    padding: 2rem 2rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
`;

export const s_alertSvgWrapper = css`
    display: flex;
    align-items: center;
`;

export const s_contentContainer = css`
    display: flex;
    padding: 0rem 2rem;
    flex: 1;
    justify-content: center;
`;

export const s_arrowContainer = css`
    flex: 0.05;
`;

export const s_contentComponentWrapper = css`
    flex: 3;
    height: 100%;
    padding: 1.5rem 1.8rem;
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
    box-shadow: 0px 0px 30px 0px rgba(${hexToRgb(theme.colors.default)}, 0.2);
`;

export const s_alertSvg = css`
    color: ${theme.colors.gray[500]};
    width: 2rem;
    height: 2rem;
    cursor: pointer;
`;

export const s_dropdownContent = css`
    /* 추후 dropdown컴포넌트 리팩토링 버전 도입 후 구현 예정 */
`;
