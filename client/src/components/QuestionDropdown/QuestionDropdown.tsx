import React from 'react';
import { Text } from '@components/_common/Text';
import { Dropdown } from '@components/_common/Dropdown';
import ArrowDown from '@assets/images/downArrow.svg';
import {
    questionStatusContainer,
    questionStatusTextSx,
    s_CheckIcon,
    s_DropdownItem,
    s_Icon,
} from './QuestionDropdown.style';
import type { QuestionDropdownProps } from './types';
import Check from '@assets/images/check.svg';
import { getAnswer } from '@pages/ClubApplyPage/utils';

function QuestionDropdown({
    completedQuestionsCount,
    requiredQuestionsCount,
    personalQuestions,
    detailQuestions,
    answers,
}: QuestionDropdownProps) {
    return (
        <div css={questionStatusContainer}>
            <Text
                type="subCaptionRegular"
                sx={questionStatusTextSx(completedQuestionsCount === requiredQuestionsCount)}
            >
                필수 항목 ({completedQuestionsCount} / {requiredQuestionsCount})
            </Text>
            <Dropdown>
                <Dropdown.Trigger asChild sx={{ border: 'none', padding: 0 }}>
                    <ArrowDown css={s_Icon} />
                </Dropdown.Trigger>
                <Dropdown.Content offsetX={8} offsetY={21} sx={{ width: '15rem' }}>
                    <Dropdown.Label>사전질문</Dropdown.Label>
                    <Dropdown.Group>
                        {personalQuestions.map(
                            (question) =>
                                question.isRequired && (
                                    <Dropdown.Item
                                        key={question.questionTitle}
                                        sx={{
                                            marginBottom: '0.5rem',
                                        }}
                                    >
                                        <div css={s_DropdownItem}>
                                            {question.questionTitle}
                                            {getAnswer(answers, question.questionTitle)?.trim() && (
                                                <Check css={s_CheckIcon} />
                                            )}
                                        </div>
                                    </Dropdown.Item>
                                ),
                        )}
                    </Dropdown.Group>
                    <Dropdown.Seperator />
                    <Dropdown.Group>
                        <Dropdown.Label>자기소개서</Dropdown.Label>
                        {detailQuestions.map(
                            (question) =>
                                question.isRequired && (
                                    <Dropdown.Item
                                        key={question.questionTitle}
                                        sx={{
                                            marginBottom: '0.5rem',
                                        }}
                                    >
                                        <div css={s_DropdownItem}>
                                            {question.questionTitle}
                                            {getAnswer(answers, question.questionTitle)?.trim() && (
                                                <Check css={s_CheckIcon} />
                                            )}
                                        </div>
                                    </Dropdown.Item>
                                ),
                        )}
                    </Dropdown.Group>
                </Dropdown.Content>
            </Dropdown>
        </div>
    );
}

export { QuestionDropdown };
