import type { QuestionAnswer } from '@api/domain/applicant/types';
import ChevronLeft from '@assets/images/chevronLeft.svg';
import ChevronRight from '@assets/images/chevronRight.svg';
import XIcon from '@assets/images/xIcon.svg';
import { DocumentBox, FileDownloader, PersonalScoreCard } from '@components';
import { EVALUATION_FIRST_PAGE, EVALUATION_SECOND_PAGE } from '@constants/applicantDialog';
import React, { useState } from 'react';

import { Button, Dialog, Divider, Rating, Text } from '@ssoc/ui';

import {
    chevronSvgCss,
    contentBody,
    contentCss,
    contentHeader,
    contentWrapper,
    dialogCss,
    documentBoxGroup,
    evaluationContainer,
    evalutaionContainer,
    evalutaionTitleWrapper,
    formContainer,
    formWrapper,
    headerCss,
    perStarScoreGroup,
    s_documentTypeTextWrapper,
    starScoreWrapper,
    titleWrapper,
} from './ApplicantDialog.style';
import type { ApplicantDialogProps } from './types';

function ApplicantDialog({
    open,
    handleClose,
    applicant,
    evaluationLabels,
    personalInformation,
    preQuestionAnswers,
    applicationQuestionAnswers,
    evaluations,
    isThreeStepProcess,
}: ApplicantDialogProps) {
    // prop destruction
    // lib hooks
    // initial values
    const initialIndex = getInitialIndex();

    // state, ref, querystring hooks
    const [currentIndex, setCurrentIndex] = useState(initialIndex);

    // form hooks
    // query hooks
    // calculated values
    const currentEvaluation = evaluations[currentIndex];
    const currentLabel = evaluationLabels[currentIndex];
    const hasEvaluation = currentEvaluation.completedEvaluatorCount > 0;

    function getInitialIndex() {
        switch (true) {
            case applicant.status.startsWith('DOCUMENT'):
                return EVALUATION_FIRST_PAGE;
            case applicant.status.startsWith('INTERVIEW'):
                return EVALUATION_SECOND_PAGE;
            case applicant.status.startsWith('FINAL'):
                return isThreeStepProcess ? EVALUATION_SECOND_PAGE : EVALUATION_FIRST_PAGE;
            default:
                return EVALUATION_FIRST_PAGE;
        }
    }

    const documentGroups = [
        { label: '▶ 사전질문', documents: preQuestionAnswers ?? [] },
        { label: '▶ 자기소개서', documents: applicationQuestionAnswers ?? [] },
    ];

    const formatAnswer = (question: QuestionAnswer): string => {
        switch (question.questionType) {
            case 'LONG_ANSWER':
            case 'SHORT_ANSWER':
                return question.textAnswer ?? '답변 미작성';

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
                return question.file?.originalFileName ?? '파일 미첨부';

            default:
                return '답변 미작성';
        }
    };

    // handlers
    const goPrev = () => {
        if (currentIndex > 0) setCurrentIndex((prev) => prev - 1);
    };

    const goNext = () => {
        if (currentIndex < evaluations.length - 1) setCurrentIndex((prev) => prev + 1);
    };

    // effects

    return (
        <Dialog open={open} handleClose={handleClose} size="full" sx={dialogCss}>
            <Dialog.Header position="start" sx={headerCss}>
                <Text as="span" type="bodyBold" sx={{ paddingTop: '0.3rem' }}>
                    지원자 정보
                </Text>
                <Button variant="transparent" size="xs" aria-label="close" onClick={handleClose}>
                    <XIcon alt="close" />
                </Button>
            </Dialog.Header>
            <Divider color="black" sx={{ borderTop: '1px solid' }} />
            <Dialog.Content sx={contentCss}>
                <div css={contentHeader}>
                    <Text as="span" type="h3Bold" textAlign="start">
                        {applicant.name}
                    </Text>
                    <Text
                        as="span"
                        type="subCaptionSemibold"
                        textAlign="start"
                        color="caption"
                        sx={{ paddingTop: '0.1rem' }}
                    >
                        {applicant.email}
                        {personalInformation &&
                            personalInformation
                                .filter((info) =>
                                    ['STUDENT_ID', 'PHONE_NUMBER'].includes(info.questionType),
                                )
                                .map((info, index) => (
                                    <span key={info.questionType}>
                                        {index >= 0 && ' | '}
                                        {info.value}
                                    </span>
                                ))}
                    </Text>
                </div>
                <Divider width="full" />
                <div css={contentBody}>
                    <div css={formContainer}>
                        <div css={titleWrapper}>
                            <Text
                                as="span"
                                type="bodyBold"
                                textAlign="start"
                                sx={{ paddingTop: '0.3rem' }}
                            >
                                지원서
                            </Text>
                        </div>
                        <div css={contentWrapper}>
                            <div css={formWrapper}>
                                <div css={documentBoxGroup}>
                                    {documentGroups.map(({ label, documents }) =>
                                        documents.length > 0 ? (
                                            <>
                                                <div css={s_documentTypeTextWrapper}>
                                                    <Text
                                                        as="span"
                                                        type="bodyBold"
                                                        textAlign="start"
                                                    >
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
                                                                        document.file.originalFileName
                                                                            .split('/')
                                                                            .pop() || 'download'
                                                                    }
                                                                    fileData={document.file.url}
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
                            </div>
                        </div>
                    </div>
                    <div css={evalutaionContainer}>
                        <div css={titleWrapper}>
                            <Text
                                as="span"
                                type="bodyBold"
                                textAlign="start"
                                sx={{ paddingTop: '0.3rem' }}
                            >
                                지원자 평가
                            </Text>
                        </div>
                        <div css={contentWrapper}>
                            <div css={evaluationContainer}>
                                <div css={evalutaionTitleWrapper}>
                                    <ChevronLeft
                                        css={chevronSvgCss(currentIndex > 0)}
                                        onClick={goPrev}
                                    />
                                    <Text as="span" type="captionBold">
                                        {currentLabel}
                                    </Text>
                                    <ChevronRight
                                        css={chevronSvgCss(currentIndex < evaluations.length - 1)}
                                        onClick={goNext}
                                    />
                                </div>
                                <Divider />
                                <div css={starScoreWrapper}>
                                    <Text
                                        as="span"
                                        type="captionSemibold"
                                        noWrap
                                        sx={{ paddingTop: '0.3rem', marginRight: '0.4rem' }}
                                    >
                                        평균 평점
                                    </Text>
                                    <Rating
                                        key={currentEvaluation.averageScore}
                                        value={currentEvaluation.averageScore}
                                        totalStars={5}
                                        size="lg"
                                        type="display"
                                    />
                                    <Text
                                        as="span"
                                        type="captionRegular"
                                        color="primary"
                                        sx={{ paddingTop: '0.3rem' }}
                                    >
                                        ({currentEvaluation.averageScore})
                                    </Text>
                                </div>
                                <Divider />
                                <div css={perStarScoreGroup(hasEvaluation)}>
                                    {hasEvaluation ? (
                                        currentEvaluation.evaluationDetails.map((evaluation) => (
                                            <PersonalScoreCard
                                                key={evaluation.evaluationId}
                                                score={evaluation.score}
                                                name={evaluation.evaluatorName}
                                                comment={evaluation.comment}
                                            />
                                        ))
                                    ) : (
                                        <Text as="span" type="captionSemibold">
                                            등록된 평가가 없습니다.
                                        </Text>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Dialog.Content>
        </Dialog>
    );
}

export { ApplicantDialog };
