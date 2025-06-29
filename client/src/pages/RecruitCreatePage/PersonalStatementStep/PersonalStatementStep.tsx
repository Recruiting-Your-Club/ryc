import React from 'react';
import { useQuestion } from '@hooks/useQuestion';
import { FieldLabel } from '@components/FieldLabel';
import { Button } from '@components';
import {
    s_buttonContainer,
    s_buttonPosition,
    s_questionContainer,
} from './PersonalStatementStep.style';
import { QuestionForm } from '@components/QuestionForm';
import type { PersonalStatementStepProps } from './types';

function PersonalStatementStep({
    applicationQuestions,
    removeApplicationQuestion,
    updateApplicationQuestion,
    addApplicationQuestion,
}: PersonalStatementStepProps) {
    return (
        <>
            <FieldLabel
                label="자기소개서"
                description="지원자에게 질문하고 싶은 문항을 작성해주세요.(최대 20개의 질문까지 작성 가능합니다)"
                required
            />
            <div css={s_buttonContainer}>
                {applicationQuestions.map((q) => (
                    <div key={q.id} css={s_questionContainer}>
                        <Button
                            size="lg"
                            onClick={() => removeApplicationQuestion(q.id)}
                            sx={s_buttonPosition}
                        >
                            x
                        </Button>
                        <QuestionForm question={q} updateQuestion={updateApplicationQuestion} />
                    </div>
                ))}
                <Button size="full" variant="outlined" onClick={addApplicationQuestion}>
                    질문 추가하기
                </Button>
            </div>
        </>
    );
}

export { PersonalStatementStep };
