import { css } from '@emotion/react';

export const globalLayoutCss = css`
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
    min-width: 32rem;
    background-color: #fff;
    padding-top: 6rem; /* 헤더 높이만큼 패딩 추가 */
`;
