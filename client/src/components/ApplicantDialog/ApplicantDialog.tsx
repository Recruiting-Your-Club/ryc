import ChevronLeft from '@assets/images/chevronLeft.svg';
import ChevronRight from '@assets/images/chevronRight.svg';
import XIcon from '@assets/images/xIcon.svg';
import { Button, Dialog, Divider, DocumentBox, PersonalScoreCard, Rating, Text } from '@components';
import { evaluation } from '@constants/ApplicantDialog';
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
    starScoreWrapper,
    titleWrapper,
} from './ApplicantDialog.style';
import type { ApplicantDialogProps } from './types';

function ApplicantDialog({
    open,
    handleClose,
    name,
    email,
    documentList,
    evaluations,
}: ApplicantDialogProps) {
    // prop destruction
    // lib hooks
    // initial values
    // state, ref, querystring hooks
    const [currentIndex, setCurrentIndex] = useState(0);

    // form hooks
    // query hooks
    // calculated values
    // handlers
    const goPrev = () => {
        if (currentIndex > 0) setCurrentIndex((prev) => prev - 1);
    };

    const goNext = () => {
        if (currentIndex < evaluation.length - 1) setCurrentIndex((prev) => prev + 1);
    };

    const currentEvaluation = evaluations[currentIndex];
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
                        {name}
                    </Text>
                    <Text
                        as="span"
                        type="subCaptionSemibold"
                        textAlign="start"
                        color="caption"
                        sx={{ paddingTop: '0.1rem' }}
                    >
                        {email}
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
                                    {documentList.map((document, index) => (
                                        <DocumentBox
                                            key={index}
                                            index={index}
                                            question={document.question}
                                            answer={document.answer}
                                        />
                                    ))}
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
                                        {currentEvaluation.type}
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
                                        key={currentEvaluation.type}
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
                                <div
                                    css={perStarScoreGroup(currentEvaluation.evaluators.length > 0)}
                                >
                                    {currentEvaluation.evaluators.length > 0 ? (
                                        currentEvaluation.evaluators.map((evaluator) => (
                                            <PersonalScoreCard
                                                key={evaluator.id}
                                                score={evaluator.score}
                                                name={evaluator.name}
                                                comment={evaluator.comment}
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
