import { css } from '@emotion/react';
import theme from '@styles/theme';

export const scrollBarStyle = (height?: string) => css`
    overflow-y: auto;

    // Chrome, edge, safari에서 scrollbar를 적용하려면 -webkit-scrollbar로 적용시켜야한다.

    // 전체 스크롤바
    &::-webkit-scrollbar {
        width: 0.8rem;
        height: ${height ?? '100%'};
    }

    // 스크롤바에서 움직이는 부분을 제외한 나머지 부분
    &::-webkit-scrollbar-track {
        background: ${theme.colors.gray[200]};
        border-radius: 1rem;
    }

    // 스크롤바에서 움직이는 부분
    &::-webkit-scrollbar-thumb {
        background: ${theme.colors.default};
        border-radius: 1rem;
        min-height: 10rem;
    }
    &::-webkit-scrollbar-thumb:hover {
        background: ${theme.colors.defaultHover};
    }
`;
