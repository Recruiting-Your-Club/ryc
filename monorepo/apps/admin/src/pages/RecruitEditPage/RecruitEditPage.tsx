import { INITIALRECRUITSTEP, TOTALRECRUITSTEPS } from '@constants/step';
import { useQuestion } from '@hooks/useQuestion';
import React from 'react';
import { useParams } from 'react-router-dom';

import { useRouter } from '@ssoc/hooks';
import { useStepper, useToast } from '@ssoc/ui';

function RecruitEditPage() {
    const { activeStep, next, prev, isFirst, isLast } = useStepper(
        TOTALRECRUITSTEPS,
        INITIALRECRUITSTEP,
    );
    const { removeHistoryAndGo } = useRouter();
    const { toast } = useToast();
    const { clubId, announcementId } = useParams();

    const {
        questions,
        addQuestion,
        removeQuestion,
        updateQuestion,
        handleQuestionTypeChange,
        applicationQuestions,
        addApplicationQuestion,
        removeApplicationQuestion,
        updateApplicationQuestion,
        hydrateAll,
    } = useQuestion();
}

export { RecruitEditPage };
