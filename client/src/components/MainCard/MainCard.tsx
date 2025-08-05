import React, { useEffect } from 'react';
import { Avatar, Tag, Text } from '@components';
import {
    cardBodyContainer,
    cardContainer,
    cardFooterContainer,
    cardHeaderContainer,
    cardTitleContainer,
    logoAndTitleContainer,
} from './MainCard.style';
import type { MainCardProps } from './types';
import { getCategory } from '@utils/changeCategory';
import { Link } from 'react-router-dom';
import { TagStatus } from './TagStatus';
import { useClubStore } from '@stores/clubStore';

function MainCard({
    title = 'En#',
    category = '학술동아리',
    description = 'IT 동아리 EN# 신규 멤버 모집이야쥐기네~~~~~~',
    status = 'progress',
    clubTags = [{ name: '연극' }, { name: '워크숍' }],
    link = 'http://localhost:3000/manager',
    imageURL = '',
}: MainCardProps) {
    // prop destruction
    // lib hooks
    const { setClubName, setClubLogo, setClubCategory, setClubDescription, setClubStatus } =
        useClubStore();
    // initial values
    // state, ref, querystring hooks
    // form hooks
    // query hooks
    // calculated values
    const clubTagList = clubTags.map((tag) => `#${tag.name} `);

    // effects
    useEffect(() => {
        setClubName(title);
        setClubLogo(imageURL);
        setClubCategory(category);
        setClubDescription(description);
        setClubStatus(status);
    }, [
        title,
        imageURL,
        category,
        description,
        status,
        setClubName,
        setClubLogo,
        setClubCategory,
        setClubDescription,
        setClubStatus,
    ]);

    // handlers
    // effects
    return (
        <Link
            to={link}
            state={{ title: title, category: category, clubLogo: imageURL }}
            css={cardContainer}
        >
            <div css={cardHeaderContainer}>
                <div css={logoAndTitleContainer}>
                    <Avatar
                        shape="square"
                        size="xl"
                        radius="10px"
                        imageURL={imageURL}
                        imageName="logo"
                    />
                    <div css={cardTitleContainer}>
                        <Text
                            as="div"
                            type="bodySemibold"
                            color="black"
                            textAlign="start"
                            noWrap
                            cropped
                            sx={{ width: '19rem' }}
                        >
                            {title}
                        </Text>
                        <Text as="div" type="bodyLight" color="caption" noWrap cropped>
                            {getCategory(category)}
                        </Text>
                    </div>
                </div>
                {TagStatus(status)}
            </div>
            <div css={cardBodyContainer}>
                <Text textAlign="start" type="bodyLight" cropped noWrap>
                    {description}
                </Text>
            </div>
            <div css={cardFooterContainer}>
                <Text type="captionLight" color="primary" noWrap cropped>
                    {clubTagList}
                </Text>
            </div>
        </Link>
    );
}
export { MainCard };
