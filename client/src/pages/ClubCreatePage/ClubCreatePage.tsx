import React, { useState } from 'react';
import {
    clubContainer,
    clubContainerLayout,
    clubPreviewBox,
    clubCreateBox,
    clubListContainer,
    clubContentContainer,
    clubCreatetitle,
    clubCreateExampleText,
    clubContentTextContainer,
    clubCreateInputBox,
    createSubmitButton,
    createInputLabel,
} from './ClubCreatePage.style';
import { Text, Avatar, Input, Button } from '@components';

const clubList = [
    {
        name: '동아리 이름',
        category: '동아리 태그입니다.',
        avatar: null,
    },
    {
        name: 'En#(엔샵)',
        category: '학술 동아리',
    },
    {
        name: 'CCC',
        category: '종교 동아리',
        avatar: 'CCC 아멘',
    },
    {
        name: '농구왕',
        category: '문화 동아리',
        avatar: '농구가 젤 좋아',
    },
];
function ClubCreatePage() {
    // prop destruction
    // lib hooks
    // initial values
    // state, ref, querystring hooks
    const [createClubName, setCreateClubName] = useState('동아리 이름');
    const [createClubTag, setCreateClubTag] = useState('동아리 태그입니다.');
    // form hooks
    // query hooks
    // calculated values
    // handlers
    // effects
    return (
        <div css={clubContainerLayout}>
            <div css={clubContainer}>
                <div>
                    <Text type="bodySemibold" textAlign="start" sx={clubCreateExampleText}>
                        <span css={{ fontSize: '2rem' }}>📝</span> 이렇게 추가될 거예요
                    </Text>
                    <div css={clubPreviewBox}>
                        <Text type="bodyBold" textAlign="start" sx={clubCreatetitle}>
                            나의 동아리 목록
                        </Text>
                        <ul css={clubListContainer}>
                            {clubList.map((club, index) => (
                                <li key={index} css={clubContentContainer(index)}>
                                    <Avatar radius="10px" />
                                    <div css={clubContentTextContainer}>
                                        <Text type="bodySemibold" textAlign="start" noWrap cropped>
                                            {index === 0 ? createClubName : club.name}
                                        </Text>
                                        <Text
                                            type="captionRegular"
                                            textAlign="start"
                                            color="caption"
                                        >
                                            {index === 0 ? createClubTag : club.category}
                                        </Text>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                <div css={clubCreateBox}>
                    <Avatar radius="10px" />
                    <div css={clubCreateInputBox}>
                        <Input
                            type="text"
                            placeholder="동아리 이름을 입력해주세요."
                            label="동아리 이름"
                            onChange={(event) => setCreateClubName(event.target.value)}
                            required
                            labelSx={createInputLabel}
                        />
                        <Input
                            type="text"
                            label="동아리 태그"
                            helperText="동아리의 대표적인 태그를 선택해주세요."
                            required
                            inputSx={createInputLabel}
                            labelSx={createInputLabel}
                        />
                        <Button variant="primary" size="lg" sx={createSubmitButton}>
                            제출하기
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}
export { ClubCreatePage };
