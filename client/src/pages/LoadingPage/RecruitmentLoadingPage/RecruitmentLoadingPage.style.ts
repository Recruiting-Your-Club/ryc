import { css, keyframes } from '@emotion/react';
import theme from '@styles/theme';

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
    background-color: ${theme.colors.gray[100]};
    border-radius: 4px;
    animation: ${pulse} 1.5s infinite ease-in-out;
`;

export const skeletonRecruitmentContainer = css`
    position: relative;
    width: 100%;
    height: 100%;
    background-color: ${theme.colors.gray[100]};
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 2rem 0;
`;

export const skeletonContentContainer = css`
    max-width: 90rem;
    min-height: 130rem;
    width: 100%;
    flex: 1;
    background-color: ${theme.colors.white};
    border-radius: 10px;
    border: 1px solid ${theme.colors.gray[200]};
    padding: 2rem 3rem;
    @media (min-width: ${theme.breakpoint.tabletMini}) {
        padding: 4rem 6rem;
    }
`;

export const skeletonContentHeader = css`
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    margin-bottom: 4rem;
    padding: 0 1rem;
`;

export const skeletonTitle = css`
    ${skeletonBase};
    width: 60%;
    height: 48px; /* h1Semibold 크기에 맞춤 */
    margin-bottom: 0.5rem;
`;

export const skeletonHeaderSubContainer = css`
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

export const skeletonClubNameContainer = css`
    display: flex;
    align-items: center;
    gap: 1rem;
`;

export const skeletonClubName = css`
    ${skeletonBase};
    width: 120px;
    height: 24px; /* h4Light 크기에 맞춤 */
`;

export const skeletonStatusTag = css`
    ${skeletonBase};
    width: 80px;
    height: 32px;
    border-radius: 16px;
`;

export const skeletonApplyButton = css`
    ${skeletonBase};
    width: 25rem;
    height: 4rem;
    border-radius: 8px;
    @media (max-width: ${theme.breakpoint.mobile}) {
        display: none;
    }
`;

export const skeletonContentBody = css`
    display: flex;
    flex-direction: column;
    flex: 1;
    gap: 10rem;
`;

export const skeletonClubBoxContainer = css`
    display: flex;
    flex-direction: column;
    gap: 1rem;
    padding: 2rem;
    background-color: ${theme.colors.gray[100]};
    border-radius: 8px;
`;

export const skeletonClubBoxItem = css`
    display: flex;
    align-items: center;
    gap: 1rem;
`;

export const skeletonClubBoxLabel = css`
    ${skeletonBase};
    width: 40%;
    height: 20px;
`;

export const skeletonClubBoxValue = css`
    ${skeletonBase};
    width: 60%;
    height: 20px;
`;

export const skeletonTextContainer = css`
    padding: 0 2rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;
`;

export const skeletonDescriptionText = css`
    ${skeletonBase};
    width: 100%;
    height: 20px;

    &:nth-of-type(2) {
        width: 90%;
    }

    &:nth-of-type(3) {
        width: 70%;
    }
`;

export const skeletonImageListContainer = css`
    display: grid;
    justify-content: center;
    grid-template-columns: repeat(3, 1fr);
    padding: 4rem 3rem;
    gap: 0.5rem;
    width: 100%;
    @media (min-width: 480px) {
        grid-template-columns: repeat(4, 1fr);
    }
`;

export const skeletonImageItem = css`
    ${skeletonBase};
    aspect-ratio: 1 / 1;
    border-radius: 10px;
`;

export const skeletonApplyButtonMobile = css`
    ${skeletonBase};
    position: fixed;
    bottom: 1rem;
    left: 0;
    right: 0;
    margin: 0 4rem;
    height: 4rem;
    border-radius: 8px;
    z-index: 100;
    opacity: 0.9;
    @media (min-width: ${theme.breakpoint.mobile}) {
        display: none;
    }
`;
