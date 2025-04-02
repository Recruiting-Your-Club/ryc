import React, { useState } from 'react';
import {
    sideBarContainer,
    headerContainer,
    sectionContainer,
    contentContainer,
    navContainer,
    menuContainer,
} from './SideBar.style';
import { Button, Text } from '@components';
import Home from '@assets/images/home.svg';
import AplicantManage from '@assets/images/AplicantManage.svg';
import UserSet from '@assets/images/UserSet.svg';
import Ryc from '@assets/images/Ryc.svg';

function SideBar() {
    const [isCollapsed, setIsCollapsed] = useState(true);

    const [menuItems, setMenuItems] = useState([
        { id: 1, title: '모집공고', icon: <Home /> },
        { id: 2, title: '지원자 관리', icon: <AplicantManage /> },
        { id: 3, title: '공고 편집', icon: <AplicantManage /> },
        { id: 4, title: '면접 관리', icon: <AplicantManage /> },
        { id: 5, title: '사용자 설정', icon: <UserSet /> },
    ]);

    const [subMenuItems, setSubMenuItems] = useState([
        { parentId: 1, depth: 1, title: '모집공고' },
        { parentId: 2, depth: 1, title: '단계별 통합 관리' },
        { parentId: 2, depth: 2, title: '불합격자 관리' },
        { parentId: 3, depth: 1, title: '공고 편집' },
        { parentId: 4, depth: 1, title: '시간대 별 지원자 편집' },
        { parentId: 4, depth: 1, title: '면접 평가 테이블' },
        { parentId: 4, depth: 1, title: '면접 공통 질문 설정' },
        { parentId: 5, depth: 1, title: '사용자 권한 설정' },
    ]);

    return (
        <>
            <div css={sideBarContainer(isCollapsed)}>
                <section css={sectionContainer}>
                    <nav css={navContainer}>
                        {menuItems.map((item) => (
                            <div key={item.id} css={menuContainer}>
                                <Button
                                    key={item.id}
                                    variant="primary"
                                    size="lg"
                                    sx={{ padding: '1.7rem 0.5rem' }}
                                    onClick={() => setIsCollapsed(!isCollapsed)}
                                >
                                    {item.icon}
                                </Button>
                                <Text type="subCaptionRegular" color="caption">
                                    {item.title}
                                </Text>
                            </div>
                        ))}
                    </nav>
                </section>

                {!isCollapsed && <div css={contentContainer}>테스트</div>}
            </div>
        </>
    );
}
export { SideBar };
