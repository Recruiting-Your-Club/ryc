import ChevronLeft from '@assets/images/chevronLeft.svg';
import ChevronRight from '@assets/images/chevronRight.svg';
import XIcon from '@assets/images/xIcon.svg';
import { DocumentBox } from '@components/DocumentBox';
import { PersonalScoreCard } from '@components/PersonalScoreCard';
import { Button, Dialog, Divider, Rating, Text } from '@components/_common';
import React, { useState } from 'react';
import {
    chevronSvgCss,
    contentBody,
    contentCss,
    contentHeader,
    contentWrapper,
    dialogCss,
    documentBoxGroup,
    evalutaionContainer,
    evalutaionTitleWrapper,
    evalutaionWrapper,
    formContainer,
    formWrapper,
    headerCss,
    perStarScoreGroup,
    starScoreWrapper,
    titleWrapper,
} from './ApplicantDialog.style';

const evaluation = ['서류 평가', '면접 평가'] as const;
type EvaluationType = (typeof evaluation)[number];

interface Evaluator {
    id: number;
    name: string;
    score: number;
    comment: string;
}

interface Evaluation {
    type: EvaluationType;
    averageScore: number;
    evaluators: Evaluator[];
}

interface ApplicantDialogProps {
    open: boolean;
    handleClose: () => void;
    name: string;
    email: string;
}

function ApplicantDialog({
    open,
    handleClose,
    name = '김민지',
    email = 'test123@naver.com',
}: ApplicantDialogProps) {
    const [currentIndex, setCurrentIndex] = useState(0);

    const goPrev = () => {
        if (currentIndex > 0) setCurrentIndex((prev) => prev - 1);
    };

    const goNext = () => {
        if (currentIndex < evaluation.length - 1) setCurrentIndex((prev) => prev + 1);
    };

    const documentList = [
        {
            question: 'Q1. 자기소개 부탁드립니다.',
            answer: 'ChatGPT는 자연어 처리 기반 인공지능으로, 다양한 주제에 대해 정보를 제공하고 대화를 나눌 수 있습니다. 질문에 답하거나, 글을 작성하고, 번역 및 코드 작성까지 지원합니다. 또한 데이터 분석, 소프트웨어 개발, 학습 보조 등 다양한 분야에서 도움을 줄 수 있습니다. 고객님의 개발 공부와 진로 탐색에도 유용한 조언을 제공하며, 맞춤형 답변으로 더욱 효과적인 학습을 도와드립니다. 😊 ChatGPT는 자연어 처리 기반 인공지능으로, 다양한 주제에 대해 정보를 제공하고 대화를 나눌 수 있습니다. 질문에 답하거나, 글을 작성하고, 번역 및 코드 작성까지 지원합니다. 또한 데이터 분석, 소프트웨어 개발, 학습 보조 등 다양한 분야에서 도움을 줄 수 있습니다. 고객님의 개발 공부와 진로 탐색에도 유용한 조언을 제공하며, 맞춤형 답변으로 더욱 효과적인 학습을 도와드립니다. 😊 ChatGPT는 자연어 처리 기반 인공지능으로, 다양한 주제에 대해 정보를 제공하고 대화를 나눌 수 있습니다. 질문에 답하거나, 글을 작성하고, 번역 및 코드 작성까지 지원합니다. 또한 데이터 분석, 소프트웨어 개발, 학습 보조 등 다양한 분야에서 도움을 줄 수 있습니다. 고객님의 개발 공부와 진로 탐색에도 유용한 조언을 제공하며, 맞춤형 답변으로 더욱 효과적인 학습을 도와드립니다. 😊 ChatGPT는 자연어 처리 기반 인공지능으로, 다양한 주제에 대해 정보를 제공하고 대화를 나눌 수 있습니다. 질문에 답하거나, 글을 작성하고, 번역 및 코드 작성까지 지원합니다. 또한 데이터 분석, 소프트웨어 개발, 학습 보조 등 다양한 분야에서 도움을 줄 수 있습니다. 고객님의 개발 공부와 진로 탐색에도 유용한 조언을 제공하며, 맞춤형 답변으로 더욱 효과적인 학습을 도와드립니다. 😊 ChatGPT는 자연어 처리 기반 인공지능으로, 다양한 주제에 대해 정보를 제공하고 대화를 나눌 수 있습니다. 질문에 답하거나, 글을 작성하고, 번역 및 코드 작성까지 지원합니다. 또한 데이터 분석, 소프트웨어 개발, 학습 보조 등 다양한 분야에서 도움을 줄 수 있습니다. 고객님의 개발 공부와 진로 탐색에도 유용한 조언을 제공하며, 맞춤형 답변으로 더욱 효과적인 학습을 도와드립니다. 😊',
        },
        {
            question: 'Q2. EN#에 지원한 이유는 무엇인가요?',
            answer: 'ChatGPT는 자연어 처리 기반 인공지능으로, 다양한 주제에 대해 정보를 제공하고 대화를 나눌 수 있습니다. 질문에 답하거나, 글을 작성하고, 번역 및 코드 작성까지 지원합니다. 또한 데이터 분석, 소프트웨어 개발, 학습 보조 등 다양한 분야에서 도움을 줄 수 있습니다. 고객님의 개발 공부와 진로 탐색에도 유용한 조언을 제공하며, 맞춤형 답변으로 더욱 효과적인 학습을 도와드립니다. 😊 ChatGPT는 자연어 처리 기반 인공지능으로, 다양한 주제에 대해 정보를 제공하고 대화를 나눌 수 있습니다. 질문에 답하거나, 글을 작성하고, 번역 및 코드 작성까지 지원합니다. 또한 데이터 분석, 소프트웨어 개발, 학습 보조 등 다양한 분야에서 도움을 줄 수 있습니다. 고객님의 개발 공부와 진로 탐색에도 유용한 조언을 제공하며, 맞춤형 답변으로 더욱 효과적인 학습을 도와드립니다. 😊 ChatGPT는 자연어 처리 기반 인공지능으로, 다양한 주제에 대해 정보를 제공하고 대화를 나눌 수 있습니다. 질문에 답하거나, 글을 작성하고, 번역 및 코드 작성까지 지원합니다. 또한 데이터 분석, 소프트웨어 개발, 학습 보조 등 다양한 분야에서 도움을 줄 수 있습니다. 고객님의 개발 공부와 진로 탐색에도 유용한 조언을 제공하며, 맞춤형 답변으로 더욱 효과적인 학습을 도와드립니다. 😊 ChatGPT는 자연어 처리 기반 인공지능으로, 다양한 주제에 대해 정보를 제공하고 대화를 나눌 수 있습니다. 질문에 답하거나, 글을 작성하고, 번역 및 코드 작성까지 지원합니다. 또한 데이터 분석, 소프트웨어 개발, 학습 보조 등 다양한 분야에서 도움을 줄 수 있습니다. 고객님의 개발 공부와 진로 탐색에도 유용한 조언을 제공하며, 맞춤형 답변으로 더욱 효과적인 학습을 도와드립니다. 😊 ChatGPT는 자연어 처리 기반 인공지능으로, 다양한 주제에 대해 정보를 제공하고 대화를 나눌 수 있습니다. 질문에 답하거나, 글을 작성하고, 번역 및 코드 작성까지 지원합니다. 또한 데이터 분석, 소프트웨어 개발, 학습 보조 등 다양한 분야에서 도움을 줄 수 있습니다. 고객님의 개발 공부와 진로 탐색에도 유용한 조언을 제공하며, 맞춤형 답변으로 더욱 효과적인 학습을 도와드립니다. 😊',
        },
        {
            question:
                'Q3. 이전에 진행했었던 프로젝트에 대해서 설명해주세요. 없다면 앞으로 하고싶은 프로젝트에 대해 설명해주세요.',
            answer: 'ChatGPT는 자연어 처리 기반 인공지능으로, 다양한 주제에 대해 정보를 제공하고 대화를 나눌 수 있습니다. 질문에 답하거나, 글을 작성하고, 번역 및 코드 작성까지 지원합니다. 또한 데이터 분석, 소프트웨어 개발, 학습 보조 등 다양한 분야에서 도움을 줄 수 있습니다. 고객님의 개발 공부와 진로 탐색에도 유용한 조언을 제공하며, 맞춤형 답변으로 더욱 효과적인 학습을 도와드립니다. 😊 ChatGPT는 자연어 처리 기반 인공지능으로, 다양한 주제에 대해 정보를 제공하고 대화를 나눌 수 있습니다. 질문에 답하거나, 글을 작성하고, 번역 및 코드 작성까지 지원합니다. 또한 데이터 분석, 소프트웨어 개발, 학습 보조 등 다양한 분야에서 도움을 줄 수 있습니다. 고객님의 개발 공부와 진로 탐색에도 유용한 조언을 제공하며, 맞춤형 답변으로 더욱 효과적인 학습을 도와드립니다. 😊 ChatGPT는 자연어 처리 기반 인공지능으로, 다양한 주제에 대해 정보를 제공하고 대화를 나눌 수 있습니다. 질문에 답하거나, 글을 작성하고, 번역 및 코드 작성까지 지원합니다. 또한 데이터 분석, 소프트웨어 개발, 학습 보조 등 다양한 분야에서 도움을 줄 수 있습니다. 고객님의 개발 공부와 진로 탐색에도 유용한 조언을 제공하며, 맞춤형 답변으로 더욱 효과적인 학습을 도와드립니다. 😊 ChatGPT는 자연어 처리 기반 인공지능으로, 다양한 주제에 대해 정보를 제공하고 대화를 나눌 수 있습니다. 질문에 답하거나, 글을 작성하고, 번역 및 코드 작성까지 지원합니다. 또한 데이터 분석, 소프트웨어 개발, 학습 보조 등 다양한 분야에서 도움을 줄 수 있습니다. 고객님의 개발 공부와 진로 탐색에도 유용한 조언을 제공하며, 맞춤형 답변으로 더욱 효과적인 학습을 도와드립니다. 😊 ChatGPT는 자연어 처리 기반 인공지능으로, 다양한 주제에 대해 정보를 제공하고 대화를 나눌 수 있습니다. 질문에 답하거나, 글을 작성하고, 번역 및 코드 작성까지 지원합니다. 또한 데이터 분석, 소프트웨어 개발, 학습 보조 등 다양한 분야에서 도움을 줄 수 있습니다. 고객님의 개발 공부와 진로 탐색에도 유용한 조언을 제공하며, 맞춤형 답변으로 더욱 효과적인 학습을 도와드립니다. 😊',
        },
    ];

    const evaluations: Evaluation[] = [
        {
            type: '서류 평가',
            averageScore: 3.2,
            evaluators: [
                {
                    id: 1,
                    name: '조준희',
                    score: 4,

                    comment: '재밌네요.',
                },
                {
                    id: 2,
                    name: '조존희',
                    score: 2,

                    comment: '별론데요.',
                },
                {
                    id: 3,
                    name: '김영림',
                    score: 3.5,

                    comment: '윗 분 레전드 불편러',
                },
            ],
        },
        {
            type: '면접 평가',
            averageScore: 3.4,
            evaluators: [
                {
                    id: 1,
                    name: '조존희',
                    score: 4,

                    comment: '재밌네요.@@@@@@@@@@@@@@@@@@@@@@@@@@@',
                },
                {
                    id: 2,
                    name: '5자까지만',
                    score: 3,

                    comment: '별론데요.',
                },
                {
                    id: 3,
                    name: '김영림',
                    score: 3.5,

                    comment: '윗 분 레전드 불편러',
                },
                {
                    id: 3,
                    name: '영영영',
                    score: 4,

                    comment: '면접 참여안했지만 ㄱㅊ을듯',
                },
            ],
        },
    ];

    const currentEvaluation = evaluations[currentIndex];

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
                            <div css={evalutaionWrapper}>
                                <div css={evalutaionTitleWrapper}>
                                    <ChevronLeft
                                        css={chevronSvgCss(currentIndex > 0)}
                                        onClick={goPrev}
                                    />
                                    <Text as="span" type="captionBold" color="primary">
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
                                <div css={perStarScoreGroup}>
                                    {currentEvaluation.evaluators.map((evaluator) => (
                                        <PersonalScoreCard
                                            key={evaluator.id}
                                            score={evaluator.score}
                                            name={evaluator.name}
                                            comment={evaluator.comment}
                                        />
                                    ))}
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
