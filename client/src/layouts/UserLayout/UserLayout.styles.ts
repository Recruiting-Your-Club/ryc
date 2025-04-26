import { css } from '@emotion/react';

export const UserLayoutCss = css`
    display: flex;
    flex-direction: column;
    min-height: 100dvh;
    width: 100%;
    min-width: 32rem;
    background-color: #fff;

    main {
        flex: 1;
        padding-top: 6rem; /* 헤더 높이만큼 패딩 추가 */
        max-width: 75rem;
        margin: 0 auto;
        width: 100%;
    }
`;
