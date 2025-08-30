import { FieldLabel } from '@components/FieldLabel';
import { QuestionForm } from '@components/QuestionForm';
import React from 'react';

import Trash from '@ssoc/assets/images/trash.svg';
import { Button } from '@ssoc/ui';
import { useToast } from '@ssoc/ui';

import { s_buttonContainer, s_questionContainer } from './PersonalStatementStep.style';
import type { PersonalStatementStepProps } from './types';

function PersonalStatementStep({
    applicationQuestions,
    removeApplicationQuestion,
    updateApplicationQuestion,
    addApplicationQuestion,
}: PersonalStatementStepProps) {
    // prop destruction
    // lib hooks
    const { toast } = useToast();

    const handleAddApplicationQuestion = () => {
        if (applicationQuestions.length >= 30) {
            toast.error('자기소개서 질문은 최대 30개까지 생성할 수 있습니다.', {
                toastTheme: 'black',
                position: 'topCenter',
            });
            return;
        }
        addApplicationQuestion();
    };
    return (
        <>
            <FieldLabel
                label="자기소개서"
                description="지원자에게 질문하고 싶은 문항을 작성해주세요.(최대 20개의 질문까지 작성 가능합니다)"
            />
            <div css={s_buttonContainer}>
                {applicationQuestions.map((q) => (
                    <div key={q.id} css={s_questionContainer}>
                        <QuestionForm
                            question={q}
                            updateQuestion={updateApplicationQuestion}
                            onRemoveQuestion={() => removeApplicationQuestion(q.id)}
                        />
                    </div>
                ))}
                <Button size="full" variant="primary" onClick={handleAddApplicationQuestion}>
                    질문 추가하기
                </Button>
            </div>
        </>
    );
}

export { PersonalStatementStep };
