import type { AnnouncementList } from '@api/domain/announcement/types';
import { announcementQueries } from '@api/queryFactory/announcementQueries';
import { myClubQueries } from '@api/queryFactory/clubQueries';
import { userQueries } from '@api/queryFactory/userQueries';
import ChevronDoubleRight from '@assets/images/chevron-double-right.svg';
import ChevronUpDown from '@assets/images/chevron-up-down.svg';
import Club from '@assets/images/club.svg';
import { useQuery } from '@tanstack/react-query';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';

import AplicantManage from '@ssoc/assets/images/AplicantManage.svg';
import ApplicationManage from '@ssoc/assets/images/ApplicationManage.svg';
import ChevronRight from '@ssoc/assets/images/chevronRight.svg';
import EditApplication from '@ssoc/assets/images/EditApplication.svg';
import Home from '@ssoc/assets/images/Home.svg';
import mainLogo from '@ssoc/assets/images/mainLogo.png';
import Ryc from '@ssoc/assets/images/Ryc.svg';
import UserSet from '@ssoc/assets/images/UserSet.svg';
import { useRouter } from '@ssoc/hooks';
import { Avatar, Button, Dropdown, Text, Tooltip } from '@ssoc/ui';

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
    const { clubId, announcementId } = useParams();
    const { goTo } = useRouter();

    // initial values
    const navMenu = useMemo(
        () => [
            {
                id: 1,
                menu: '동아리 관리',
                icon: <Club />,
                subMenus: [{ menu: '동아리 소개', link: '/clubs' }],
            },
            {
                id: 2,
                menu: '공고 관리',
                icon: <Home />,
                subMenus: [
                    { menu: '모집 공고', link: '/announcements' },
                    { menu: '공고 생성', link: '/announcements/create' },
                    { menu: '공고 편집', link: '/announcements/edit' },
                ],
            },
            {
                id: 3,
                menu: '지원자 관리',
                icon: <AplicantManage />,
                subMenus: [{ menu: '지원자 관리', link: '/applicants' }],
            },
            {
                id: 4,
                menu: '평가 관리',
                icon: <EditApplication />,
                subMenus: [
                    { menu: '서류 평가', link: '/document-evaluation' },
                    { menu: '면접 평가', link: '/interview-evaluation' },
                ],
            },
            {
                id: 5,
                menu: '면접 관리',
                icon: <ApplicationManage />,
                subMenus: [{ menu: '지원자 면접 일정 관리', link: '/interviewee-schedule' }],
            },
            {
                id: 6,
                menu: '사용자 설정',
                icon: <UserSet />,
                subMenus: [{ menu: '사용자 권한 설정', link: '/settings' }],
            },
        ],
        [],
    );

    const getActiveSubMenu = useCallback(
        (pathname: string) => {
            let activeLink = '';
            for (const main of navMenu) {
                for (const sub of main.subMenus) {
                    if (pathname.startsWith(sub.link) && sub.link.length > activeLink.length) {
                        activeLink = sub.link;
                    }
                }
            }
            return activeLink;
        },
        [navMenu],
    );

    const getMainMenuId = useCallback(
        (activeSubMenuLink: string) => {
            const activatedMenu = navMenu.find((item) =>
                item.subMenus.some((subMenu) => subMenu.link === activeSubMenuLink),
            );
            return activatedMenu?.id || 1;
        },
        [navMenu],
    );

    // state, ref, querystring hooks
    const [activeSubMenu, setActiveSubMenu] = useState<string>(getActiveSubMenu(location.pathname));
    const [activeMenus, setActiveMenus] = useState<number[]>([getMainMenuId(activeSubMenu)]);
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
    const { data: myInformation } = useQuery(userQueries.getMyInformation());

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
    const handleSubMenuClick = (link: string) => {
        const finalAnnouncementId = announcementId || currentAnnouncement?.announcementId;
        const announcementIdPath = finalAnnouncementId ? `/${finalAnnouncementId}` : '';
        goTo(`${link}/${clubId}${announcementIdPath}`);
    };

    // 공고 선택하면 모집 공고로 이동
    const handleSelectAnnouncement = (announcement: AnnouncementList) => {
        setCurrentAnnouncement(announcement);
        const targetPath = `/announcements/${clubId}/${announcement.announcementId}`;
        setActiveSubMenu('/announcements');
        goTo(targetPath);
    };

    const handleCollapsed = useCallback(
        (id: number) => {
            if (!isExpanded) {
                setIsExpanded(true);
                setActiveMenus([id]);
            } else {
                setActiveMenus((prev) => {
                    if (prev.includes(id)) {
                        // 이미 열려있으면 닫는다
                        return prev.filter((menuId) => menuId !== id);
                    } else {
                        // 닫혀있으면 연다
                        return [...prev, id];
                    }
                });
            }
        },
        [isExpanded],
    );

    //useEffect
    useEffect(() => {
        const newActiveSubMenu = getActiveSubMenu(location.pathname);
        setActiveSubMenu(newActiveSubMenu);
        const newMainMenuId = getMainMenuId(newActiveSubMenu);
        setActiveMenus((prev) => {
            if (prev.includes(newMainMenuId)) {
                return prev;
            }
            return [...prev, newMainMenuId];
        });
    }, [location.pathname, getActiveSubMenu, getMainMenuId]);

    return (
        <>
            <div css={clubSideBarContainer}>
                <div css={{ maxHeight: '70rem', overflowY: 'hidden' }}>
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
                                        // 현재 대표 경로를 유지한 채 clubId만 교체
                                        const representativePath = getActiveSubMenu(
                                            location.pathname,
                                        );
                                        const announcementIdParam = announcementId
                                            ? `/${announcementId}`
                                            : '';
                                        goTo(
                                            `${representativePath}/${club.id}${announcementIdParam}`,
                                        );
                                    }}
                                >
                                    <Tooltip content={club.name}>
                                        <img
                                            src={club.representativeImage?.url}
                                            alt="club"
                                            width="100%"
                                            height="100%"
                                            css={{ borderRadius: '10px' }}
                                        />
                                    </Tooltip>
                                </button>
                            </div>
                        ))}
                </div>
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
                            if (!activeMenus.includes(1)) handleCollapsed(1);
                            handleSubMenuClick('/clubs');
                        }}
                        sx={homeLogoTextWrapper(isExpanded)}
                    >
                        SSOC
                        {/* <img src={mainLogo} alt="mainLogo" width="80rem" height="50rem" /> */}
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
                                    <div css={dropDownChevronWrapper(isExpanded)}>
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
                                        onClick={() => {
                                            handleSelectAnnouncement(announcement);
                                        }}
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
                                        onClick={() => {
                                            handleSelectAnnouncement(announcement);
                                        }}
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
                                        onClick={() => {
                                            handleSelectAnnouncement(announcement);
                                        }}
                                    >
                                        <Text as="div" type="captionRegular" cropped noWrap>
                                            {announcement.title}
                                        </Text>
                                    </Button>
                                ))}
                            </Dropdown.Item>
                            <Button
                                variant="transparent"
                                size="full"
                                sx={createAnnouncementButton}
                                onClick={() => handleSubMenuClick('/announcements/create')}
                            >
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
                                                onClick={() => handleSubMenuClick(subMenu.link)}
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
                                <Avatar
                                    imageURL={myInformation?.representativeImage?.url}
                                    size="md"
                                    shape="round"
                                />

                                {isExpanded && (
                                    <div css={dropDownChevronWrapper(isExpanded)}>
                                        <div css={clubTextWrapper(isExpanded)}>
                                            <Text as="div" type="captionRegular">
                                                {myInformation?.name}
                                            </Text>
                                            <Text as="div" type="captionRegular">
                                                {myInformation?.email}
                                            </Text>
                                        </div>
                                        <ChevronUpDown css={chevronUpDownWrapper} />
                                    </div>
                                )}
                            </div>
                        </Dropdown.Trigger>
                        <Dropdown.Content
                            offsetX={isExpanded ? 32 : 20}
                            offsetY={0}
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
