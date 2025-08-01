import React, { useState } from 'react';
import {
    s_applicantSchedulePageContainer,
    s_contentComponentWrapper,
    s_buttonGroup,
    s_timeTable,
} from './ApplicantSchedulePage.style';
import { ApplicantList, InterviewTimeTable } from '@components';
import { useSuspenseQuery } from '@tanstack/react-query';
import { interviewQueries } from '@api/queryFactory';
import { convertDate } from '@utils/convertDate';
import { applicantQueries } from '@api/queryFactory/applicantQueries';

function ApplicantSchedulePage() {
    // prop destruction
    // lib hooks
    // initial values
    const { data: interviewSchedulelist = [] } = useSuspenseQuery(
        interviewQueries.allInterviewSchedules(),
    );
    // state, ref, querystring hooks
    const [selectedApplicantId, setSelectedApplicantId] = useState<number>(1);
    const [selectedInterviewLabel, setSelectedInterviewLabel] = useState<string>(() => {
        if (interviewSchedulelist[0]) {
            const date = convertDate(interviewSchedulelist[0].date);
            const name = interviewSchedulelist[0].interviewSets[0].name;
            return `${date} ${name}`;
        }
        return '면접 일정 없음';
    });
    // form hooks
    // query hooks
    const { data: applicantList = [] } = useSuspenseQuery(applicantQueries.allApplicants());
    // calculated values
    // handlers
    // effects
    return (
        <div css={s_applicantSchedulePageContainer}>
            <div css={s_contentComponentWrapper}>
                <InterviewTimeTable
                    interviewSchedules={interviewSchedulelist}
                    selectedInterviewLabel={selectedInterviewLabel}
                    onSelect={(label) => setSelectedInterviewLabel(label)}
                    sx={s_timeTable}
                    listSx={s_buttonGroup}
                />
            </div>
            <div css={s_contentComponentWrapper}>
                <ApplicantList
                    applicantList={applicantList}
                    selectedApplicantId={selectedApplicantId}
                    onSelectApplicantId={setSelectedApplicantId}
                />
            </div>
            <div css={s_contentComponentWrapper}>
                <ApplicantList
                    applicantList={applicantList}
                    selectedApplicantId={selectedApplicantId}
                    onSelectApplicantId={setSelectedApplicantId}
                />
            </div>
            <div css={s_contentComponentWrapper}>
                <ApplicantList
                    applicantList={applicantList}
                    selectedApplicantId={selectedApplicantId}
                    onSelectApplicantId={setSelectedApplicantId}
                />
            </div>
        </div>
    );
}

export { ApplicantSchedulePage };
