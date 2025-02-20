import { css } from '@emotion/react';

export const headerCss = css`
    position: fixed;
    top: 0;
    left: 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100vw;
    height: 5rem;
    padding: 2rem;
`;
export const globalLayoutCss = css`
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
    min-width: 32rem;
    background-color: #fff;
    padding-top: 5rem; /* 헤더 높이만큼 패딩 추가 */
`;
