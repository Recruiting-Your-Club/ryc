import { css } from '@emotion/react';

export const recruitmentContainer = (hasRecruitment: boolean | undefined) => css`
    ${hasRecruitment &&
    css`
        padding: 2rem;
        display: grid;
        grid-template-columns: repeat(3, 1fr); // 기본 3열
        row-gap: 2rem;
        @media (max-width: 768px) {
            grid-template-columns: repeat(2, 1fr);
        }
        @media (max-width: 480px) {
            grid-template-columns: repeat(1, 1fr);
        }
    `}
    ${!hasRecruitment &&
    css`
        display: flex;
        flex-direction: column;
        gap: 1rem;
        align-items: center;
        justify-content: center;
    `}
`;
export const recruitCell = css`
    display: flex;
    justify-content: center;
    align-items: center;
    background: transparent;
`;

export const s_noRecruitmentContainer = css`
    display: flex;
    flex-direction: column;
    gap: 2rem;
    align-items: center;
    justify-content: center;
`;
