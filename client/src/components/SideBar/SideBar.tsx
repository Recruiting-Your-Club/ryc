import AplicantManage from '@assets/images/AplicantManage.svg';
import ApplicationManage from '@assets/images/ApplicationManage.svg';
import EditApplication from '@assets/images/EditApplication.svg';
import Home from '@assets/images/Home.svg';
import Ryc from '@assets/images/Ryc.svg';
import UserSet from '@assets/images/UserSet.svg';
import { Button, Text, Tooltip, Dropdown } from '@components';
import { useRouter } from '@hooks/useRouter';
import React, { useState, useMemo, useCallback, useEffect } from 'react';
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
    dropdownClubContainer,
    dropDownClubWrapper,
    clubSideBarContainer,
    clubWrapper,
    clubActive,
    announcementWrapper,
    dropdownContainer,
    dropDownLogoutWrapper,
    createAnnouncementButton,
} from './SideBar.style';
import ChevronUpDown from '@assets/images/chevron-up-down.svg';
import ChevronDoubleRight from '@assets/images/chevron-double-right.svg';
import { useQuery } from '@tanstack/react-query';
import { clubQueries } from '@api/queryFactory/clubQueries';
import { announcementQueries } from '@api/queryFactory/announcementQueries';
import type { AnnouncementList } from '@api/domain/announcement/types';

function SideBar() {
    // prop destruction
    // lib hooks
    const location = useLocation();
    const { goTo } = useRouter();

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
    const [currentClub, setCurrentClub] = useState<string>('');
    const [queryOn, setQueryOn] = useState<boolean>(false);
    const [currentAnnouncement, setCurrentAnnouncement] = useState<AnnouncementList>();

    // form hooks
    // query hooks
    const { data: myClub, isLoading: clubLoading } = useQuery(clubQueries.myClub());
    const { data: announcementList } = useQuery(announcementQueries.getListByClub('2', queryOn));

    // calculated values
    const isMenuActive = (id: number) => activeMenus.includes(id);

    const announcementsByStatus = useMemo(() => {
        if (!announcementList) return { upcoming: [], recruiting: [], closed: [] };

        return announcementList.reduce((acc, announcement) => {
            if (announcement.announcementStatus === 'UPCOMING') {
                acc.upcoming.push(announcement);
            }
            if (announcement.announcementStatus === 'RECRUITING') {
                acc.recruiting.push(announcement);
            }
            if (announcement.announcementStatus === 'CLOSED') {
                acc.closed.push(announcement);
            }
            return acc;
        }, {
            upcoming: [] as AnnouncementList[],
            recruiting: [] as AnnouncementList[],
            closed: [] as AnnouncementList[]
        });
    }, [announcementList]);

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
    useEffect(() => {
        if(currentClub === ''){
            setCurrentClub(myClub?.[0].name || '');
        }
    }, [currentClub, myClub]);
    return (
        <>
            <div css={clubSideBarContainer}>
                {!clubLoading && myClub?.map((club, index) => (
                    <div key={club.id} css={{ display: 'flex', alignItems: 'center', width: '100%', gap: '0.3rem' }}>
                        <div css={clubActive(club.name === currentClub)} />
                        <button css={clubWrapper} onClick={() => setCurrentClub(club.name)}>
                            <Tooltip content={club.name}>
                                <img src={club.imageUrl} alt='clubLogo' width='100%' height='100%' css={{ borderRadius: '10px' }} />
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

                    <Dropdown sx={dropdownContainer(isExpanded)} onOpenChange={() => setQueryOn(true)}>
                        <Dropdown.Trigger sx={dropdownTriggerContainer}>
                            <div css={dropDownTriggerWrapper}>
                                {isExpanded &&
                                    <div css={dropDownChevronWrapper}>
                                        <div css={announcementWrapper(isExpanded)}>
                                            <Text as='div' type='bodySemibold' cropped noWrap sx={{ maxWidth: '18rem', marginTop: '0.2rem' }}>{currentAnnouncement?.title || '공고를 선택해주세요'}</Text>
                                        </div>
                                        <ChevronUpDown css={chevronUpDownWrapper} />
                                    </div>
                                }
                            </div>
                        </Dropdown.Trigger>
                        <Dropdown.Content
                            offsetX={isExpanded ? 32 : 20}
                            offsetY={isExpanded ? 10 : 10} sx={{
                                zIndex: 1001,
                                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)'
                            }}>
                            <Dropdown.Item sx={dropdownClubContainer}>
                                <Text as='div' type='subCaptionRegular' color='caption' textAlign='start' sx={{ width: '100%' }}>예정된 공고</Text>
                                {announcementsByStatus.upcoming?.map((announcement) =>
                                    <Button variant='transparent' key={announcement.announcementId} sx={dropDownClubWrapper} onClick={() => setCurrentAnnouncement(announcement)}>
                                        <Text as='div' type='captionRegular' cropped noWrap>{announcement.title}</Text>
                                    </Button>
                                )}
                                <Text as='div' type='subCaptionRegular' color='caption' textAlign='start' sx={{ width: '100%' }}>진행중 공고</Text>
                                {announcementsByStatus.recruiting?.map((announcement) =>
                                    <Button variant='transparent' key={announcement.announcementId} sx={dropDownClubWrapper} onClick={() => setCurrentAnnouncement(announcement)}>
                                        <Text as='div' type='captionRegular' cropped noWrap>{announcement.title}</Text>
                                    </Button>
                                )}
                                <Text as='div' type='subCaptionRegular' color='caption' textAlign='start' sx={{ width: '100%' }}>마감된 공고</Text>
                                {announcementsByStatus.closed?.map((announcement) =>
                                    <Button variant='transparent' key={announcement.announcementId} sx={dropDownClubWrapper} onClick={() => setCurrentAnnouncement(announcement)}>
                                        <Text as='div' type='captionRegular' cropped noWrap>{announcement.title}</Text>
                                    </Button>
                                )}
                            </Dropdown.Item>
                            <Button variant='transparent' size='full' sx={createAnnouncementButton}>
                                공고 생성
                            </Button>
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
                            <Dropdown.Item sx={dropdownClubContainer}>
                                <Button variant='transparent' size='full'>계정설정</Button>
                                <Button variant='transparent' size='full' sx={dropDownLogoutWrapper}>로그아웃</Button>
                            </Dropdown.Item>
                        </Dropdown.Content>
                    </Dropdown>
                </nav>
            </aside>
        </>
    );
}
export { SideBar };
