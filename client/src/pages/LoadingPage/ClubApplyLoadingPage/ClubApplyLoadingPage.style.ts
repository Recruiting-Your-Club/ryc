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

export const skeletonClubApplyPage = css`
    width: 100%;
    height: 100%;
    min-height: 115rem;
    display: flex;
    justify-content: center;
    align-items: flex-start;
    gap: 3rem;
    padding: 2rem;
    padding-bottom: 0;
    background-color: ${theme.colors.gray[100]};
    @media (max-width: ${theme.breakpoint.tablet}) {
        flex-direction: column;
        padding: 1rem;
        align-items: center;
        justify-content: center;
        gap: 3rem;
        min-height: 100dvh;
    }
    @media (max-width: ${theme.breakpoint.mobile}) {
        width: 100%;
        flex-direction: column;
    }
`;

export const skeletonClubApplyPageMainContainer = css`
    width: 100%;
    height: 100%;
    max-width: 95rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 2rem 0;
    background-color: ${theme.colors.white};
    border: 1px solid ${theme.colors.gray[200]};
    border-radius: 10px;
    position: relative;
    @media (max-width: ${theme.breakpoint.tablet}) {
        width: 80%;
        padding: 1rem 4rem;
        margin: 0;
    }
    @media (max-width: ${theme.breakpoint.tabletMini}) {
        width: 75%;
        padding: 1rem 4rem;
        margin: 0;
    }
    @media (max-width: ${theme.breakpoint.mobile}) {
        width: 100%;
        padding: 1rem 3rem;
    }
`;

export const skeletonClubLogoAndNameContainer = css`
    display: flex;
    align-items: center;
    gap: 1rem;
    width: 90%;
    max-width: 80rem;
    max-height: 4.5rem;
    margin-bottom: 2rem;
    margin-top: 1rem;

    @media (max-width: ${theme.breakpoint.tablet}) {
        margin-top: 2rem;
    }

    @media (max-width: ${theme.breakpoint.mobile}) {
        gap: 1rem;
        height: 3rem;
        margin-top: 2rem;
    }
`;

export const skeletonClubLogo = css`
    ${skeletonBase};
    width: 4.5rem;
    height: 4.5rem;
    border-radius: 10px;

    @media (max-width: ${theme.breakpoint.mobile}) {
        width: 4rem;
        height: 4rem;
    }
`;

export const skeletonClubNameContainer = css`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    margin-bottom: 0.5rem;
    gap: 0.5rem;
`;

export const skeletonClubName = css`
    ${skeletonBase};
    width: 200px;
    height: 28px; /* h3Semibold 크기에 맞춤 */
`;

export const skeletonClubCategory = css`
    ${skeletonBase};
    width: 120px;
    height: 16px; /* subCaptionRegular 크기에 맞춤 */
`;

export const skeletonMobileQuestionStatus = css`
    position: absolute;
    right: 5rem;
    top: 10.5rem;
    display: flex;
    align-items: center;
    gap: 0.5rem;
    display: none;

    @media (max-width: ${theme.breakpoint.tablet}) {
        display: flex;
        right: 8rem;
        top: 10rem;
    }

    @media (max-width: ${theme.breakpoint.mobile}) {
        right: 5rem;
        top: 8.3rem;
    }
`;

export const skeletonQuestionDropdown = css`
    ${skeletonBase};
    width: 120px;
    height: 40px;
    border-radius: 8px;
`;

export const skeletonClubApplyTabContainer = css`
    width: 90%;
    max-width: 80rem;
    display: flex;
    flex-direction: column;
`;

export const skeletonTabNavigation = css`
    display: flex;
    gap: 1rem;
    margin-bottom: 2rem;
`;

export const skeletonTabItem = css`
    ${skeletonBase};
    width: 100px;
    height: 40px;
    border-radius: 8px;
`;

export const skeletonSubmitCardContainer = css`
    position: sticky;
    top: 8rem;
    align-self: flex-start;
`;

export const skeletonSubmitCard = css`
    background-color: ${theme.colors.white};
    border: 1px solid ${theme.colors.gray[200]};
    border-radius: 10px;
    padding: 2rem;
    width: 25rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

export const skeletonSubmitCardHeader = css`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1rem;
`;

export const skeletonSubmitCardLogo = css`
    ${skeletonBase};
    width: 3rem;
    height: 3rem;
    border-radius: 8px;
`;

export const skeletonSubmitCardDeadline = css`
    ${skeletonBase};
    width: 100px;
    height: 16px;
`;

export const skeletonSubmitCardTitle = css`
    ${skeletonBase};
    width: 80%;
    height: 24px;
`;

export const skeletonSubmitCardCategory = css`
    ${skeletonBase};
    width: 60%;
    height: 16px;
`;

export const skeletonSubmitCardDescription = css`
    ${skeletonBase};
    width: 100%;
    height: 16px;
    margin-bottom: 1rem;
`;

export const skeletonSubmitCardProgress = css`
    ${skeletonBase};
    width: 100%;
    height: 8px;
    border-radius: 4px;
    margin-bottom: 1rem;
`;

export const skeletonSubmitCardButton = css`
    ${skeletonBase};
    width: 100%;
    height: 40px;
    border-radius: 8px;
`;

export const skeletonSubmitButtonContainer = css`
    width: 100%;
    height: 4rem;
    display: none;
    box-shadow: 0px 0px 4px 2px rgba(55, 53, 47, 0.4);
    border-radius: 10px;
    top: 93%;
    opacity: 0.9;

    @media (max-width: ${theme.breakpoint.tablet}) {
        display: flex;
        align-items: center;
        justify-content: center;
        position: fixed;
        width: 65%;
        padding: 0.75rem 0;
        top: 95%;
    }

    @media (max-width: ${theme.breakpoint.tabletMini}) {
        width: 60%;
        padding: 0.7rem 0;
    }

    @media (max-width: ${theme.breakpoint.mobile}) {
        width: 80%;
        padding: 0.5rem 0;
        top: 93%;
    }
`;

export const skeletonSubmitButton = css`
    ${skeletonBase};
    width: 100%;
    height: 4rem;
    border-radius: 8px;
`;

export const skeletonQuestionFormContainer = css`
    display: flex;
    flex-direction: column;
    width: 100%;
    max-width: 80rem;
    margin: 2rem 0;
    gap: 2rem;

    @media (max-width: ${theme.breakpoint.mobile}) {
        margin: 2.5rem 0;
    }
`;

export const skeletonQuestionForm = css`
    background-color: ${theme.colors.white};
    border: 1px solid ${theme.colors.gray[200]};
    border-radius: 8px;
    padding: 1.5rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;
`;

export const skeletonQuestionLabel = css`
    display: flex;
    align-items: center;
    gap: 0.5rem;
`;

export const skeletonQuestionTitle = css`
    ${skeletonBase};
    width: 120px;
    height: 20px;
`;

export const skeletonRequiredStar = css`
    ${skeletonBase};
    width: 8px;
    height: 8px;
    border-radius: 50%;
`;

export const skeletonQuestionInput = css`
    ${skeletonBase};
    width: 100%;
    height: 48px;
    border-radius: 8px;
`;
