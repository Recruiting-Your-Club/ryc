package com.ryc.api.v1.interview.service;

import com.ryc.api.v1.applicant.domain.Applicant;
import com.ryc.api.v1.applicant.repository.ApplicantRepository;
import com.ryc.api.v1.interview.domain.Interview;
import com.ryc.api.v1.interview.domain.Interviewee;
import com.ryc.api.v1.interview.domain.Interviewer;
import com.ryc.api.v1.interview.dto.request.CreateInterviewAssignmentRequest;
import com.ryc.api.v1.interview.dto.request.CreateInterviewRequest;
import com.ryc.api.v1.interview.dto.response.CreateInterviewAssignmentResponse;
import com.ryc.api.v1.interview.dto.response.CreateInterviewResponse;
import com.ryc.api.v1.interview.repository.InterviewRepository;
import com.ryc.api.v1.interview.repository.IntervieweeRepository;
import com.ryc.api.v1.interview.repository.InterviewerRepository;
import com.ryc.api.v1.recruitment.domain.Step;
import com.ryc.api.v1.recruitment.domain.StepType;
import com.ryc.api.v1.recruitment.repository.StepRepository;
import com.ryc.api.v1.user.domain.User;
import com.ryc.api.v1.user.repository.UserRepository;
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
    private final ApplicantRepository applicantRepository;
    private final UserRepository userRepository;
    private final IntervieweeRepository intervieweeRepository;
    private final InterviewerRepository interviewerRepository;

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

    @Override
    @Transactional
    public CreateInterviewAssignmentResponse createInterviewAssignment(CreateInterviewAssignmentRequest body) {
        //TODO: 회장권한 확인
        List<CreateInterviewAssignmentRequest.assignmentDto> assignmentDtos
                = body.assignmentDtos();

        List<Interviewee> interviewees = new ArrayList<>();
        List<Interviewer> interviewers = new ArrayList<>();
        for (CreateInterviewAssignmentRequest.assignmentDto assignment : assignmentDtos) {
            Interview interview = interviewRepository.findById(assignment.interviewId())
                    .orElseThrow(() -> new NoSuchElementException("interview not found"));

            for (String intervieweeId : assignment.intervieweeIdList()) {
                Applicant applicant = applicantRepository.findById(intervieweeId)
                        .orElseThrow(() -> new NoSuchElementException("interviewee not found"));

                Interviewee interviewee = Interviewee.builder()
                        .interview(interview)
                        .applicant(applicant)
                        .build();

                interviewees.add(interviewee);
            }

            for (String interviewerId : assignment.interviewerIdList()) {
                User user = userRepository.findById(interviewerId)
                        .orElseThrow(() -> new NoSuchElementException("interviewer not found"));

                Interviewer interviewer = Interviewer.builder()
                        .interview(interview)
                        .user(user)
                        .build();

                interviewers.add(interviewer);
            }
        }

        intervieweeRepository.saveAll(interviewees);
        interviewerRepository.saveAll(interviewers);

        return new CreateInterviewAssignmentResponse();
    }
}
