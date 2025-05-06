import { css } from '@emotion/react';
import theme from '@styles/theme';

export const clubApplyPageContainer = css`
    width: 100%;
    height: 100%;
    padding-top: 2rem;
`;

export const svgContainer = css`
    width: 4rem;
    height: 4rem;
`;

export const clubLogoAndNameContainer = css`
    display: flex;
    align-items: center;
    gap: 1.5rem;
    width: 20rem;
    max-width: 30rem;
    height: 4rem;
`;

export const clubNameContainer = css`
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    ${theme.typography.h4Bold};
`;

export const clubTagContainer = css`
    ${theme.typography.subCaptionLight};
    color: ${theme.colors.gray[300]};
`;

export const clubApplyTabContainer = css`
    display: flex;
    align-items: center;
    gap: 1rem;
    width: 100%;
    margin: 5rem 0;
    border-bottom: 1px solid ${theme.colors.gray[300]};
`;
//active 받아서 탭 관리
export const clubApplyTabName = css`
    ${theme.typography.subCaptionRegular};
    color: ${theme.colors.gray[400]};
    padding: 0;
`;

export const clubApplyFormConatiner = css`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;

    margin: 3rem 0;
`;

export const clubApplyForm = css`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 0.5rem;
    border: 1px solid ${theme.colors.gray[300]};
    border-radius: 5px;
    width: 80%;
    height: 10rem;
    padding: 1.5rem 1.5rem;
    margin: 2.5rem 0;
    box-shadow: 3px 3px 5px rgba(0, 0, 0, 0.16);
`;
