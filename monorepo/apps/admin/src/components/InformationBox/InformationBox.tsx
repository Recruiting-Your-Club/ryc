import { DocumentBox } from '@components';
import React, { useState } from 'react';

import { Avatar, Text, TextToggle } from '@ssoc/ui';

import {
    s_avatar,
    s_boxContainer,
    s_contentSection,
    s_documentWrapper,
    s_invisibleText,
    s_labelText,
    s_personalDataWrapper,
    s_textContainer,
    s_textGroup,
    s_titleSection,
    s_titleText,
    s_valueText,
} from './InformationBox.style';
import type { InformationBoxProps } from './types';

function InformationBox({
    applicant,
    documentList,
    height,
    isVisible = true,
}: InformationBoxProps) {
    // prop destruction
    // lib hooks
    // initial value
    const personalInformationMap = [
        { label: '이름', value: applicant?.name },
        { label: '이메일', value: applicant?.email },
        { label: '학번', value: applicant?.studentId },
        { label: '전화번호', value: applicant?.phone },
    ];

    // state, ref, querystring hooks
    const [isToggle, setIsToggle] = useState(false);

    // form hooks
    // query hooks
    // calculated values
    // handlers
    // effects
    return (
        <div css={s_boxContainer(height)}>
            <div css={s_titleSection}>
                <Text as="span" type="captionSemibold" textAlign="start" sx={s_titleText}>
                    지원자 정보
                </Text>
                <TextToggle
                    onChange={() => setIsToggle((prev) => !prev)}
                    isChecked={isToggle}
                    leftText="인적사항"
                    rightText="지원서"
                    size="sm"
                />
            </div>
            <div css={s_contentSection}>
                {isVisible && applicant && isToggle && (
                    <div css={s_documentWrapper}>
                        {documentList?.detail.map((document, index) => (
                            <DocumentBox
                                key={document.id}
                                index={index}
                                question={document.question}
                                answer={document.answer}
                            />
                        ))}
                    </div>
                )}
                {isVisible && applicant && !isToggle && (
                    <div css={s_personalDataWrapper}>
                        <Avatar sx={s_avatar} />
                        <div css={s_textGroup}>
                            {personalInformationMap.map((item) => (
                                <div key={item.label} css={s_textContainer}>
                                    <Text
                                        as="span"
                                        type="captionSemibold"
                                        color="primary"
                                        textAlign="end"
                                        sx={s_labelText}
                                    >
                                        {item.label}
                                    </Text>
                                    <Text
                                        as="span"
                                        type="captionRegular"
                                        textAlign="start"
                                        sx={s_valueText}
                                    >
                                        {item.value}
                                    </Text>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
                {!isVisible && (
                    <div css={s_invisibleText}>
                        <Text as="span" type="captionSemibold" textAlign="center" sx={s_titleText}>
                            지원자 정보가 없습니다.
                        </Text>
                    </div>
                )}
            </div>
        </div>
    );
}

export { InformationBox };
