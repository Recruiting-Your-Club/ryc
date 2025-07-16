import AplicantManage from '@assets/images/AplicantManage.svg';
import ApplicationManage from '@assets/images/ApplicationManage.svg';
import basicImage from '@assets/images/basicImage.png';
import EditApplication from '@assets/images/EditApplication.svg';
import Home from '@assets/images/Home.svg';
import Ryc from '@assets/images/Ryc.svg';
import SSOC from '@assets/images/ssoc.png';
import UserSet from '@assets/images/UserSet.svg';
import { Button, Text, Tooltip, Dropdown, Tag } from '@components';
import { useRouter } from '@hooks/useRouter';
import React, { useState, useMemo, useCallback } from 'react';
import clubData from './clubData.json';
import { useLocation } from 'react-router-dom';
import {
    emptyContainer,
    menuContainer,
    menuContent,
    menuListContainer,
    navContainer,
    sideBarContainer,
    menuTextWrapper,
    homeLogoContainer,
    clubTextWrapper,
    subMenuContainer,
    subMenuWrapper,
    dropdownTriggerContainer,
    chevronUpDownWrapper,
    dropDownTriggerWrapper,
    dropDownChevronWrapper,
    chevronRightWrapper,
    homeLogoTextWrapper,
    drowdownClubContainer,
    dropdownClubLogoWrapper,
    dropDownClubWrapper,
    clubSideBarContainer,
    clubWrapper,
    clubActive,
    announcementWrapper,
    dropdownContainer,
} from './SideBar.style';
import ChevronUpDown from '@assets/images/chevron-up-down.svg';
import ChevronDoubleRight from '@assets/images/chevron-double-right.svg';
import { useQuery } from '@tanstack/react-query';
import { clubQueries } from '@api/queryFactory/clubQueries';

function SideBar() {
    // prop destruction
    // lib hooks
    const location = useLocation();
    const { goTo } = useRouter();
    const { data: myClub, isLoading } = useQuery(clubQueries.myClub());

    // initial values
    const navMenu = useMemo(() => [
        {
            id: 1,
            menu: "공고 관리",
            icon: <Home />,
            subMenus: [
                {
                    menu: "모집 공고",
                    link: "/announcements"
                },
                {
                    menu: "공고 생성",
                    link: "/announcements/create"
                },
                {
                    menu: "공고 편집",
                    link: "/announcements/edit"
                }
            ],
        },
        {
            id: 2,
            menu: "지원자 관리",
            icon: <AplicantManage />,
            subMenus: [
                {
                    menu: "지원자 관리",
                    link: "/applicants"
                }
            ]
        },
        {
            id: 3,
            menu: "평가 관리",
            icon: <EditApplication />,
            subMenus: [
                {
                    menu: "서류 평가",
                    link: "/evaluations/document"
                },
                {
                    menu: "면접 평가",
                    link: "/evaluations/interview"
                }
            ]
        },
        {
            id: 4,
            menu: "면접 관리",
            icon: <ApplicationManage />,
            subMenus: [
                {
                    menu: "지원자 면접 일정 관리",
                    link: "/interviews/schedule"
                }
            ]
        },
        {
            id: 5,
            menu: "사용자 설정",
            icon: <UserSet />,
            subMenus: [
                {
                    menu: "사용자 권한 설정",
                    link: "/settings"
                }
            ]
        }
    ], []);

    const getMainMenu = () => {
        const currentPath = location.pathname;
        const activatedMenu = navMenu.find((item) => item.subMenus.some((subMenu) => subMenu.link === currentPath));
        return activatedMenu?.id ? activatedMenu.id : 1;
    };

    // state, ref, querystring hooks
    const [activeMenus, setActiveMenus] = useState<number[]>([getMainMenu()]);
    const [activeSubMenu, setActiveSubMenu] = useState<string>(location.pathname);
    const [isExpanded, setIsExpanded] = useState(true);
    const [currentClub, setCurrentClub] = useState<string>(clubData[0].name);

    // form hooks
    // query hooks
    // calculated values
    const isMenuActive = (id: number) => activeMenus.includes(id);

    // handlers
    const handleCollapsed = useCallback((id: number) => {
        if (!isExpanded) {
            setIsExpanded(true);
            setActiveMenus([id]);
        } else {
            setActiveMenus(prev => {
                const openedMenu = prev.includes(id);
                if (openedMenu) {
                    const closeMenu = prev.filter(menuId => menuId !== id);
                    return closeMenu;
                } else {
                    const openMenu = [...prev, id];
                    return openMenu;
                }
            });
        }
    }, [isExpanded]);
    //useEffect
    return (
        <>
            <div css={clubSideBarContainer}>
                {!isLoading && myClub?.map((data) => (
                    <div key={data.id} css={{ display: 'flex', alignItems: 'center', width: '100%', gap: '0.3rem' }}>
                        <div css={clubActive(data.name === currentClub)} />
                        <button css={clubWrapper} onClick={() => setCurrentClub(data.name)}>
                            <Tooltip content={data.name}>
                                <img src={data.imageUrl} alt='clubLogo' width='100%' height='100%' css={{ borderRadius: '10px' }} />
                            </Tooltip>
                        </button>
                    </div>
                ))}

            </div>
            <aside css={sideBarContainer}>
                <div css={homeLogoContainer}>
                    <Button variant='text' onClick={() => {
                        if (location.pathname !== '/announcements') {
                            if (!activeMenus.includes(1)) handleCollapsed(1);
                            setActiveSubMenu('/announcements');
                            goTo('/announcements');
                        }
                    }} sx={homeLogoTextWrapper(isExpanded)}>
                        SSOC
                    </Button>
                    <Button variant='transparent' size='md' sx={{ color: 'black' }} onClick={() => setIsExpanded(!isExpanded)}>
                        <ChevronDoubleRight css={chevronRightWrapper(isExpanded)} />
                    </Button>
                </div>

                <nav css={navContainer(isExpanded)}>

                    <Dropdown sx={dropdownContainer(isExpanded)}>
                        <Dropdown.Trigger sx={dropdownTriggerContainer}>
                            <div css={dropDownTriggerWrapper}>
                                {isExpanded &&
                                    <div css={dropDownChevronWrapper}>
                                        <div css={announcementWrapper(isExpanded)}>
                                            <Text as='div' type='bodySemibold' cropped noWrap sx={{ maxWidth: '14rem', marginTop: '0.2rem' }}>프론트엔드</Text>
                                            <Tag text='모집중' variant='progress' />
                                        </div>
                                        <ChevronUpDown css={chevronUpDownWrapper} />
                                    </div>
                                }
                            </div>
                        </Dropdown.Trigger>
                        <Dropdown.Content
                            offsetX={isExpanded ? 32 : 20}
                            offsetY={isExpanded ? 10 : 10} sx={{
                                zIndex: 10001,

                                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)'
                            }}>
                            <Dropdown.Item sx={drowdownClubContainer}>
                                {clubData.map((club) =>
                                    <div key={club.id} css={dropDownClubWrapper}>
                                        <img src={club.imageUrl} alt={club.name} css={dropdownClubLogoWrapper} />
                                        <Text as='div' type='captionRegular' cropped noWrap>{club.name}</Text>
                                    </div>
                                )}
                            </Dropdown.Item>
                        </Dropdown.Content>
                    </Dropdown>



                    {navMenu.map((MainMenu) => (
                        <div key={MainMenu.id} css={menuListContainer}>

                            <Button
                                variant="text"
                                size="full"
                                sx={menuContainer(isMenuActive(MainMenu.id))}
                                onClick={() => {
                                    handleCollapsed(MainMenu.id);
                                }}
                                zIndex={1000}
                            >
                                <Tooltip content={MainMenu.menu}>
                                    {MainMenu.icon}
                                </Tooltip>
                                {isExpanded && <Text as='div' type='bodyRegular' sx={menuTextWrapper(isExpanded)}>{MainMenu.menu}</Text>}
                            </Button>




                            {isExpanded && (
                                <div css={subMenuContainer(isMenuActive(MainMenu.id))}>
                                    {MainMenu.subMenus.map((subMenu) => (
                                        <div css={subMenuWrapper} key={subMenu.menu}>
                                            <Button
                                                key={subMenu.menu}
                                                variant="text"
                                                onClick={() => {
                                                    setActiveSubMenu(subMenu.link);
                                                    goTo(subMenu.link);
                                                }}
                                                sx={menuContent(activeSubMenu === subMenu.link)}
                                            >
                                                {subMenu.menu}
                                            </Button>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    ))}
                    <div css={emptyContainer} />

                    <Dropdown sx={{ width: '100%', marginBottom: '1.5rem' }}>
                        <Dropdown.Trigger sx={dropdownTriggerContainer}>
                            <div css={dropDownTriggerWrapper}>
                                <Ryc width="3.5rem" height="3.5rem" css={{ borderRadius: '10px' }} />

                                {isExpanded &&
                                    <div css={dropDownChevronWrapper}>
                                        <div css={clubTextWrapper(isExpanded)}>
                                            <Text as='div' type='captionRegular'>조준희</Text>
                                            <Text as='div' type='captionRegular'>zzuni3423@naver.com</Text>
                                        </div>
                                        <ChevronUpDown css={chevronUpDownWrapper} />
                                    </div>
                                }
                            </div>
                        </Dropdown.Trigger>
                        <Dropdown.Content
                            offsetX={isExpanded ? 32 : 20}
                            offsetY={-10} sx={{
                                zIndex: 10001,
                                border: 'none',
                                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)'
                            }}>
                            <Dropdown.Item sx={drowdownClubContainer}>
                                {clubData.map((club) =>
                                    <div key={club.id} css={dropDownClubWrapper}>
                                        <img src={club.imageUrl} alt={club.name} css={dropdownClubLogoWrapper} />
                                        <Text as='div' type='captionRegular' cropped noWrap>{club.name}</Text>
                                    </div>
                                )}
                            </Dropdown.Item>
                        </Dropdown.Content>
                    </Dropdown>
                </nav>
            </aside>
        </>
    );
}
export { SideBar };
