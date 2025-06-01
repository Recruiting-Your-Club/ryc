import React from 'react';
import {
    clubItem,
    clubItemText,
    myClubList,
    myClubPageContainer,
    myClubPageLayout,
    plusButton,
    searchButton,
} from './MyClubPage.style';
import { Text, Avatar, Button } from '@components';
import ChevronRight from '@assets/images/chevronRight.svg';

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

function MyClubPage() {
    return (
        <div css={myClubPageLayout}>
            <div css={myClubPageContainer}>
                <Text type="h4Bold" textAlign="start">
                    나의 동아리 목록
                </Text>
                <ul css={myClubList}>
                    {myClubs.map((club) => (
                        <Button variant="transparent" size="xl" key={club.id} sx={clubItem}>
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
                    ))}
                </ul>
                <Button variant="transparent" size="xl" sx={searchButton}>
                    <div css={plusButton}>+</div>
                    <Text type="bodyRegular" color="primary">
                        나의 동아리 찾기
                    </Text>
                </Button>
            </div>
        </div>
    );
}
export { MyClubPage };
