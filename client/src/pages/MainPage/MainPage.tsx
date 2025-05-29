import React, { useState, useEffect, useMemo } from 'react';
import banner from '@assets/images/banner.png';
import {
    bannerContainer,
    clubCategoryContainer,
    clubListContainer,
    totalClubContainer,
    mainPageContainer,
    categoryButton,
    progressContainer,
    svgContainer,
    emptyElement,
    divider,
    categorySlider,
} from './MainPage.style';
import { MainCard, Text, Button } from '@components';
import type { Category, Slider } from './types';
import Check from '@assets/images/check.svg';
import { useSuspenseQuery } from '@tanstack/react-query';
import { clubQueries } from '@api/queryFactory';
import { CLUB_CATEGORIES } from '@constants/club';

function MainPage() {
    // prop destruction
    // lib hooks
    // initial values
    // state, ref, querystring hooks
    const [isProgress, setIsProgress] = useState<boolean>(false);
    const [currentCategory, setCurrentCategory] = useState<Category>({
        id: 0,
        name: '전체',
        eng: 'all',
    });
    // form hooks
    // query hooks
    const { data: clublist } = useSuspenseQuery(clubQueries.all());

    // calculated values
    const filteredClubData = useMemo(() => {
        let filterdClub = clublist || [];
        const isAll = currentCategory.name === '전체';
        if (!isAll) {
            filterdClub = clublist?.filter((club) => currentCategory.eng === club.category) || [];
        }
        if (isProgress) {
            filterdClub = filterdClub?.filter((club) => club.status === 'progress') || [];
        }
        return filterdClub;
    }, [currentCategory, isProgress, clublist]);

    const calculatedSliderPosition = useMemo((): Slider => {
        const width = parseInt('2.8rem');
        const clubIndex = CLUB_CATEGORIES.findIndex((club) => club.name === currentCategory.name);
        const position = (width + 1.75) * clubIndex;
        return { position, width: '2.8rem' };
    }, [currentCategory]);

    // handlers
    const handleCategory = (selectedCategory: Category) => {
        setCurrentCategory((prevCategory) => {
            const isAlreadySelected = prevCategory.name === selectedCategory.name;
            if (isAlreadySelected) return CLUB_CATEGORIES[0];
            return selectedCategory;
        });
    };

    // effects
    return (
        <div css={mainPageContainer}>
            <div css={bannerContainer}>
                <img src={banner} alt="배너 이미지" width="100%" height="100%" />
            </div>
            <div css={totalClubContainer}>
                <Text type="h4Semibold" color="black">
                    총 {filteredClubData?.length}개의 동아리
                </Text>
            </div>

            <div css={clubCategoryContainer}>
                {CLUB_CATEGORIES.map((category) => (
                    <Button
                        variant="text"
                        size="s"
                        key={category.name}
                        sx={categoryButton(currentCategory.name === category.name)}
                        onClick={() => handleCategory(category)}
                    >
                        {category.name}
                    </Button>
                ))}
                <div css={emptyElement} />
                <Button
                    variant="text"
                    size="md"
                    sx={progressContainer(isProgress)}
                    onClick={() => setIsProgress((prev) => !prev)}
                >
                    <Check css={svgContainer} />
                    모집중인 동아리만 보기
                </Button>
            </div>
            <div css={{ padding: '0 0.5rem' }}>
                <div css={divider}>
                    <hr
                        css={categorySlider(
                            calculatedSliderPosition.position,
                            calculatedSliderPosition.width,
                        )}
                    />
                </div>
            </div>

            <div css={clubListContainer}>
                {filteredClubData?.map((club) => (
                    <MainCard
                        key={club.id}
                        title={club.name}
                        category={club.category}
                        description={club.shortDescription}
                        //status={data.status}
                        clubTags={club.clubTags}
                        imageURL={club.imageUrl}
                        link={club.id}
                    />
                ))}
            </div>
        </div>
    );
}
export default MainPage;
