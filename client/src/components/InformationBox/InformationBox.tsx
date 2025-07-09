import { TextToggle } from '@components';
import { DocumentBox } from '@components/DocumentBox';
import { Avatar, Text } from '@components/_common';
import React, { useState } from 'react';
import {
    avatarCss,
    boxContainer,
    contentSection,
    documentWrapper,
    personalDataWrapper,
    s_titleText,
    textSection,
    titleSection,
} from './InformationBox.style';
import type { InformationBoxProps } from './types';

function InformationBox({ applicant, documentList, height }: InformationBoxProps) {
    // prop destruction
    // lib hooks
    // initial value
    const textMap = [
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
        <div css={boxContainer(height)}>
            <div css={titleSection}>
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
            <div css={contentSection}>
                {applicant && isToggle && (
                    <div css={documentWrapper}>
                        {documentList?.detail.map((document, index) => (
                            <DocumentBox
                                key={index}
                                index={index}
                                question={document.question}
                                answer={document.answer}
                            />
                        ))}
                    </div>
                )}
                {applicant && !isToggle && (
                    <div css={personalDataWrapper}>
                        <Avatar sx={avatarCss} />
                        <div css={textSection}>
                            {textMap.map((item) => (
                                <Text
                                    key={item.label}
                                    as="span"
                                    type="captionSemibold"
                                    color="primary"
                                    textAlign="end"
                                >
                                    {item.label}
                                </Text>
                            ))}
                        </div>
                        <div css={textSection}>
                            {textMap.map((item) => (
                                <Text
                                    key={item.label}
                                    as="span"
                                    type="captionRegular"
                                    textAlign="start"
                                >
                                    {item.value}
                                </Text>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export { InformationBox };
