import { getAnswer } from '@pages/ClubApplyPage/utils';
import React from 'react';

import ArrowDown from '@ssoc/assets/images/downArrow.svg';
import { useMediaQuery } from '@ssoc/hooks';
import { Dropdown, Text } from '@ssoc/ui';

import {
    questionStatusContainer,
    questionStatusTextSx,
    s_arrowDown,
    s_dropdownContent,
    s_dropdownItem,
    s_dropdownItemSuccessTextSx,
    s_dropdownItemSx,
    s_dropdownItemTextSx,
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
    sx,
}: QuestionDropdownProps) {
    //props destruction
    //lib hooks
    const isMobile = useMediaQuery('mobile');
    //initial values
    //state, ref, querystring hooks
    //form hooks
    //query hooks
    //calculated values
    const questionStatusText = isMobile
        ? `(${completedQuestionsCount} / ${allQuestionsCount})`
        : `작성된 항목 (${completedQuestionsCount} / ${allQuestionsCount})`;
    //effects
    return (
        <div css={[questionStatusContainer, sx]}>
            <Text
                type="subCaptionRegular"
                sx={questionStatusTextSx(
                    requiredQuestionsCompleted || completedQuestionsCount === allQuestionsCount,
                )}
            >
                {questionStatusText}
            </Text>
            <Dropdown>
                <Dropdown.Trigger asChild sx={s_dropdownTriggerSx}>
                    <ArrowDown css={s_arrowDown} />
                </Dropdown.Trigger>
                <Dropdown.Content offsetX={2} offsetY={1} placement="bottom" sx={s_dropdownContent}>
                    <Dropdown.Label sx={s_dropdownLabelTopSx}>사전질문</Dropdown.Label>
                    <Dropdown.Group>
                        {personalQuestions.map((question) => (
                            <Dropdown.Item
                                key={question.id}
                                onItemSelect={() => onQuestionFocus(question.label, '사전질문')}
                                sx={s_dropdownItemSx}
                            >
                                <div css={s_dropdownItem}>
                                    <Text
                                        type="captionRegular"
                                        textAlign="left"
                                        sx={s_dropdownItemTextSx}
                                    >
                                        {question.label}
                                    </Text>
                                    {getAnswer(answers, question.label)?.trim() && (
                                        <Text
                                            type="subCaptionRegular"
                                            color="primary"
                                            textAlign="right"
                                            sx={s_dropdownItemSuccessTextSx}
                                        >
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
                                key={question.id}
                                onItemSelect={() => onQuestionFocus(question.label, '자기소개서')}
                                sx={s_dropdownItemSx}
                            >
                                <div css={s_dropdownItem}>
                                    <Text
                                        type="captionRegular"
                                        textAlign="left"
                                        sx={s_dropdownItemTextSx}
                                    >
                                        질문{index + 1}
                                    </Text>
                                    {getAnswer(answers, question.label)?.trim() && (
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
