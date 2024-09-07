package com.ryc.api.v1.interview.service;

import com.ryc.api.v1.interview.domain.Interview;
import com.ryc.api.v1.interview.dto.request.CreateInterviewRequest;
import com.ryc.api.v1.interview.dto.response.CreateInterviewResponse;
import com.ryc.api.v1.interview.repository.InterviewRepository;
import com.ryc.api.v1.recruitment.domain.Step;
import com.ryc.api.v1.recruitment.domain.StepType;
import com.ryc.api.v1.recruitment.repository.StepRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.NoSuchElementException;

@Service
@RequiredArgsConstructor
public class InterviewServiceImpl implements InterviewService {
    private final InterviewRepository interviewRepository;
    private final StepRepository stepRepository;

    @Override
    @Transactional
    public List<CreateInterviewResponse> createInterview(CreateInterviewRequest body) {
        //TODO: 회장 권한 확인하기

        Step step = stepRepository.findById(body.stepId())
                .orElseThrow(() -> new NoSuchElementException("Step not found"));

        if (step.getStepType() != StepType.INTERVIEW)
            throw new IllegalStateException("step type is not INTERVIEW");

        List<CreateInterviewRequest.InterviewScheduleDto> schedules = body.interviewSchedules();
        List<CreateInterviewResponse> responses = new ArrayList<>();
        for (CreateInterviewRequest.InterviewScheduleDto schedule : schedules) {
            for (int i = 1; i <= schedule.timeCount(); i++) {
                Interview interview = Interview.builder()
                        .step(step)
                        .date(schedule.interviewDate())
                        .timeNumber(i)
                        .build();
                interviewRepository.save(interview);

                CreateInterviewResponse createInterviewResponse = CreateInterviewResponse.builder()
                        .interviewId(interview.getId())
                        .interviewDate(interview.getDate())
                        .interviewTime(interview.getTimeNumber())
                        .build();

                responses.add(createInterviewResponse);
            }
        }

        return responses;
    }
}
