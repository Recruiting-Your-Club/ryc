import React from 'react';
import { Text, Dropdown } from '@components/_common';
import ArrowDown from '@assets/images/downArrow.svg';
import {
    questionStatusContainer,
    questionStatusTextSx,
    s_dropdownItem,
    s_arrowDown,
    s_dropdownContent,
} from './QuestionDropdown.style';
import type { QuestionDropdownProps } from './types';
import { getAnswer } from '@pages/ClubApplyPage/utils';

function QuestionDropdown({
    completedQuestionsCount,
    personalQuestions,
    detailQuestions,
    requiredQuestionsCompleted,
    allQuestionsCount,
    answers,
    onQuestionFocus,
}: QuestionDropdownProps) {
    //props destruction
    //lib hooks
    //initial values
    const baseOffsetX = 8;
    const baseOffsetY = 7;
    //state, ref, querystring hooks
    //form hooks
    //query hooks
    //calculated values
    const offsetY = baseOffsetY + (allQuestionsCount - 1) * 1.8;
    //effects
    return (
        <div css={questionStatusContainer}>
            <Text
                type="subCaptionRegular"
                sx={questionStatusTextSx(
                    requiredQuestionsCompleted || completedQuestionsCount === allQuestionsCount,
                )}
            >
                작성된 항목 ({completedQuestionsCount} / {allQuestionsCount})
            </Text>
            <Dropdown>
                <Dropdown.Trigger asChild sx={{ border: 'none', padding: 0 }}>
                    <ArrowDown css={s_arrowDown} />
                </Dropdown.Trigger>
                <Dropdown.Content offsetX={baseOffsetX} offsetY={offsetY} sx={s_dropdownContent}>
                    <Dropdown.Label sx={{ marginTop: '0.5rem' }}>사전질문</Dropdown.Label>
                    <Dropdown.Group>
                        {personalQuestions.map((question) => (
                            <Dropdown.Item
                                key={question.questionTitle}
                                onItemSelect={() =>
                                    onQuestionFocus(question.questionTitle, '사전질문')
                                }
                                sx={{ marginBottom: '0.5rem' }}
                            >
                                <div css={s_dropdownItem}>
                                    {question.questionTitle}
                                    {getAnswer(answers, question.questionTitle)?.trim() && (
                                        <Text type="subCaptionRegular" color="primary">
                                            [완료]
                                        </Text>
                                    )}
                                </div>
                            </Dropdown.Item>
                        ))}
                    </Dropdown.Group>
                    <Dropdown.Seperator />
                    <Dropdown.Group>
                        <Dropdown.Label sx={{ marginBottom: '0.5rem' }}>자기소개서</Dropdown.Label>
                        {detailQuestions.map((question, index) => (
                            <Dropdown.Item
                                key={question.questionTitle}
                                onItemSelect={() =>
                                    onQuestionFocus(question.questionTitle, '자기소개서')
                                }
                                sx={{ marginBottom: '0.5rem' }}
                            >
                                <div css={s_dropdownItem}>
                                    질문{index + 1}
                                    {getAnswer(answers, question.questionTitle)?.trim() && (
                                        <Text type="subCaptionRegular" color="primary">
                                            [완료]
                                        </Text>
                                    )}
                                </div>
                            </Dropdown.Item>
                        ))}
                    </Dropdown.Group>
                </Dropdown.Content>
            </Dropdown>
        </div>
    );
}

export { QuestionDropdown };
