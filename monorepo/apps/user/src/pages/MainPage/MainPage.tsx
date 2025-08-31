import { clubQueries } from '@api/queryFactory';
import ssocBanner from '@assets/images/ssoc-banner.png';
import { useSuspenseQuery } from '@tanstack/react-query';
import React, { useMemo, useState } from 'react';

import Check from '@ssoc/assets/images/check.svg';
import SSOC from '@ssoc/assets/images/ssoc.png';
import { Button, Dropdown, MainCard, Text } from '@ssoc/ui';

import { CLUB_CATEGORIES } from '../../constants/club';
import {
    bannerContainer,
    categoryButton,
    categoryDropdown,
    categoryProgressContainer,
    categorySlider,
    clubCategoryContainer,
    clubListContainer,
    divider,
    dropdownItem,
    mainPageContainer,
    progressContainer,
    svgContainer,
    totalClubContainer,
} from './MainPage.style';
import type { Category, Slider } from './types';

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
        let filteredClub = clublist || [];
        const isSelected = currentCategory.name !== '전체';
        if (isSelected) {
            filteredClub = clublist?.filter((club) => currentCategory.eng === club.category) || [];
        }
        if (isProgress) {
            filteredClub =
                filteredClub?.filter((club) => club.announcementStatus === 'RECRUITING') || [];
        }
        return filteredClub;
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
                <img src={ssocBanner} alt="배너 이미지" width="100%" height="100%" />
            </div>
            <div css={totalClubContainer}>
                <Text type="bodySemibold" color="black">
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

                <div css={categoryProgressContainer}>
                    <Button
                        variant="text"
                        size="md"
                        sx={progressContainer(isProgress)}
                        onClick={() => setIsProgress((prev) => !prev)}
                    >
                        <Check css={svgContainer} />
                        모집중인 동아리만 보기
                    </Button>
                    <Dropdown sx={categoryDropdown}>
                        <Dropdown.Trigger
                            sx={{ border: 'none', backgroundColor: 'transparent', width: '100%' }}
                        >
                            <Text type="captionSemibold" color="caption">
                                {currentCategory.name === '전체'
                                    ? '카테고리'
                                    : currentCategory.name}
                            </Text>
                        </Dropdown.Trigger>
                        <Dropdown.Content sx={{ border: 'none' }} offsetX={-2}>
                            <Dropdown.Item sx={dropdownItem}>
                                {CLUB_CATEGORIES.map((category) => (
                                    <Dropdown.Label
                                        key={category.name}
                                        onClick={() => handleCategory(category)}
                                    >
                                        {category.name}
                                    </Dropdown.Label>
                                ))}
                            </Dropdown.Item>
                        </Dropdown.Content>
                    </Dropdown>
                </div>
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
                        status={club.announcementStatus || ''}
                        clubTags={club.clubTags}
                        representativeImage={club.representativeImage?.url || SSOC}
                        link={club.id}
                    />
                ))}
            </div>
        </div>
    );
}
export default MainPage;
