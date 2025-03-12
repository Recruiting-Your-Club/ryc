import { css } from '@emotion/react';
import  theme  from '@styles/theme';

export const scrollBarStyle = (height?: string) => css`
  
  overflow-y : auto; 
  

  // Chrome, edge, safari에서 scrollbar를 적용하려면 -webkit-scrollbar로 적용시켜야한다.

  // 전체 스크롤바
  &::-webkit-scrollbar {
    width: 8px;
    height: ${height ?? "100%"};
  }

  // 스크롤바에서 움직이는 부분을 제외한 나머지 부분
 &::-webkit-scrollbar-track {
  background: ${theme.colors.gray[200]};
  border-radius: 10px;
}

  // 스크롤바에서 움직이는 부분
 &::-webkit-scrollbar-thumb {
  background:${theme.colors.default}; opacity : 0.2;
  border-radius: 10px;
  min-height: 100px;
}
 &::-webkit-scrollbar-thumb:hover{
  background: ${theme.colors.defaultHover}; opacity : 0.8;
}

`;

