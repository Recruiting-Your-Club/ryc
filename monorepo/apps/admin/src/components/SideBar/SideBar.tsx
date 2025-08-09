import type { AnnouncementList } from '@api/domain/announcement/types';
import { announcementQueries } from '@api/queryFactory/announcementQueries';
import { myClubQueries } from '@api/queryFactory/clubQueries';
import ChevronDoubleRight from '@assets/images/chevron-double-right.svg';
import ChevronUpDown from '@assets/images/chevron-up-down.svg';
import Club from '@assets/images/club.svg';
import { useQuery } from '@tanstack/react-query';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useParams } from 'react-router-dom';

import AplicantManage from '@ssoc/assets/images/AplicantManage.svg';
import ApplicationManage from '@ssoc/assets/images/ApplicationManage.svg';
import ChevronRight from '@ssoc/assets/images/chevronRight.svg';
import EditApplication from '@ssoc/assets/images/EditApplication.svg';
import Home from '@ssoc/assets/images/Home.svg';
import Ryc from '@ssoc/assets/images/Ryc.svg';
import UserSet from '@ssoc/assets/images/UserSet.svg';
import { useRouter } from '@ssoc/hooks';
import { Button, Dropdown, Text, Tooltip } from '@ssoc/ui';

import {
    addClubButton,
    announcementWrapper,
    chevronDoubleRightWrapper,
    chevronRightWrapper,
    chevronUpDownWrapper,
    clubActive,
    clubSideBarContainer,
    clubTextWrapper,
    clubWrapper,
    createAnnouncementButton,
    dropDownChevronWrapper,
    dropdownClubContainer,
    dropDownClubWrapper,
    dropdownContainer,
    dropDownLogoutWrapper,
    dropdownTriggerContainer,
    dropDownTriggerWrapper,
    emptyContainer,
    homeLogoContainer,
    homeLogoTextWrapper,
    mainMenuContainer,
    menuContainer,
    menuContent,
    menuListContainer,
    menuTextWrapper,
    navContainer,
    sideBarContainer,
    subMenuContainer,
    subMenuWrapper,
} from './SideBar.style';

function SideBar() {
    // prop destruction
    // lib hooks
    const location = useLocation();
    const { clubId } = useParams();
    const { goTo } = useRouter();

    // initial values
    const navMenu = useMemo(
        () => [
            {
                id: 1,
                menu: '동아리 관리',
                icon: <Club />,
                subMenus: [
                    {
                        menu: '동아리 소개 수정',
                        link: `/clubs/${clubId}`,
                    },
                ],
            },
            {
                id: 2,
                menu: '공고 관리',
                icon: <Home />,
                subMenus: [
                    {
                        menu: '모집 공고',
                        link: `/announcements/${clubId}`,
                    },
                    {
                        menu: '공고 생성',
                        link: `/announcements/create/${clubId}`,
                    },
                    {
                        menu: '공고 편집',
                        link: `/announcements/edit/${clubId}`,
                    },
                ],
            },
            {
                id: 3,
                menu: '지원자 관리',
                icon: <AplicantManage />,
                subMenus: [
                    {
                        menu: '지원자 관리',
                        link: `/applicants/${clubId}`,
                    },
                ],
            },
            {
                id: 4,
                menu: '평가 관리',
                icon: <EditApplication />,
                subMenus: [
                    {
                        menu: '서류 평가',
                        link: `/interview-evaluation/${clubId}`,
                    },
                    {
                        menu: '면접 평가',
                        link: `/document-evaluation/${clubId}`,
                    },
                ],
            },
            {
                id: 5,
                menu: '면접 관리',
                icon: <ApplicationManage />,
                subMenus: [
                    {
                        menu: '지원자 면접 일정 관리',
                        link: `/interviewee-schedule/${clubId}`,
                    },
                ],
            },
            {
                id: 6,
                menu: '사용자 설정',
                icon: <UserSet />,
                subMenus: [
                    {
                        menu: '사용자 권한 설정',
                        link: `/settings/${clubId}`,
                    },
                ],
            },
        ],
        [],
    );

    const getMainMenu = () => {
        const currentPath = location.pathname;
        const activatedMenu = navMenu.find((item) =>
            item.subMenus.some((subMenu) => subMenu.link === currentPath),
        );
        return activatedMenu?.id ? activatedMenu.id : 1;
    };

    // state, ref, querystring hooks
    const [activeMenus, setActiveMenus] = useState<number[]>([getMainMenu()]);
    const [activeSubMenu, setActiveSubMenu] = useState<string>(location.pathname);
    const [isExpanded, setIsExpanded] = useState(true);
    const [currentClub, setCurrentClub] = useState<string>(clubId ?? '');
    const [queryOn, setQueryOn] = useState<boolean>(false);
    const [currentAnnouncement, setCurrentAnnouncement] = useState<AnnouncementList>();

    // form hooks
    // query hooks
    const { data: myClub, isLoading: clubLoading } = useQuery(myClubQueries.all());
    const { data: announcementList } = useQuery(
        announcementQueries.getListByClub(clubId || '', queryOn),
    );

    // calculated values
    const isMenuActive = (id: number) => activeMenus.includes(id);

    const announcementsByStatus = useMemo(() => {
        if (!announcementList) return { upcoming: [], recruiting: [], closed: [] };

        return announcementList.reduce(
            (acc, announcement) => {
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
            },
            {
                upcoming: [] as AnnouncementList[],
                recruiting: [] as AnnouncementList[],
                closed: [] as AnnouncementList[],
            },
        );
    }, [announcementList]);

    // handlers
    const handleCollapsed = useCallback(
        (id: number) => {
            if (!isExpanded) {
                setIsExpanded(true);
                setActiveMenus([id]);
            } else {
                setActiveMenus((prev) => {
                    const openedMenu = prev.includes(id);
                    if (openedMenu) {
                        const closeMenu = prev.filter((menuId) => menuId !== id);
                        return closeMenu;
                    } else {
                        const openMenu = [...prev, id];
                        return openMenu;
                    }
                });
            }
        },
        [isExpanded],
    );

    //useEffect
    useEffect(() => {
        setCurrentAnnouncement(announcementList?.[0]);
    }, [announcementList]);
    return (
        <>
            <div css={clubSideBarContainer}>
                {!clubLoading &&
                    myClub?.map((club) => (
                        <div
                            key={club.id}
                            css={{
                                display: 'flex',
                                alignItems: 'center',
                                width: '100%',
                                gap: '0.3rem',
                            }}
                        >
                            <div css={clubActive(club.id === currentClub)} />
                            <button
                                css={clubWrapper}
                                onClick={() => {
                                    setCurrentClub(club.id);
                                    goTo(`/clubs/${club.id}`);
                                }}
                            >
                                <Tooltip content={club.name}>
                                    <img
                                        src={club.imageUrl}
                                        alt="club"
                                        width="100%"
                                        height="100%"
                                        css={{ borderRadius: '10px' }}
                                    />
                                </Tooltip>
                            </button>
                        </div>
                    ))}
                <Tooltip content="동아리 생성">
                    <button css={addClubButton} onClick={() => goTo('/club-create')}>
                        +
                    </button>
                </Tooltip>
            </div>
            <aside css={sideBarContainer}>
                <div css={homeLogoContainer}>
                    <Button
                        variant="text"
                        onClick={() => {
                            if (location.pathname !== `/clubs/${clubId}`) {
                                if (!activeMenus.includes(1)) handleCollapsed(1);
                                setActiveSubMenu(`/clubs/${clubId}`);
                                goTo(`/clubs/${clubId}`);
                            }
                        }}
                        sx={homeLogoTextWrapper(isExpanded)}
                    >
                        SSOC
                    </Button>
                    <Button
                        variant="transparent"
                        size="md"
                        sx={{ color: 'black' }}
                        onClick={() => setIsExpanded(!isExpanded)}
                    >
                        <ChevronDoubleRight css={chevronDoubleRightWrapper(isExpanded)} />
                    </Button>
                </div>

                <nav css={navContainer(isExpanded)}>
                    <Dropdown
                        sx={dropdownContainer(isExpanded)}
                        onOpenChange={() => setQueryOn(true)}
                    >
                        <Dropdown.Trigger sx={dropdownTriggerContainer}>
                            <div css={dropDownTriggerWrapper}>
                                {isExpanded && (
                                    <div css={dropDownChevronWrapper}>
                                        <div css={announcementWrapper(isExpanded)}>
                                            <Text
                                                as="div"
                                                type="bodySemibold"
                                                cropped
                                                noWrap
                                                sx={{ maxWidth: '18rem', marginTop: '0.2rem' }}
                                            >
                                                {currentAnnouncement?.title ||
                                                    '공고를 선택해주세요'}
                                            </Text>
                                        </div>
                                        <ChevronUpDown css={chevronUpDownWrapper} />
                                    </div>
                                )}
                            </div>
                        </Dropdown.Trigger>
                        <Dropdown.Content
                            offsetX={isExpanded ? 32 : 20}
                            offsetY={isExpanded ? 10 : 10}
                            sx={{
                                zIndex: 1001,
                                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
                            }}
                        >
                            <Dropdown.Item sx={dropdownClubContainer}>
                                <Text
                                    as="div"
                                    type="subCaptionRegular"
                                    color="caption"
                                    textAlign="start"
                                    sx={{ width: '100%' }}
                                >
                                    예정된 공고
                                </Text>
                                {announcementsByStatus.upcoming?.map((announcement) => (
                                    <Button
                                        variant="transparent"
                                        key={announcement.announcementId}
                                        sx={dropDownClubWrapper}
                                        onClick={() => setCurrentAnnouncement(announcement)}
                                    >
                                        <Text as="div" type="captionRegular" cropped noWrap>
                                            {announcement.title}
                                        </Text>
                                    </Button>
                                ))}
                                <Text
                                    as="div"
                                    type="subCaptionRegular"
                                    color="caption"
                                    textAlign="start"
                                    sx={{ width: '100%' }}
                                >
                                    진행중 공고
                                </Text>
                                {announcementsByStatus.recruiting?.map((announcement) => (
                                    <Button
                                        variant="transparent"
                                        key={announcement.announcementId}
                                        sx={dropDownClubWrapper}
                                        onClick={() => setCurrentAnnouncement(announcement)}
                                    >
                                        <Text as="div" type="captionRegular" cropped noWrap>
                                            {announcement.title}
                                        </Text>
                                    </Button>
                                ))}
                                <Text
                                    as="div"
                                    type="subCaptionRegular"
                                    color="caption"
                                    textAlign="start"
                                    sx={{ width: '100%' }}
                                >
                                    마감된 공고
                                </Text>
                                {announcementsByStatus.closed?.map((announcement) => (
                                    <Button
                                        variant="transparent"
                                        key={announcement.announcementId}
                                        sx={dropDownClubWrapper}
                                        onClick={() => setCurrentAnnouncement(announcement)}
                                    >
                                        <Text as="div" type="captionRegular" cropped noWrap>
                                            {announcement.title}
                                        </Text>
                                    </Button>
                                ))}
                            </Dropdown.Item>
                            <Button variant="transparent" size="full" sx={createAnnouncementButton}>
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
                                <Tooltip content={MainMenu.menu}>{MainMenu.icon}</Tooltip>
                                {isExpanded && (
                                    <div css={mainMenuContainer}>
                                        <Text
                                            as="div"
                                            type="bodyRegular"
                                            sx={menuTextWrapper(isExpanded)}
                                        >
                                            {MainMenu.menu}
                                        </Text>
                                        <ChevronRight
                                            css={chevronRightWrapper(isMenuActive(MainMenu.id))}
                                        />
                                    </div>
                                )}
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
                                <Ryc
                                    width="3.5rem"
                                    height="3.5rem"
                                    css={{ borderRadius: '10px' }}
                                />

                                {isExpanded && (
                                    <div css={dropDownChevronWrapper}>
                                        <div css={clubTextWrapper(isExpanded)}>
                                            <Text as="div" type="captionRegular">
                                                조준희
                                            </Text>
                                            <Text as="div" type="captionRegular">
                                                zzuni3423@naver.com
                                            </Text>
                                        </div>
                                        <ChevronUpDown css={chevronUpDownWrapper} />
                                    </div>
                                )}
                            </div>
                        </Dropdown.Trigger>
                        <Dropdown.Content
                            offsetX={isExpanded ? 32 : 20}
                            offsetY={-10}
                            sx={{
                                zIndex: 10001,
                                border: 'none',
                                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
                            }}
                        >
                            <Dropdown.Item sx={dropdownClubContainer}>
                                <Button variant="transparent" size="full">
                                    계정설정
                                </Button>
                                <Button
                                    variant="transparent"
                                    size="full"
                                    sx={dropDownLogoutWrapper}
                                >
                                    로그아웃
                                </Button>
                            </Dropdown.Item>
                        </Dropdown.Content>
                    </Dropdown>
                </nav>
            </aside>
        </>
    );
}
export { SideBar };
