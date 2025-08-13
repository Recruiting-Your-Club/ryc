import ChevronLeft from '@assets/images/chevronLeft.svg';
import ChevronRight from '@assets/images/chevronRight.svg';
import XIcon from '@assets/images/xIcon.svg';
import {
    Button,
    Dialog,
    Divider,
    DocumentBox,
    FileDownloader,
    PersonalScoreCard,
    Rating,
    Text,
} from '@components';
import React, { useState } from 'react';
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
import type { QuestionAnswer } from '@api/domain/applicant/types';

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
                return 0;
            case applicant.status.startsWith('INTERVIEW'):
                return 1;
            case applicant.status.startsWith('FINAL'):
                return isThreeStepProcess ? 1 : 0;
            default:
                return 0;
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
            case 'MULTIPLE_CHOICE':
                return question.selectedOptionIds?.join(', ') ?? '답변 미선택';

            case 'FILE':
                return question.fileUrl ?? '파일 미첨부';

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
                                                            document.fileUrl ? (
                                                                <FileDownloader
                                                                    fileName={
                                                                        document.fileUrl
                                                                            .split('/')
                                                                            .pop() || 'download'
                                                                    }
                                                                    fileData={document.fileUrl}
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
                                        currentEvaluation.evaluationDatas.map((evaluation) => (
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
