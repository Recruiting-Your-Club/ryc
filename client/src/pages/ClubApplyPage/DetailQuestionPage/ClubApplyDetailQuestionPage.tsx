import React from 'react';
import { TextArea } from '@components/_common/TextArea';
import { Text } from '@components/_common/Text';
import {
    clubApplyDetailQuestionContainer,
    s_infoIcon,
    s_labelContainer,
    s_questionStarSx,
    s_questionTitleContainer,
    s_questionTitleSx,
    textAreaSx,
} from './ClubApplyDetailQuestionPage.style';
import type { ClubApplyDetailQuestionPageProps } from '../types';
import { getAnswer } from '../utils';
import InfoIcon from '@assets/images/info.svg';
import { Tooltip } from '@components';
import { useMediaQuery } from '@hooks/useMediaQuery';

function ClubApplyDetailQuestionPage({
    answers,
    clubDetailQuestions,
    onAnswerChange,
    containerStyle,
    touched,
    onBlur,
    onFocus,
    questionRefs,
}: ClubApplyDetailQuestionPageProps) {
    const isTablet = useMediaQuery('tablet');
    return (
        <div css={containerStyle}>
            {clubDetailQuestions.map((question) => {
                const hasError =
                    question.isRequired &&
                    touched[question.questionTitle] &&
                    !getAnswer(answers, question.questionTitle)?.trim();
                return (
                    <div
                        key={question.questionTitle}
                        css={clubApplyDetailQuestionContainer}
                        tabIndex={-1}
                        ref={(element) => {
                            if (questionRefs.current) {
                                questionRefs.current[question.questionTitle] = element;
                            }
                        }}
                    >
                        <div css={s_labelContainer}>
                            <div css={s_questionTitleContainer}>
                                <Text type="bodyRegular" noWrap sx={s_questionTitleSx}>
                                    {question.questionTitle}
                                </Text>
                                {question.isRequired && (
                                    <Text type="bodyRegular" color="warning" sx={s_questionStarSx}>
                                        *
                                    </Text>
                                )}
                            </div>
                            <Tooltip
                                content={question.description}
                                direction={isTablet ? 'bottomLeft' : 'bottom'}
                            >
                                <InfoIcon css={s_infoIcon} />
                            </Tooltip>
                        </div>
                        <TextArea
                            size="lg"
                            value={getAnswer(answers, question.questionTitle)}
                            onChange={(event: React.ChangeEvent<HTMLTextAreaElement>) =>
                                onAnswerChange(question.questionTitle, event.target.value)
                            }
                            wrapperSx={{ marginTop: '0.5rem' }}
                            textAreaSx={textAreaSx}
                            error={hasError}
                            onFocus={() => onFocus(question.questionTitle)}
                            onBlur={() => onBlur(question.questionTitle)}
                            errorText={hasError ? '필수 항목입니다.' : undefined}
                        />
                    </div>
                );
            })}
        </div>
    );
}

export { ClubApplyDetailQuestionPage };
