import React, { useState } from 'react';
import { Text } from '@components/_common/Text';
import {
    clubApplyForm,
    clubApplyFormConatiner,
    clubApplyPageContainer,
    clubApplyTabContainer,
    clubApplyTabName,
    clubLogoAndNameContainer,
    clubNameContainer,
    clubTagContainer,
    svgContainer,
} from './ClubApplyPage.style';
import Ryc from '@assets/images/Ryc.svg';
import { Button, Input } from '@components';
import { Radio } from '@components/_common/Radio';
import { ClubApplySubmitCard } from './ClubApplySubmitCard';
//질문 배열로 받아서 form map으로 뿌리기

export const clubData = {
    clubName: '엔샵 (Enjoy C#)',
    tag: '학술동아리',
    name: '이름',
    birth: '생년월일',
    phoneNumber: '전화번호',
    gender: '성별',
};
const applyData = [
    {
        question: '사전질문',
        index: 0,
    },
    { question: '자기소개서', index: 1 },
];

function ClubApplyPage() {
    return (
        <div css={clubApplyPageContainer}>
            <div css={clubLogoAndNameContainer}>
                <Ryc css={svgContainer} />
                <div css={clubNameContainer}>
                    {clubData.clubName}
                    <div css={clubTagContainer}>{clubData.tag}</div>
                </div>
            </div>
            <ClubApplySubmitCard />
            <div css={clubApplyTabContainer}>
                {applyData.map((data) => (
                    <Button key={data.question} variant="text" sx={clubApplyTabName}>
                        {data.question}
                    </Button>
                ))}
            </div>

            <div css={clubApplyFormConatiner}>
                <div css={clubApplyForm}>
                    <Input variant="lined" label={clubData.name} inputSx={{ width: '50%' }} />
                </div>
                <div css={clubApplyForm}>
                    <Input variant="lined" label={clubData.birth} inputSx={{ width: '50%' }} />
                </div>
                <div css={clubApplyForm}>
                    <Input
                        variant="lined"
                        label={clubData.phoneNumber}
                        inputSx={{ width: '50%' }}
                    />
                </div>
                <div css={clubApplyForm}>
                    <Text>{clubData.gender}</Text>
                    <Radio
                        name="gender"
                        orientation="vertical"
                        options={[
                            { label: '남', value: 'male' },
                            { label: '여', value: 'female' },
                        ]}
                        // eslint-disable-next-line no-console
                        onChange={() => console.log('a')}
                    />
                </div>
            </div>
        </div>
    );
}

export { ClubApplyPage };
