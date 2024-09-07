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

import java.time.LocalDateTime;
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
    public CreateInterviewResponse createInterview(CreateInterviewRequest body) {
        //TODO: 회장 권한 확인하기

        Step step = stepRepository.findById(body.stepId())
                .orElseThrow(() -> new NoSuchElementException("Step not found"));

        if (step.getStepType() != StepType.INTERVIEW)
            throw new IllegalStateException("step type is not INTERVIEW");

        List<LocalDateTime> createdAt = new ArrayList<>();
        List<CreateInterviewRequest.InterviewScheduleDto> schedules = body.interviewSchedules();
        for (CreateInterviewRequest.InterviewScheduleDto schedule : schedules) {
            Interview interview = Interview.builder()
                    .step(step)
                    .date(schedule.interviewDate())
                    .timeNumber(schedule.timeNumber())
                    .build();

            interviewRepository.save(interview);
            createdAt.add(interview.getCreatedAt());
        }

        return new CreateInterviewResponse(createdAt);
    }
}
