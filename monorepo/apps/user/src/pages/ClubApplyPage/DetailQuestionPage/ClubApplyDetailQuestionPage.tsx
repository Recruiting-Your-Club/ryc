import React from 'react';

import { useMediaQuery } from '@ssoc/hooks';
import { Text, TextArea, Tooltip } from '@ssoc/ui';

import InfoIcon from '../../../asset/images/info.svg';
import type { ClubApplyDetailQuestionPageProps } from '../types';
import { getAnswer } from '../utils';
import {
    clubApplyDetailQuestionContainer,
    s_infoIcon,
    s_labelContainer,
    s_questionStarSx,
    s_questionTitleContainer,
    s_questionTitleSx,
    s_textAreaWrapperSx,
    textAreaSx,
} from './ClubApplyDetailQuestionPage.style';

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
                    touched[question.label] &&
                    !getAnswer(answers, question.label)?.trim();
                return (
                    <div
                        key={question.label}
                        css={clubApplyDetailQuestionContainer}
                        tabIndex={-1}
                        ref={(element) => {
                            if (questionRefs.current) {
                                questionRefs.current[question.label] = element;
                            }
                        }}
                    >
                        <div css={s_labelContainer}>
                            <div css={s_questionTitleContainer}>
                                <Text type="bodyRegular" noWrap sx={s_questionTitleSx}>
                                    {question.label}
                                </Text>
                                {question.isRequired && (
                                    <Text type="bodyRegular" color="warning" sx={s_questionStarSx}>
                                        *
                                    </Text>
                                )}
                            </div>
                            <Tooltip
                                content={question.description || ''}
                                direction={isTablet ? 'bottomLeft' : 'bottom'}
                            >
                                <InfoIcon css={s_infoIcon} />
                            </Tooltip>
                        </div>
                        <TextArea
                            size="lg"
                            value={getAnswer(answers, question.label)}
                            onChange={(event: React.ChangeEvent<HTMLTextAreaElement>) =>
                                onAnswerChange(question.id, question.label, event.target.value)
                            }
                            wrapperSx={s_textAreaWrapperSx}
                            textAreaSx={textAreaSx}
                            error={hasError}
                            onFocus={() => onFocus(question.label)}
                            onBlur={() => onBlur(question.label)}
                            errorText={hasError ? '필수 항목입니다.' : undefined}
                        />
                    </div>
                );
            })}
        </div>
    );
}

export { ClubApplyDetailQuestionPage };
