import React from 'react';
import { Text } from '@components/_common/Text';
import { Button } from '@components';
import Ryc from '@assets/images/Ryc.svg';
import {
    clubApplySubmitCardContainer,
    clubSubmitCard,
    clubSubmitCardLogo,
    clubSubmitCardSubCaption,
    svgContainer,
} from './ClubSubmitCard.style';

interface ClubSubmitCardProps {
    clubName: string;
    tag: string;
    deadline?: string;
}

function ClubSubmitCard({ clubName, tag, deadline }: ClubSubmitCardProps) {
    return (
        <div css={clubApplySubmitCardContainer}>
            <div css={clubSubmitCard}>
                <div css={clubSubmitCardLogo}>
                    <Ryc css={svgContainer} />
                    {deadline && (
                        <Text type="subCaptionRegular" color="warning">
                            {deadline}
                        </Text>
                    )}
                </div>
                <Text textAlign="left" type="bodyBold">
                    {clubName}
                </Text>
                <div css={clubSubmitCardSubCaption}>
                    <Text textAlign="left" type="subCaptionLight" color="subCaption">
                        {tag}
                    </Text>
                    <Text textAlign="left" type="subCaptionLight" color="subCaption">
                        26기 신입기수 모집
                    </Text>
                </div>
                <Button size="full">제출하기</Button>
            </div>
        </div>
    );
}

export { ClubSubmitCard };
