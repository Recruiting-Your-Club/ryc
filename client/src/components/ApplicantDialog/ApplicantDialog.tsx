import ChevronLeft from '@assets/images/chevronLeft.svg';
import ChevronRight from '@assets/images/chevronRight.svg';
import XIcon from '@assets/images/xIcon.svg';
import { DocumentBox } from '@components/DocumentBox';
import { PersonalScoreCard } from '@components/PersonalScoreCard';
import { Button, Dialog, Divider, Rating, Text } from '@components/_common';
import React from 'react';
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

interface ApplicantDialogProps {
    open: boolean;
    handleClose: () => void;
}

function ApplicantDialog({ open, handleClose }: ApplicantDialogProps) {
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
                        김민지
                    </Text>
                    <Text
                        as="span"
                        type="subCaptionSemibold"
                        textAlign="start"
                        color="caption"
                        sx={{ paddingTop: '0.1rem' }}
                    >
                        test123@naver.com
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
                                    <DocumentBox
                                        question="Q1. 자기소개"
                                        answer="ChatGPT는 자연어 처리 기반 인공지능으로, 다양한 주제에 대해 정보를 제공하고 대화를 나눌 수 있습니다. 질문에 답하거나, 글을 작성하고, 번역 및 코드 작성까지 지원합니다. 또한 데이터 분석, 소프트웨어 개발, 학습 보조 등 다양한 분야에서 도움을 줄 수 있습니다. 고객님의 개발 공부와 진로 탐색에도 유용한 조언을 제공하며, 맞춤형 답변으로 더욱 효과적인 학습을 도와드립니다. 😊 ChatGPT는 자연어 처리 기반 인공지능으로, 다양한 주제에 대해 정보를 제공하고 대화를 나눌 수 있습니다. 질문에 답하거나, 글을 작성하고, 번역 및 코드 작성까지 지원합니다. 또한 데이터 분석, 소프트웨어 개발, 학습 보조 등 다양한 분야에서 도움을 줄 수 있습니다. 고객님의 개발 공부와 진로 탐색에도 유용한 조언을 제공하며, 맞춤형 답변으로 더욱 효과적인 학습을 도와드립니다. 😊 ChatGPT는 자연어 처리 기반 인공지능으로, 다양한 주제에 대해 정보를 제공하고 대화를 나눌 수 있습니다. 질문에 답하거나, 글을 작성하고, 번역 및 코드 작성까지 지원합니다. 또한 데이터 분석, 소프트웨어 개발, 학습 보조 등 다양한 분야에서 도움을 줄 수 있습니다. 고객님의 개발 공부와 진로 탐색에도 유용한 조언을 제공하며, 맞춤형 답변으로 더욱 효과적인 학습을 도와드립니다. 😊 ChatGPT는 자연어 처리 기반 인공지능으로, 다양한 주제에 대해 정보를 제공하고 대화를 나눌 수 있습니다. 질문에 답하거나, 글을 작성하고, 번역 및 코드 작성까지 지원합니다. 또한 데이터 분석, 소프트웨어 개발, 학습 보조 등 다양한 분야에서 도움을 줄 수 있습니다. 고객님의 개발 공부와 진로 탐색에도 유용한 조언을 제공하며, 맞춤형 답변으로 더욱 효과적인 학습을 도와드립니다. 😊 ChatGPT는 자연어 처리 기반 인공지능으로, 다양한 주제에 대해 정보를 제공하고 대화를 나눌 수 있습니다. 질문에 답하거나, 글을 작성하고, 번역 및 코드 작성까지 지원합니다. 또한 데이터 분석, 소프트웨어 개발, 학습 보조 등 다양한 분야에서 도움을 줄 수 있습니다. 고객님의 개발 공부와 진로 탐색에도 유용한 조언을 제공하며, 맞춤형 답변으로 더욱 효과적인 학습을 도와드립니다. 😊"
                                    />
                                    <DocumentBox
                                        question="Q2. EN#에 지원한 이유는 무엇인가요?"
                                        answer="ChatGPT는 자연어 처리 기반 인공지능으로, 다양한 주제에 대해 정보를 제공하고 대화를 나눌 수 있습니다. 질문에 답하거나, 글을 작성하고, 번역 및 코드 작성까지 지원합니다. 또한 데이터 분석, 소프트웨어 개발, 학습 보조 등 다양한 분야에서 도움을 줄 수 있습니다. 고객님의 개발 공부와 진로 탐색에도 유용한 조언을 제공하며, 맞춤형 답변으로 더욱 효과적인 학습을 도와드립니다. 😊 ChatGPT는 자연어 처리 기반 인공지능으로, 다양한 주제에 대해 정보를 제공하고 대화를 나눌 수 있습니다. 질문에 답하거나, 글을 작성하고, 번역 및 코드 작성까지 지원합니다. 또한 데이터 분석, 소프트웨어 개발, 학습 보조 등 다양한 분야에서 도움을 줄 수 있습니다. 고객님의 개발 공부와 진로 탐색에도 유용한 조언을 제공하며, 맞춤형 답변으로 더욱 효과적인 학습을 도와드립니다. 😊 ChatGPT는 자연어 처리 기반 인공지능으로, 다양한 주제에 대해 정보를 제공하고 대화를 나눌 수 있습니다. 질문에 답하거나, 글을 작성하고, 번역 및 코드 작성까지 지원합니다. 또한 데이터 분석, 소프트웨어 개발, 학습 보조 등 다양한 분야에서 도움을 줄 수 있습니다. 고객님의 개발 공부와 진로 탐색에도 유용한 조언을 제공하며, 맞춤형 답변으로 더욱 효과적인 학습을 도와드립니다. 😊 ChatGPT는 자연어 처리 기반 인공지능으로, 다양한 주제에 대해 정보를 제공하고 대화를 나눌 수 있습니다. 질문에 답하거나, 글을 작성하고, 번역 및 코드 작성까지 지원합니다. 또한 데이터 분석, 소프트웨어 개발, 학습 보조 등 다양한 분야에서 도움을 줄 수 있습니다. 고객님의 개발 공부와 진로 탐색에도 유용한 조언을 제공하며, 맞춤형 답변으로 더욱 효과적인 학습을 도와드립니다. 😊 ChatGPT는 자연어 처리 기반 인공지능으로, 다양한 주제에 대해 정보를 제공하고 대화를 나눌 수 있습니다. 질문에 답하거나, 글을 작성하고, 번역 및 코드 작성까지 지원합니다. 또한 데이터 분석, 소프트웨어 개발, 학습 보조 등 다양한 분야에서 도움을 줄 수 있습니다. 고객님의 개발 공부와 진로 탐색에도 유용한 조언을 제공하며, 맞춤형 답변으로 더욱 효과적인 학습을 도와드립니다. 😊"
                                    />
                                    <DocumentBox
                                        question="Q3. EN#에 지원한 이유는 무엇인가요?"
                                        answer="ChatGPT는 자연어 처리 기반 인공지능으로, 다양한 주제에 대해 정보를 제공하고 대화를 나눌 수 있습니다. 질문에 답하거나, 글을 작성하고, 번역 및 코드 작성까지 지원합니다. 또한 데이터 분석, 소프트웨어 개발, 학습 보조 등 다양한 분야에서 도움을 줄 수 있습니다. 고객님의 개발 공부와 진로 탐색에도 유용한 조언을 제공하며, 맞춤형 답변으로 더욱 효과적인 학습을 도와드립니다. 😊 ChatGPT는 자연어 처리 기반 인공지능으로, 다양한 주제에 대해 정보를 제공하고 대화를 나눌 수 있습니다. 질문에 답하거나, 글을 작성하고, 번역 및 코드 작성까지 지원합니다. 또한 데이터 분석, 소프트웨어 개발, 학습 보조 등 다양한 분야에서 도움을 줄 수 있습니다. 고객님의 개발 공부와 진로 탐색에도 유용한 조언을 제공하며, 맞춤형 답변으로 더욱 효과적인 학습을 도와드립니다. 😊 ChatGPT는 자연어 처리 기반 인공지능으로, 다양한 주제에 대해 정보를 제공하고 대화를 나눌 수 있습니다. 질문에 답하거나, 글을 작성하고, 번역 및 코드 작성까지 지원합니다. 또한 데이터 분석, 소프트웨어 개발, 학습 보조 등 다양한 분야에서 도움을 줄 수 있습니다. 고객님의 개발 공부와 진로 탐색에도 유용한 조언을 제공하며, 맞춤형 답변으로 더욱 효과적인 학습을 도와드립니다. 😊 ChatGPT는 자연어 처리 기반 인공지능으로, 다양한 주제에 대해 정보를 제공하고 대화를 나눌 수 있습니다. 질문에 답하거나, 글을 작성하고, 번역 및 코드 작성까지 지원합니다. 또한 데이터 분석, 소프트웨어 개발, 학습 보조 등 다양한 분야에서 도움을 줄 수 있습니다. 고객님의 개발 공부와 진로 탐색에도 유용한 조언을 제공하며, 맞춤형 답변으로 더욱 효과적인 학습을 도와드립니다. 😊 ChatGPT는 자연어 처리 기반 인공지능으로, 다양한 주제에 대해 정보를 제공하고 대화를 나눌 수 있습니다. 질문에 답하거나, 글을 작성하고, 번역 및 코드 작성까지 지원합니다. 또한 데이터 분석, 소프트웨어 개발, 학습 보조 등 다양한 분야에서 도움을 줄 수 있습니다. 고객님의 개발 공부와 진로 탐색에도 유용한 조언을 제공하며, 맞춤형 답변으로 더욱 효과적인 학습을 도와드립니다. 😊"
                                    />
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
                                    <ChevronLeft css={chevronSvgCss(false)} />
                                    <Text as="span" type="captionBold" color="primary">
                                        서류 평가
                                    </Text>
                                    <ChevronRight css={chevronSvgCss} />
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
                                    <Rating value={2.5} totalStars={5} size="lg" type="display" />
                                    <Text
                                        as="span"
                                        type="captionRegular"
                                        color="primary"
                                        sx={{ paddingTop: '0.3rem' }}
                                    >
                                        (2.5)
                                    </Text>
                                </div>
                                <Divider />
                                <div css={perStarScoreGroup}>
                                    <PersonalScoreCard
                                        score={4}
                                        name="조준희"
                                        comment="재밌네요.wefwefwefwefwefwefwefwefwefwefweqwdqwdqwdqwdqqwqwdq"
                                    />
                                    <PersonalScoreCard
                                        score={1}
                                        name="조존희"
                                        comment="별론데요."
                                    />
                                    <PersonalScoreCard
                                        score={1}
                                        name="김영림"
                                        comment="윗 분 레전드 불편러"
                                    />
                                    <PersonalScoreCard
                                        score={4}
                                        name="조준희"
                                        comment="재밌네요.wefwefwefwefwefwefwefwefwefwefweqwdqwdqwdqwdqqwqwdq"
                                    />
                                    <PersonalScoreCard
                                        score={1}
                                        name="조존희"
                                        comment="별론데요."
                                    />
                                    <PersonalScoreCard
                                        score={1}
                                        name="김영림"
                                        comment="윗 분 레전드 불편러"
                                    />
                                    <PersonalScoreCard
                                        score={4}
                                        name="조준희"
                                        comment="재밌네요.wefwefwefwefwefwefwefwefwefwefweqwdqwdqwdqwdqqwqwdq"
                                    />
                                    <PersonalScoreCard
                                        score={1}
                                        name="조존희"
                                        comment="별론데요."
                                    />
                                    <PersonalScoreCard
                                        score={1}
                                        name="김영림"
                                        comment="윗 분 레전드 불편러"
                                    />
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
