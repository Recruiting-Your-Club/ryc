import AplicantManage from '@assets/images/AplicantManage.svg';
import ApplicationManage from '@assets/images/ApplicationManage.svg';
import basicImage from '@assets/images/basicImage.png';
import EditApplication from '@assets/images/EditApplication.svg';
import Home from '@assets/images/Home.svg';
import Ryc from '@assets/images/Ryc.svg';
import SSOC from '@assets/images/ssoc.png';
import UserSet from '@assets/images/UserSet.svg';
import { Button, Text, Tooltip, Dropdown } from '@components';
import { useRouter } from '@hooks/useRouter';
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import {
    clubContainer,
    contentContainer,
    emptyContainer,
    imageContainer,
    menuContainer,
    menuContent,
    menuListContainer,
    menuTitle,
    navContainer,
    sideBarContainer,
    menuTextWrapper,
    homeLogoContainer,
    clubTextWrapper,
    mainMenuContainer,
    subMenuContainer,
    subMenuWrapper,
} from './SideBar.style';

interface MenuItem {
    id: number;
    menu: string;
    icon: React.ReactNode;
}
interface SubMenuItem {
    parentId: number;
    subMenu: string;
    link: string;
}

interface SideBarProps {
    menu?: MenuItem[];
    subMenu?: SubMenuItem[];
}

function SideBar({ menu, subMenu }: SideBarProps) {
    // prop destruction
    const defaultMenuItems: MenuItem[] = [
        { id: 1, menu: '모집공고', icon: <Home /> },
        { id: 2, menu: '지원자 관리', icon: <AplicantManage /> },
        { id: 3, menu: '공고 편집', icon: <EditApplication /> },
        { id: 4, menu: '면접 관리', icon: <ApplicationManage /> },
        { id: 5, menu: '사용자 설정', icon: <UserSet /> },
    ];

    const defaultSubMenuItems: SubMenuItem[] = [
        { parentId: 1, subMenu: '모집공고', link: '/manager/recruitment' },
        { parentId: 2, subMenu: '단계별 통합 관리', link: '/manager/steps' },
        { parentId: 2, subMenu: '불합격자 관리', link: '/manager/rejected' },
        { parentId: 3, subMenu: '공고 편집', link: '/manager/edit' },
        { parentId: 4, subMenu: '시간대 별 지원자 편집', link: '/manager/time-slots' },
        { parentId: 4, subMenu: '서류 평가', link: '/manager/doc-evaluation' },
        { parentId: 4, subMenu: '면접 평가 테이블', link: '/manager/evaluation' },
        { parentId: 4, subMenu: '면접 공통 질문 설정', link: '/manager/questions' },
        { parentId: 5, subMenu: '사용자 권한 설정', link: '/manager/setting' },
    ];
    const testMenu = [
  {
    id: 1,
    menu: "모집공고",
    icon: <Home />, // <Home /> 컴포넌트
    subMenus: [
      {
        menu: "모집공고",
        link: "/manager/recruitment"
      }
    ]
  },
  {
    id: 2,
    menu: "지원자 관리",
    icon: <AplicantManage />, // <AplicantManage /> 컴포넌트
    subMenus: [
      {
        menu: "단계별 통합 관리",
        link: "/manager/steps"
      },
      {
        menu: "불합격자 관리",
        link: "/manager/rejected"
      }
    ]
  },
  {
    id: 3,
    menu: "공고 편집",
    icon: <EditApplication />, // <EditApplication /> 컴포넌트
    subMenus: [
      {
        menu: "공고 편집",
        link: "/manager/edit"
      }
    ]
  },
  {
    id: 4,
    menu: "면접 관리",
    icon: <ApplicationManage />, // <ApplicationManage /> 컴포넌트
    subMenus: [
      {
        menu: "시간대 별 지원자 편집",
        link: "/manager/time-slots"
      },
      {
        menu: "서류 평가",
        link: "/manager/doc-evaluation"
      },
      {
        menu: "면접 평가 테이블",
        link: "/manager/evaluation"
      },
      {
        menu: "면접 공통 질문 설정",
        link: "/manager/questions"
      }
    ]
  },
  {
    id: 5,
    menu: "사용자 설정",
    icon: <UserSet />, // <UserSet /> 컴포넌트
    subMenus: [
      {
        menu: "사용자 권한 설정",
        link: "/manager/setting"
      }
    ]
  }
]
    const menuItems = Array.isArray(menu) ? menu : defaultMenuItems;
    const subMenuItems = Array.isArray(subMenu) ? subMenu : defaultSubMenuItems;

    // lib hooks
    const location = useLocation();
    const { goTo } = useRouter();

    // initial values
    const getCurrentBase = <T extends string | number>(
        callback: (activatedSubMenu?: SubMenuItem) => T,
    ): T => {
        const currentPath = location.pathname;
        const activatedSubMenu = subMenuItems.find((item) => item.link === currentPath);
        return callback(activatedSubMenu);
    };

    const getInitialMenuTitle = () => {
        return getCurrentBase((activatedSubMenu) => {
            return activatedSubMenu ? activatedSubMenu.subMenu : subMenuItems[0].subMenu;
        });
    };

    const getInitialMenuId = () => {
        return getCurrentBase((activatedSubMenu) => {
            return activatedSubMenu ? activatedSubMenu.parentId : 1;
        });
    };

    // state, ref, querystring hooks
    const [activeMenu, setActiveMenu] = useState<number | undefined>(getInitialMenuId);
    const [activeSubMenu, setActiveSubMenu] = useState<string>(getInitialMenuTitle);
    const [isExpanded, setIsExpanded] = useState(true);
    const [filteredSubMenu, setFilteredSubMenu] = useState<SubMenuItem[]>([]);

    // form hooks
    // query hooks
    // calculated values

    // effects
    useEffect(() => {
        // 접힌 상태에서는 활성 메뉴 초기화
        if (!isExpanded) {
            setActiveMenu(undefined);
        } else if (activeMenu) {
            setFilteredSubMenu(subMenuItems.filter((item) => item.parentId === activeMenu));
        }
    }, [isExpanded, activeMenu]);

    // handlers
    const handleCollapsed = (id: number) => {
        console.log(id);
        if (!isExpanded || activeMenu !== id) {
            setActiveMenu(id);
            setActiveSubMenu(subMenuItems.find((item) => item.parentId === id)?.subMenu || '')
            setIsExpanded(true);
        } else {
            setIsExpanded(false);
        }
    };

    return (
        <>
            <aside css={sideBarContainer}>
                
                    <nav css={navContainer(isExpanded)}>
                        <div css={homeLogoContainer}>
                        {isExpanded ? (
                            <Text as="div" type="h3Bold">
                                SSOC
                            </Text>
                        ) : (
                            <div>>></div>
                        )}
                        </div>
                        <div css={clubContainer}>
                            <Button
                                variant="transparent"
                                size="s"
                                sx={{
                                    marginBottom: '1rem',
                                    width: '3.5rem',
                                    height: '3.5rem',
                                    padding: '0',
                                }}
                            >
                                <Ryc width="100%" height="100%" css={{ borderRadius: '10px' }} />
                            </Button>
                            {isExpanded &&
                            <div css={clubTextWrapper(isExpanded)}>
                                <Text as = 'div' type='captionRegular'>엔샵</Text>
                                <Text as = 'div' type='captionRegular'>세종대학교 SW</Text>
                            </div>
                        }
                        </div>
                        {testMenu.map((MainMenu) => (
                            <div key={MainMenu.id} css={menuListContainer}>

                                <Button
                                    variant="text"
                                    size="full"
                                    sx={menuContainer(MainMenu.id === activeMenu)}
                                    onClick={() => {
                                        handleCollapsed(MainMenu.id);
                                    }}
                                    zIndex={1000}
                                >
                                    <Tooltip content={MainMenu.menu}>
                                        {MainMenu.icon}
                                    </Tooltip>
                                    {isExpanded && <Text as='div' type='bodySemibold' sx={menuTextWrapper(isExpanded)}>{MainMenu.menu}</Text>}
                                </Button>
                                
                                
                                

                                {isExpanded && <div css={subMenuContainer(isExpanded)}>
                                {MainMenu.subMenus.map((subMenu) => (
                                    <div css={subMenuWrapper}>
                                        <Button
                                            key={subMenu.menu}
                                            variant="text"
                                            onClick={() => {
                                                setActiveSubMenu(subMenu.menu);
                                                goTo(subMenu.link);
                                            }}
                                            sx={menuContent(activeSubMenu === subMenu.menu)}
                                    >
                                {subMenu.menu}
                            </Button>
                                    </div>
                                ))}
                                </div>
}
                            </div>
                        ))}
                    </nav>

                    <div css={imageContainer}>
                        <img
                            src={basicImage}
                            alt="User profile"
                            width="100%"
                            height="100%"
                            style={{ borderRadius: '10px' }}
                        />
                    </div>
                

                {/**
                <section css={contentContainer(isExpanded)}>
                    <div>
                        <div>엔샵</div>
                        <div>학술동아리</div>
                    </div>
                    {menuItems
                        .filter((item) => item.id === activeMenu)
                        .map((item) => (
                            <div key={item.id} css={menuTitle}>
                                {item.menu}
                            </div>
                        ))}

                    <div css={menuContainer}>
                        {filteredSubMenu.map((item) => (
                            <Button
                                key={item.subMenu}
                                variant="text"
                                onClick={() => {
                                    setActiveSubMenu(item.subMenu);
                                    goTo(item.link);
                                }}
                                sx={menuContent(activeSubMenu === item.subMenu)}
                            >
                                {item.subMenu}
                            </Button>
                        ))}
                    </div>
                </section>
                 */}
            </aside>
        </>
    );
}
export { SideBar };
