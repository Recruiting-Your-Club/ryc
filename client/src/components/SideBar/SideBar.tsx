import React from 'react';
import { useState } from 'react';
import { sideBarContainer, headerContainer } from './SideBar.style';
import { Button } from '@components';
import ChevronRight from '@assets/images/chevronRight.svg';
import ChevronLeft from '@assets/images/chevronLeft.svg';

function SideBar() {
    const [isCollapsed, setIsCollapsed] = useState(false);
    const [conversations, setConversations] = useState([
        { id: 1, title: '마케팅 전략 논의', date: '오늘' },
        { id: 2, title: '이메일 초안 작성', date: '어제' },
        { id: 3, title: '제품 설명서 요약', date: '3월 29일' },
        { id: 4, title: '코드 디버깅 도움', date: '3월 28일' },
    ]);

    return (
        <>
            <div css={sideBarContainer(isCollapsed)}>
                <div css={headerContainer}>
                    <div>Recruting Your Club!</div>
                    <Button
                        variant="transparent"
                        size="md"
                        onClick={() => setIsCollapsed(!isCollapsed)}
                    >
                        {isCollapsed ? (
                            <ChevronRight width="1.5rem" height="1.5rem" />
                        ) : (
                            <ChevronLeft width="1.5rem" height="1.5rem" />
                        )}
                    </Button>
                </div>
            </div>
        </>
    );
}
export { SideBar };
