import React from 'react';
import { TextArea } from '@components/_common/TextArea';
import { Text } from '@components/_common/Text';
import {
    clubApplyDetailQuestionContainer,
    labelContainer,
    textAreaSx,
} from './ClubApplyDetailQuestionPage.style';
import type { ClubApplyDetailQuestionPageProps } from '../types';
import { getAnswer } from '../utils';

function ClubApplyDetailQuestionPage({
    answers,
    clubDetailQuestions,
    onAnswerChange,
    containerStyle,
    touched,
    onBlur,
    onFocus,
    questionRefs,
    handleQuestionFocus,
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
                        <div css={labelContainer}>
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
                        <TextArea
                            size="lg"
                            value={getAnswer(answers, question.questionTitle)}
                            onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                                onAnswerChange(question.questionTitle, e.target.value)
                            }
                            wrapperSx={{ marginTop: '1rem' }}
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
