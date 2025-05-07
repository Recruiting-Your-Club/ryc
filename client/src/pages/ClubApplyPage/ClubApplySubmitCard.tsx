import React from 'react';
import { Text } from '@components/_common/Text';
import { clubData } from './ClubApplyPage';
import {
    clubApplySubmitCard,
    clubApplySubmitCardLogo,
    clubApplySubmitCardSubCaption,
    svgContainer,
} from './ClubApplyPage.style';
import { Button } from '@components';
import Ryc from '@assets/images/Ryc.svg';

function ClubApplySubmitCard() {
    return (
        <div css={clubApplySubmitCard}>
            <div css={clubApplySubmitCardLogo}>
                <Ryc css={svgContainer} />
                <Text type="subCaptionRegular" color="warning">
                    D-1
                </Text>
                {/* <Text type="subCaptionRegular" color="caption">
                    ~ 5.23
                </Text> */}
            </div>
            <Text textAlign="left" type="bodyBold">
                {clubData.clubName}
            </Text>
            <div css={clubApplySubmitCardSubCaption}>
                <Text textAlign="left" type="subCaptionLight" color="subCaption">
                    {clubData.tag}
                </Text>
                <Text textAlign="left" type="subCaptionLight" color="subCaption">
                    26기 신입기수 모집
                </Text>
            </div>
            <Button size="full">제출하기</Button>
        </div>
    );
}

export { ClubApplySubmitCard };
