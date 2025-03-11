import React, { useEffect, useRef, useState } from "react";
import type { ReactNode } from 'react';
import { css } from '@emotion/react';
import { scrollBarStyle } from './ScrollBar.style';

interface ScrollBarProps {
  children: ReactNode;
  isMouseIn : boolean;
}

function ScrollBar({ children,isMouseIn }: ScrollBarProps) {
  // 스크롤바에 부착된 부모 태그의 높이 초기설정
  const containerRef = useRef<HTMLDivElement>(null);
  const [parentHeight, setParentHeight] = useState<string | undefined>();

  useEffect(() => {
    if (containerRef.current?.parentElement) {
      const updateHeight = () => {
        setParentHeight(`${containerRef.current!.parentElement!.clientHeight}px`); // 높이 계산해서 업데이트
      };

      updateHeight(); 

      const observer = new ResizeObserver(updateHeight); // 크기가 변경되면 updateHeight 함수를 실행할수있게 observer 설정
      observer.observe(containerRef.current.parentElement); // 부모 요소가 변경되면 실행할 수 있게

      return () => {
        observer.disconnect(); // 언 마운트시 observer 중단
      };
    }
  }, []);

  return (
    <div
      ref={containerRef}
      css={css`
        ${scrollBarStyle};
        height: ${parentHeight ?? "100%"}; 
      `}
    >
      {children}
    </div>
  );
}

export { ScrollBar };