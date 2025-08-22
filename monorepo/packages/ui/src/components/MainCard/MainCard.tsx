import React from 'react';
import { Link } from 'react-router-dom';

import { getCategory } from '@ssoc/utils';

import { Avatar } from '../Avatar';
import { Text } from '../Text';
import {
    cardBodyContainer,
    cardContainer,
    cardFooterContainer,
    cardHeaderContainer,
    cardTitleContainer,
    logoAndTitleContainer,
} from './MainCard.style';
import { TagStatus } from './TagStatus';
import type { MainCardProps } from './types';

function MainCard({
    title = 'En#',
    category = '학술동아리',
    description = 'IT 동아리 EN# 신규 멤버 모집이야쥐기네~~~~~~',
    status = 'progress',
    clubTags = [{ name: '연극' }, { name: '워크숍' }],
    link = 'http://localhost:3000/manager',
    representativeImage = '',
}: MainCardProps) {
    // prop destruction
    // lib hooks
    // initial values
    // state, ref, querystring hooks
    // form hooks
    // query hooks
    // calculated values
    const clubTagList = clubTags.map((tag) => `#${tag.name} `);
    // handlers
    // effects
    return (
        <Link
            to={link}
            state={{
                title: title,
                category: category,
                clubLogo: representativeImage,
                description: description,
                status: status,
            }}
            css={cardContainer}
        >
            <div css={cardHeaderContainer}>
                <div css={logoAndTitleContainer}>
                    <Avatar
                        shape="square"
                        size="xl"
                        radius="10px"
                        imageURL={representativeImage}
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
