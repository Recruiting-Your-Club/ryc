import { clubQueries } from '@api/queryFactory';
import { ClubDetailRecruitmentLoadingPage } from '@pages/LoadingPage';
import { useSuspenseQuery } from '@tanstack/react-query';
import { getCategory } from '@utils/changeCategory';
import React, { lazy, Suspense, useEffect, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

import { Avatar, Text } from '@ssoc/ui';

import { ClubNavigation } from '../../components/ClubNavigation/ClubNavigation';
import { useClubStore } from '../../stores';
import {
    clubDetailPageContainer,
    clubHeader,
    clubHeaderTextContainer,
    clubHeaderTitle,
    clubImage,
    contentContainer,
} from './ClubDetailPage.style';
import { ClubIntroPage } from './ClubIntroPage';

const LazyRecruitmentPage = lazy(() => import('./RecruitmentPage/RecruitmentPage'));

function ClubDetailPage() {
    // prop destruction
    const location = useLocation();
    const { id: clubId } = useParams<{ id: string }>();
    // lib hooks
    const { setClubName, setClubLogo, setClubCategory, setClubDescription } = useClubStore();
    // initial values
    const navigationItem = useMemo(
        () => [
            {
                title: '동아리 소개',
                page: <ClubIntroPage />,
                width: '7.5rem',
            },
            {
                title: '모집 공고',
                page: (
                    <Suspense fallback={<ClubDetailRecruitmentLoadingPage />}>
                        <LazyRecruitmentPage />
                    </Suspense>
                ),
                width: '6.4rem',
            },
        ],
        [clubId],
    );

    // state, ref, querystring hooks
    // form hooks
    // query hooks
    const { data: club } = useSuspenseQuery(clubQueries.getClub(clubId || ''));

    // calculated values
    // handlers
    // effects
    useEffect(() => {
        setClubName(club.name);
        setClubLogo(club.representativeImage.url);
        setClubCategory(club.category);
        setClubDescription(club.detailDescription);
    }, [club]);

    return (
        <div css={clubDetailPageContainer}>
            <div css={contentContainer}>
                <div css={clubHeader}>
                    <div css={clubImage}>
                        {club.representativeImage.url ? (
                            <img
                                src={club.representativeImage.url}
                                alt="대표이미지"
                                width="100%"
                                height="100%"
                                css={{ borderRadius: '10px' }}
                            />
                        ) : (
                            <Avatar
                                shape="square"
                                size="full"
                                radius="10px"
                                imageURL={club.representativeImage.url}
                                imageName="logo"
                            />
                        )}
                    </div>
                    <div css={clubHeaderTextContainer}>
                        <Text as="h4" type="h1Semibold" textAlign="start" sx={clubHeaderTitle}>
                            {club.name}
                        </Text>
                        <Text
                            as="div"
                            type="captionSemibold"
                            color="helper"
                            textAlign="start"
                            sx={{ marginLeft: '0.4rem' }}
                        >
                            {getCategory(club.category)}
                        </Text>
                    </div>
                </div>

                <ClubNavigation navigationItem={navigationItem} />
            </div>
        </div>
    );
}
export default ClubDetailPage;
