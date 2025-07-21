import TimeCircle from '@assets/images/time-circle.svg';
import { Card, Checkbox, Divider, ScoreTag, Text } from '@components';
import React from 'react';
import {
    s_bottom,
    s_checkbox,
    s_dateText,
    s_dateWrapper,
    s_divider,
    s_emailText,
    s_Footer,
    s_root,
    s_timeCircleSvg,
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
        <Card.Root width={'23rem'} radius={'5px'} onClick={onClick} sx={s_root}>
            <Checkbox.Root
                variant="solid"
                size="xs"
                isChecked={checked}
                onChange={(checked) => handleChange(checked)}
                onClick={(e) => e.stopPropagation()}
                sx={s_checkbox}
            >
                <Checkbox.HiddenInput />
                <Checkbox.Control />
            </Checkbox.Root>
            <Card.TopBody>
                <Card.TitleContainer
                    title={applicant.name}
                    subTitle={applicant.email}
                    subTitleSx={s_emailText}
                />
            </Card.TopBody>
            <Card.BottomBody sx={s_bottom}>
                <span css={s_dateWrapper}>
                    <TimeCircle css={s_timeCircleSvg} />
                    <Card.DescriptionText description={applicant.date} sx={s_dateText} />
                </span>
            </Card.BottomBody>
            <Divider sx={s_divider} />
            <Card.Footer sx={s_Footer}>
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
