import React from 'react';
import { useQuestion } from '@hooks/useQuestion';
import { FieldLabel } from '@components/FieldLabel';
import { Button } from '@components';
import { s_buttonContainer } from './PersonalStatementStep.style';

function PersonalStatementStep() {
    const { questions, addQuesttion, removeQuestion } = useQuestion();
    return (
        <div>
            <FieldLabel
                label="자기소개서"
                description="지원자에게 질문하고 싶은 문항을 작성해주세요.(최대 20개의 질문까지 작성 가능합니다)"
                required
            />
            <div css={s_buttonContainer}>
                <Button size="full" variant="outlined">
                    자기소개서 문항 작성하기
                </Button>
                <Button size="full" variant="outlined">
                    자기소개서 없음
                </Button>
            </div>
        </div>
    );
}

export { PersonalStatementStep };
