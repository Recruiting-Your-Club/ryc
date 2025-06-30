import React from 'react';
import { Text } from '@components/_common/Text';
import { Dropdown } from '@components/_common/Dropdown';
import ArrowDown from '@assets/images/downArrow.svg';
import { questionStatusContainer, questionStatusTextSx, arrowIcon } from './QuestionDropdown.style';
import type { QuestionStatusDropdownProps } from './types';

function QuestionDropdown({
    completedQuestionsCount,
    requiredQuestionsCount,
    personalQuestions,
    detailQuestions,
}: QuestionStatusDropdownProps) {
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
                    <ArrowDown css={arrowIcon} />
                </Dropdown.Trigger>
                <Dropdown.Content offsetX={6.5} offsetY={25} sx={{ width: '15rem' }}>
                    <Dropdown.Label>사전질문</Dropdown.Label>
                    <Dropdown.Group>
                        {personalQuestions.map((question) => (
                            <Dropdown.Item
                                key={question.questionTitle}
                                sx={{ marginBottom: '0.5rem' }}
                            >
                                {question.questionTitle}
                            </Dropdown.Item>
                        ))}
                    </Dropdown.Group>
                    <Dropdown.Seperator />
                    <Dropdown.Group>
                        <Dropdown.Label>자기소개서</Dropdown.Label>
                        {detailQuestions.map((question) => (
                            <Dropdown.Item
                                key={question.questionTitle}
                                sx={{ marginBottom: '0.5rem' }}
                            >
                                {question.questionTitle}
                            </Dropdown.Item>
                        ))}
                    </Dropdown.Group>
                </Dropdown.Content>
            </Dropdown>
        </div>
    );
}

export { QuestionDropdown };
