import type { QuestionAnswer } from '@api/domain/applicant/types';
import { DocumentBox, FileDownloader } from '@components';
import React, { useState } from 'react';

import { Avatar, Text, TextToggle } from '@ssoc/ui';

import {
    s_avatar,
    s_boxContainer,
    s_contentSection,
    s_documentTypeTextWrapper,
    s_documentWrapper,
    s_invisibleText,
    s_personalDataWrapper,
    s_textGroup,
    s_titleSection,
    s_titleText,
} from './InformationBox.style';
import type { InformationBoxProps } from './types';

function InformationBox({
    name,
    email,
    profileImage,
    personalInformation,
    preQuestionAnswers,
    applicationQuestionAnswers,
    height,
}: InformationBoxProps) {
    // prop destruction
    // lib hooks
    // initial value
    const textMap = [
        { label: '이름', value: name },
        { label: '이메일', value: email },
        { label: '학번', value: getPersonalValue('STUDENT_ID') },
        { label: '전화번호', value: getPersonalValue('PHONE_NUMBER') },
    ];

    // state, ref, querystring hooks
    const [isToggle, setIsToggle] = useState(false);

    // form hooks
    // query hooks
    // calculated values
    const documentGroups = [
        { label: '▶ 사전질문', documents: preQuestionAnswers ?? [] },
        { label: '▶ 자기소개서', documents: applicationQuestionAnswers ?? [] },
    ];

    const formatAnswer = (question: QuestionAnswer): string => {
        switch (question.questionType) {
            case 'LONG_ANSWER':
            case 'SHORT_ANSWER':
                return question.textAnswer || '답변 미작성';

            case 'SINGLE_CHOICE':
            case 'MULTIPLE_CHOICE': {
                if (!question.selectedOptionIds?.length) {
                    return '답변 미선택';
                }

                const selectedOptions = question.selectedOptionIds
                    .map(
                        (id) =>
                            question.questionOptions?.find((option) => option.optionId === id)
                                ?.option,
                    )
                    .filter((option): option is string => Boolean(option));

                return selectedOptions.length > 0 ? selectedOptions.join(', ') : '답변 미선택';
            }

            case 'FILE':
                return question.file?.originalFileName || '파일 미첨부';

            default:
                return '답변 미작성';
        }
    };

    // handlers
    // effects
    // etc
    function getPersonalValue(type: string) {
        return (
            personalInformation.find((information) => information.questionType === type)?.value ||
            ''
        );
    }

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
                {(preQuestionAnswers.length > 0 || applicationQuestionAnswers.length > 0) &&
                    isToggle && (
                        <div css={s_documentWrapper}>
                            {documentGroups.map(({ label, documents }) =>
                                documents.length > 0 ? (
                                    <>
                                        <div css={s_documentTypeTextWrapper}>
                                            <Text as="span" type="bodyBold" textAlign="start">
                                                {label}
                                            </Text>
                                        </div>
                                        {documents.map((document, index) => (
                                            <DocumentBox
                                                key={document.questionId}
                                                index={index}
                                                question={document.questionLabel}
                                                answer={
                                                    document.questionType === 'FILE' &&
                                                    document.file?.url ? (
                                                        <FileDownloader
                                                            fileName={
                                                                document.file?.originalFileName
                                                                    .split('/')
                                                                    .pop() || 'download'
                                                            }
                                                            fileData={document.file?.url}
                                                        />
                                                    ) : (
                                                        formatAnswer(document)
                                                    )
                                                }
                                            />
                                        ))}
                                    </>
                                ) : null,
                            )}
                        </div>
                    )}
                {personalInformation.length > 0 && !isToggle && (
                    <div css={s_personalDataWrapper}>
                        <Avatar sx={s_avatar} imageURL={profileImage?.url ?? ''} />
                        <div css={s_textGroup}>
                            {textMap
                                .filter((item) => item.value.trim().length > 0)
                                .map((item) => (
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
                        <div css={s_textGroup}>
                            {textMap
                                .filter((item) => item.value.trim().length > 0)
                                .map((item) => (
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
                {!personalInformation?.length && (
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
