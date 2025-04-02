import React, { useState, useEffect } from 'react';
import {
    sideBarContainer,
    sectionContainer,
    contentContainer,
    navContainer,
    menuContainer,
    menuTitle,
    menuContent,
    menuListContainer,
    menuButton,
} from './SideBar.style';
import { Button, Text, Divider } from '@components';
import Home from '@assets/images/home.svg';
import AplicantManage from '@assets/images/AplicantManage.svg';
import UserSet from '@assets/images/UserSet.svg';
import Ryc from '@assets/images/Ryc.svg';
import { useRouter } from '@hooks/useRouter';

function SideBar() {
    // prop destruction
    const { goTo } = useRouter();
    const menuItems = [
        { id: 1, title: '모집공고', icon: <Home /> },
        { id: 2, title: '지원자 관리', icon: <AplicantManage /> },
        { id: 3, title: '공고 편집', icon: <AplicantManage /> },
        { id: 4, title: '면접 관리', icon: <AplicantManage /> },
        { id: 5, title: '사용자 설정', icon: <UserSet /> },
    ];

    const subMenuItems = [
        { parentId: 1, title: '모집공고', link: '/manager/recruitment' },
        { parentId: 2, title: '단계별 통합 관리', link: '/manager/steps' },
        { parentId: 2, title: '불합격자 관리', link: '/manager/rejected' },
        { parentId: 3, title: '공고 편집', link: '/manager/edit' },
        { parentId: 4, title: '시간대 별 지원자 편집', link: '/manager/time-slots' },
        { parentId: 4, title: '면접 평가 테이블', link: '/manager/evaluation' },
        { parentId: 4, title: '면접 공통 질문 설정', link: '/manager/questions' },
        { parentId: 5, title: '사용자 권한 설정', link: '/manager/setting' },
    ];
    // lib hooks
    // state, ref, querystring hooks
    const [activeMenu, setActiveMenu] = useState<number | undefined>(1);
    const [activeSubMenu, setActiveSubMenu] = useState<string | undefined>(subMenuItems[0].title);
    const [isCollapsed, setIsCollapsed] = useState(false);
    const [filteredSubMenu, setFilteredSubMenu] = useState<
        { parentId: number; title: string; link: string }[]
    >([]);
    // form hooks
    // query hooks
    // calculated values
    // effects
    useEffect(() => {
        setFilteredSubMenu(subMenuItems.filter((item) => item.parentId === activeMenu));
    }, [activeMenu]);

    useEffect(() => {
        // active된거 초기화
        if (isCollapsed) {
            setActiveMenu(undefined);
            setActiveSubMenu('');
        }
    }, [isCollapsed]);

    // handlers
    const handleCollapsed = (id: number) => {
        if (!isCollapsed) {
            // 열려있을 때
            // 닫음
            if (activeMenu === id) {
                setIsCollapsed(true);
            }
            // active
            else {
                setActiveMenu(id);
            }
        } else {
            // 열림
            setIsCollapsed(false);
        }
    };

    return (
        <>
            <div css={sideBarContainer(isCollapsed)}>
                <section css={sectionContainer}>
                    <nav css={navContainer}>
                        <Button
                            variant="transparent"
                            size="lg"
                            sx={{
                                marginBottom: '2rem',
                            }}
                        >
                            <Ryc style={{ borderRadius: '6px' }} />
                        </Button>
                        {menuItems.map((item) => (
                            <div key={item.id} css={menuListContainer}>
                                <Button
                                    key={item.id}
                                    variant="transparent"
                                    size="lg"
                                    sx={menuButton(item.id === activeMenu)}
                                    onClick={() => {
                                        handleCollapsed(item.id);
                                        setActiveMenu(item.id);
                                    }}
                                >
                                    <div>{item.icon}</div>
                                </Button>
                            </div>
                        ))}
                    </nav>
                </section>

                {!isCollapsed && (
                    <div css={contentContainer}>
                        {menuItems
                            .filter((item) => item.id === activeMenu)
                            .map((item) => (
                                <div key={item.id} css={menuTitle}>
                                    {item.title}
                                </div>
                            ))}

                        <Divider
                            width="90"
                            color="gray"
                            weight="1"
                            sx={{ marginTop: '2rem', marginBottom: '1rem' }}
                        />
                        <div css={menuContainer}>
                            {filteredSubMenu
                                .filter((item) => item.parentId === activeMenu)
                                .map((item) => (
                                    <Button
                                        key={item.parentId}
                                        variant="text"
                                        onClick={() => {
                                            setActiveSubMenu(item.title);
                                            goTo(item.link);
                                        }}
                                        sx={menuContent(activeSubMenu === item.title)}
                                    >
                                        {item.title}
                                    </Button>
                                ))}
                        </div>
                    </div>
                )}
            </div>
        </>
    );
}
export { SideBar };
