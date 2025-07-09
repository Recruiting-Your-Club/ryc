import React from 'react';

import ChevronRight from '@ssoc/assets/images/chevronRight.svg';
import { Avatar, Button, Text } from '@ssoc/ui';

import {
    clubItem,
    clubItemText,
    myClubList,
    myClubPageContainer,
    myClubPageLayout,
    plusButton,
    searchButton,
} from './ClubSearchPage.style';

const myClubs = [
    {
        id: 1, // 고유 ID는 key prop으로 사용하기에 가장 좋습니다.
        name: 'En#(엔샵)',
        description: '세종대학교 SW개발동아리 En#입니다.',
        avatarSrc: 'https://example.com/avatar_en_sharp.png', // 실제 이미지 경로
    },
    {
        id: 2,
        name: 'CCC',
        description: '아름다운 대학 생활을 만드는 기독교 동아리 CCC입니다.',
        avatarSrc: 'https://example.com/avatar_ccc.png', // 실제 이미지 경로
    },
    {
        id: 3,
        name: '비상구',
        description: '세종대학교 중앙 연극 동아리 비상구입니다.',
        avatarSrc: 'https://example.com/avatar_bisanggu.png',
    },
    {
        id: 4,
        name: '비상구',
        description: '세종대학교 중앙 연극 동아리 비상구입니다.',
        avatarSrc: 'https://example.com/avatar_bisanggu.png',
    },
];

function ClubSearchPage() {
    return (
        <div css={myClubPageLayout}>
            <div css={myClubPageContainer}>
                <Text type="h4Bold" textAlign="start" sx={{ marginLeft: '0.5rem' }}>
                    나의 동아리 목록
                </Text>
                <ul css={myClubList}>
                    {myClubs.map((club) => (
                        <li key={club.id}>
                            <Button variant="transparent" size="xl" sx={clubItem}>
                                <Avatar radius="10px" />
                                <div css={clubItemText}>
                                    <Text textAlign="start">{club.name}</Text>
                                    <Text
                                        textAlign="start"
                                        type="captionRegular"
                                        color="caption"
                                        noWrap
                                        cropped
                                    >
                                        {club.description}
                                    </Text>
                                </div>
                                <ChevronRight width="25" height="25" strokeWidth={2} />
                            </Button>
                        </li>
                    ))}
                </ul>
                <Button variant="transparent" size="xl" sx={searchButton}>
                    <div css={plusButton}>+</div>
                    <Text type="bodyRegular" color="primary">
                        새 동아리 만들기
                    </Text>
                </Button>
                <Text type="captionSemibold" color="caption">
                    참여할 다른 동아리가 있으시다면? <br />
                    동아리 회장에게 문의하거나 초대링크를 찾아 눌러주세요.
                </Text>
            </div>
        </div>
    );
}
export { ClubSearchPage };
