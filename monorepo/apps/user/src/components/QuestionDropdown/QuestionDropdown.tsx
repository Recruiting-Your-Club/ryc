import { getAnswer } from '@pages/ClubApplyPage/utils';
import React from 'react';

import ArrowDown from '@ssoc/assets/images/downArrow.svg';
import { Text } from '@ssoc/ui';
import { Dropdown } from '@ssoc/ui/src/components';

import {
    questionStatusContainer,
    questionStatusTextSx,
    s_arrowDown,
    s_dropdownContent,
    s_dropdownItem,
    s_dropdownItemSx,
    s_dropdownLabelBottomSx,
    s_dropdownLabelTopSx,
    s_dropdownTriggerSx,
} from './QuestionDropdown.style';
import type { QuestionDropdownProps } from './types';

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
                <Dropdown.Trigger asChild sx={s_dropdownTriggerSx}>
                    <ArrowDown css={s_arrowDown} />
                </Dropdown.Trigger>
                <Dropdown.Content offsetX={baseOffsetX} offsetY={offsetY} sx={s_dropdownContent}>
                    <Dropdown.Label sx={s_dropdownLabelTopSx}>사전질문</Dropdown.Label>
                    <Dropdown.Group>
                        {personalQuestions.map((question) => (
                            <Dropdown.Item
                                key={question.questionTitle}
                                onItemSelect={() =>
                                    onQuestionFocus(question.questionTitle, '사전질문')
                                }
                                sx={s_dropdownItemSx}
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
                        <Dropdown.Label sx={s_dropdownLabelBottomSx}>자기소개서</Dropdown.Label>
                        {detailQuestions.map((question, index) => (
                            <Dropdown.Item
                                key={question.questionTitle}
                                onItemSelect={() =>
                                    onQuestionFocus(question.questionTitle, '자기소개서')
                                }
                                sx={s_dropdownItemSx}
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
