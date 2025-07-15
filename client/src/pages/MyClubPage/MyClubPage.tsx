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
import { myClubQueries } from '@api/queryFactory/myClubQueries';
import { useSuspenseQuery } from '@tanstack/react-query';


function MyClubPage() {
    const {data: myClubs} = useSuspenseQuery(myClubQueries.all());
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
                                <Avatar radius="10px" imageURL={club.imageUrl}/>
                                <div css={clubItemText}>
                                    <Text textAlign="start">{club.name}</Text>
                                    <Text
                                        textAlign="start"
                                        type="captionRegular"
                                        color="caption"
                                        noWrap
                                        cropped
                                    >
                                        {club.shortDescription}
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
export { MyClubPage };
