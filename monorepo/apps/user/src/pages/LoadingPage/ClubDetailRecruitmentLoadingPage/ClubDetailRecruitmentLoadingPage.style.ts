import { css, keyframes } from '@emotion/react';

import theme from '@ssoc/styles';

const pulse = keyframes`
  0% {
    background-color: ${theme.colors.gray[100]};
  }
  50% {
    background-color: ${theme.colors.gray[200]};
  }
  100% {
    background-color: ${theme.colors.gray[100]};
  }
`;

export const skeletonBase = css`
    background-color: #f0f0f0;
    border-radius: 4px;
    animation: ${pulse} 1.5s infinite ease-in-out;
`;

export const skeletonRecruitmentContainer = css`
    padding: 2rem;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    row-gap: 2rem;
    @media (max-width: 768px) {
        grid-template-columns: repeat(2, 1fr);
    }
    @media (max-width: 480px) {
        grid-template-columns: repeat(1, 1fr);
    }
`;

export const skeletonRecruitCell = css`
    display: flex;
    justify-content: center;
    align-items: center;
    background: transparent;
`;

export const skeletonRecruitCard = css`
    display: flex;
    flex-direction: column;
    width: 25rem;
    height: 15rem;
    background-color: ${theme.colors.white};
    border-radius: 10px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    padding: 0.5rem 1rem;
    transition: background-color 0.1s ease;
    :hover {
        background-color: ${theme.colors.gray[100]};
    }
    @media (max-width: ${theme.breakpoint.mobile}) {
        width: 28rem;
    }
    @media (max-width: ${theme.breakpoint.mobileMini}) {
        width: 25rem;
    }
`;

export const skeletonCardHeader = css`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem;
    gap: 1rem;
`;

export const skeletonCardTitle = css`
    ${skeletonBase};
    width: 60%;
    height: 20px;
`;

export const skeletonCardDeadline = css`
    ${skeletonBase};
    width: 80px;
    height: 16px;
`;

export const skeletonCardBody = css`
    display: flex;
    flex-wrap: wrap;
    flex: 1;
    padding: 1rem;
    overflow: hidden;
    text-overflow: ellipsis;
`;

export const skeletonCardContent = css`
    ${skeletonBase};
    width: 100%;
    height: 16px;
    margin-bottom: 0.5rem;

    &:nth-of-type(2) {
        width: 90%;
    }

    &:nth-of-type(3) {
        width: 70%;
    }
`;

export const skeletonCardFooter = css`
    display: flex;
    width: 23rem;
    padding: 1rem;
    gap: 0.5rem;
`;

export const skeletonCardTags = css`
    ${skeletonBase};
    width: 100%;
    height: 16px;
`;
