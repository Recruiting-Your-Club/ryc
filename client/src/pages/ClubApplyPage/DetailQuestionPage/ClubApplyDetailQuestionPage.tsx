import React from 'react';
import { TextArea } from '@components/_common/TextArea';
import { Text } from '@components/_common/Text';
import {
    clubApplyDetailQuestionContainer,
    s_infoIcon,
    s_labelContainer,
    s_questionTitleContainer,
    textAreaSx,
} from './ClubApplyDetailQuestionPage.style';
import type { ClubApplyDetailQuestionPageProps } from '../types';
import { getAnswer } from '../utils';
import InfoIcon from '@assets/images/info.svg';
import { Tooltip } from '@components';

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
                        onFocus={() => onFocus(question.questionTitle)}
                        onBlur={() => onBlur(question.questionTitle)}
                        ref={(element) => {
                            if (questionRefs.current) {
                                questionRefs.current[question.questionTitle] = element;
                            }
                        }}
                    >
                        <div css={s_labelContainer}>
                            <div css={s_questionTitleContainer}>
                                <Text type="bodyRegular" sx={{ marginLeft: '0.5rem' }}>
                                    {question.questionTitle}
                                </Text>
                                {question.isRequired && (
                                    <Text
                                        type="bodyRegular"
                                        color="warning"
                                        sx={{ marginTop: '0.5rem' }}
                                    >
                                        *
                                    </Text>
                                )}
                            </div>
                            <Tooltip content={question.description}>
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
