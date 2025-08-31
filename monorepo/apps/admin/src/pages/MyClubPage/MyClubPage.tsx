import { myClubQueries } from '@api/queryFactory';
import { useSuspenseQuery } from '@tanstack/react-query';
import React from 'react';

import ChevronRight from '@ssoc/assets/images/chevronRight.svg';
import { useRouter } from '@ssoc/hooks';
import { Avatar, Button, Text, useToast } from '@ssoc/ui';

import {
    clubItem,
    clubItemText,
    myClubList,
    myClubPageContainer,
    myClubPageLayout,
    plusButton,
    s_nonClub,
    searchButton,
} from './MyClubPage.style';

function MyClubPage() {
    // prop destruction
    // lib hooks
    const { goTo } = useRouter();
    const { toast } = useToast();
    // initial values
    // state, ref, querystring hooks
    // form hooks
    // query hooks
    const { data: myClubs } = useSuspenseQuery(myClubQueries.all());

    // calculated values
    const isEmpty = !myClubs || myClubs.length === 0;

    return (
        <div css={myClubPageLayout}>
            <div css={myClubPageContainer}>
                <Text type="h4Bold" textAlign="start" sx={{ marginLeft: '0.5rem' }}>
                    나의 동아리 목록
                </Text>

                {isEmpty && (
                    <div css={s_nonClub}>
                        <Text type="bodySemibold" color="caption">
                            현재 소속된 동아리가 없어요!
                        </Text>
                    </div>
                )}

                {!isEmpty && (
                    <ul css={myClubList}>
                        {myClubs.map((club) => (
                            <li key={club.myClubResponse.id}>
                                <Button
                                    variant="transparent"
                                    size="xl"
                                    sx={clubItem}
                                    onClick={() => goTo(`/clubs/${club.myClubResponse.id}`)}
                                >
                                    <Avatar
                                        radius="10px"
                                        imageURL={club.myClubResponse.representativeImage?.url}
                                    />
                                    <div css={clubItemText}>
                                        <Text textAlign="start">{club.myClubResponse.name}</Text>
                                        <Text
                                            textAlign="start"
                                            type="captionRegular"
                                            color="caption"
                                            noWrap
                                            cropped
                                        >
                                            {club.myClubResponse.shortDescription}
                                        </Text>
                                    </div>
                                    <ChevronRight width="25" height="25" strokeWidth={2} />
                                </Button>
                            </li>
                        ))}
                    </ul>
                )}
                <Button
                    variant="transparent"
                    size="xl"
                    sx={searchButton}
                    onClick={
                        () =>
                            toast.error(
                                '동아리 생성은 채널톡으로 직접 문의해주세요!',
                            ) /*goTo('/club-create')*/
                    }
                >
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
