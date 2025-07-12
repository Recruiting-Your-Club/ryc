import TimeCircle from '@assets/images/time-circle.svg';
import { Card, Checkbox, Divider, ScoreTag, Text } from '@components';
import React from 'react';
import {
    bottomCss,
    checkboxCss,
    dateTextCss,
    dateWrapper,
    dividerCss,
    emailTextCss,
    FooterCss,
    rootCss,
    timeCircleSvgCss,
} from './ApplicantCard.style';
import type { ApplicantCardProps } from './types';

function ApplicantCard({ applicant, checked, onChange, onClick }: ApplicantCardProps) {
    // prop destruction
    // lib hooks
    // initial values
    // state, ref, querystring hooks
    // form hooks
    // query hooks
    // calculated values
    // handlers
    const handleChange = (checked: boolean) => {
        onChange(applicant.email, checked);
    };
    // effects

    return (
        <Card.Root width={'23rem'} radius={'5px'} onClick={onClick} sx={rootCss}>
            <Checkbox.Root
                size="xs"
                isChecked={checked}
                onChange={(checked) => handleChange(checked)}
                onClick={(e) => e.stopPropagation()}
                sx={checkboxCss}
            >
                <Checkbox.HiddenInput />
                <Checkbox.Control />
            </Checkbox.Root>
            <Card.TopBody>
                <Card.TitleContainer
                    title={applicant.name}
                    subTitle={applicant.email}
                    subTitleSx={emailTextCss}
                />
            </Card.TopBody>
            <Card.BottomBody sx={bottomCss}>
                <span css={dateWrapper}>
                    <TimeCircle css={timeCircleSvgCss} />
                    <Card.DescriptionText description={applicant.date} sx={dateTextCss} />
                </span>
            </Card.BottomBody>
            <Divider sx={dividerCss} />
            <Card.Footer sx={FooterCss}>
                <Text
                    as="span"
                    type="helperTextBold"
                    color={applicant.status.startsWith('평가 완료') ? 'primary' : 'black'}
                >
                    {applicant.status}
                </Text>
                <ScoreTag score={applicant.score} />
            </Card.Footer>
        </Card.Root>
    );
}
export { ApplicantCard };
