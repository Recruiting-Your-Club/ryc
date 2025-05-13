import { css } from '@emotion/react';

export const recruitmentContainer = css`
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
`;
export const recruitCell = css`
    display: flex;
    justify-content: center;
    align-items: center;
`;
