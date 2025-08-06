import React, { useEffect, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { ClubNavigation, Text } from '@components';
import {
    clubDetailPageContainer,
    clubHeader,
    clubHeaderTextContainer,
    clubHeaderTitle,
    clubImage,
    contentContainer,
} from './ClubDetailPage.style';
import { RecruitmentPage } from './RecruitmentPage';
import { ClubIntroPage } from './ClubIntroPage';
import { useLocation } from 'react-router-dom';
import { getCategory } from '@utils/changeCategory';
import { useClubStore } from '@stores/clubStore';

function ClubDetailPage() {
    // prop destruction
    const location = useLocation();
    const { title, category, clubLogo, description, status } = location.state;
    const { id: clubId } = useParams<{ id: string }>();
    // lib hooks
    const { setClubName, setClubLogo, setClubCategory, setClubDescription, setClubStatus } =
        useClubStore();
    // initial values
    console.log(title, category, clubLogo, description, status);
    const navigationItem = useMemo(
        () => [
            {
                title: '동아리 소개',
                page: <ClubIntroPage />,
                width: '7.5rem',
            },
            {
                title: '모집 공고',
                page: <RecruitmentPage />,
                width: '6.4rem',
            },
        ],
        [clubId],
    );

    // state, ref, querystring hooks
    // form hooks
    // query hooks
    // calculated values
    // handlers
    // effects
    useEffect(() => {
        setClubName(title);
        setClubLogo(clubLogo);
        setClubCategory(category);
        setClubDescription(description);
        setClubStatus(status);
    }, [title, clubLogo, category, description, status]);

    return (
        <div css={clubDetailPageContainer}>
            <div css={contentContainer}>
                <div css={clubHeader}>
                    <div css={clubImage}>
                        <img
                            src={clubLogo}
                            alt="대표이미지"
                            width="100%"
                            height="100%"
                            css={{ borderRadius: '10px' }}
                        />
                    </div>
                    <div css={clubHeaderTextContainer}>
                        <Text as="h4" type="h1Semibold" textAlign="start" sx={clubHeaderTitle}>
                            {title}
                        </Text>
                        <Text
                            as="div"
                            type="captionSemibold"
                            color="helper"
                            textAlign="start"
                            sx={{ marginLeft: '0.4rem' }}
                        >
                            {getCategory(category)}
                        </Text>
                    </div>
                </div>

                <ClubNavigation navigationItem={navigationItem} />
            </div>
        </div>
    );
}
export default ClubDetailPage;
