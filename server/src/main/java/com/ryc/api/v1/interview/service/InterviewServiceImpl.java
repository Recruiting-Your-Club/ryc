package com.ryc.api.v1.interview.service;

import java.time.LocalDate;
import java.util.*;
import java.util.stream.Collectors;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.ryc.api.v1.applicant.domain.Applicant;
import com.ryc.api.v1.applicant.repository.ApplicantRepository;
import com.ryc.api.v1.club.domain.Club;
import com.ryc.api.v1.interview.domain.Interview;
import com.ryc.api.v1.interview.domain.Interviewee;
import com.ryc.api.v1.interview.domain.Interviewer;
import com.ryc.api.v1.interview.dto.request.CreateInterviewAssignmentRequest;
import com.ryc.api.v1.interview.dto.request.CreateInterviewRequest;
import com.ryc.api.v1.interview.dto.response.CreateInterviewAssignmentResponse;
import com.ryc.api.v1.interview.dto.response.CreateInterviewResponse;
import com.ryc.api.v1.interview.dto.response.GetAllApplicantByInterviewResponse;
import com.ryc.api.v1.interview.dto.response.GetInterviewScheduleResponse;
import com.ryc.api.v1.interview.repository.InterviewRepository;
import com.ryc.api.v1.interview.repository.IntervieweeRepository;
import com.ryc.api.v1.interview.repository.InterviewerRepository;
import com.ryc.api.v1.recruitment.domain.Step;
import com.ryc.api.v1.recruitment.domain.StepType;
import com.ryc.api.v1.recruitment.repository.StepRepository;
import com.ryc.api.v1.role.domain.ClubRole;
import com.ryc.api.v1.role.domain.UserClubRole;
import com.ryc.api.v1.role.repository.UserClubRoleRepository;
import com.ryc.api.v1.security.dto.CustomUserDetail;
import com.ryc.api.v1.user.domain.User;
import com.ryc.api.v1.user.repository.UserRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class InterviewServiceImpl implements InterviewService {
  private final InterviewRepository interviewRepository;
  private final StepRepository stepRepository;
  private final ApplicantRepository applicantRepository;
  private final UserRepository userRepository;
  private final IntervieweeRepository intervieweeRepository;
  private final InterviewerRepository interviewerRepository;
  private final UserClubRoleRepository userClubRoleRepository;

  @Override
  @Transactional
  public List<CreateInterviewResponse> createInterview(CreateInterviewRequest body) {
    Step step =
        stepRepository
            .findById(body.stepId())
            .orElseThrow(() -> new NoSuchElementException("Step not found"));

    if (step.getStepType() != StepType.INTERVIEW)
      throw new IllegalStateException("step type is not INTERVIEW");

    List<CreateInterviewRequest.InterviewScheduleDto> schedules = body.interviewSchedules();
    List<CreateInterviewResponse> responses = new ArrayList<>();
    for (CreateInterviewRequest.InterviewScheduleDto schedule : schedules) {
      for (int i = 1; i <= schedule.timeCount(); i++) {
        Interview interview =
            Interview.builder().step(step).date(schedule.interviewDate()).timeNumber(i).build();
        interviewRepository.save(interview);

        CreateInterviewResponse createInterviewResponse =
            CreateInterviewResponse.builder()
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
  public CreateInterviewAssignmentResponse createInterviewAssignment(
      CreateInterviewAssignmentRequest body) {
    List<CreateInterviewAssignmentRequest.assignmentDto> assignmentDtos = body.assignmentDtos();

    List<Interviewee> interviewees = new ArrayList<>();
    List<Interviewer> interviewers = new ArrayList<>();
    for (CreateInterviewAssignmentRequest.assignmentDto assignment : assignmentDtos) {
      Interview interview =
          interviewRepository
              .findById(assignment.interviewId())
              .orElseThrow(() -> new NoSuchElementException("interview not found"));

      for (String intervieweeId : assignment.intervieweeIdList()) {
        Applicant applicant =
            applicantRepository
                .findById(intervieweeId)
                .orElseThrow(() -> new NoSuchElementException("interviewee not found"));

        Interviewee interviewee =
            Interviewee.builder().interview(interview).applicant(applicant).build();

        interviewees.add(interviewee);
      }

      // TODO: 해당 interviewer(user)가 해당 동아리 소속인지 검사하는 로직 추가 필요
      for (String interviewerId : assignment.interviewerIdList()) {
        User user =
            userRepository
                .findById(interviewerId)
                .orElseThrow(() -> new NoSuchElementException("interviewer not found"));

        Interviewer interviewer = Interviewer.builder().interview(interview).user(user).build();

        interviewers.add(interviewer);
      }
    }

    intervieweeRepository.saveAll(interviewees);
    interviewerRepository.saveAll(interviewers);

    return new CreateInterviewAssignmentResponse();
  }

  @Override
  @Transactional
  public List<GetInterviewScheduleResponse> findInterviewSchedules(String stepId) {
    // 1. 회장 동아리원 검증
    // TODO:해당 코드 겹친다. 추후에 분리하기
    Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
    CustomUserDetail userDetails = (CustomUserDetail) authentication.getPrincipal();

    User user =
        userRepository
            .findById(userDetails.getId())
            .orElseThrow(() -> new NoSuchElementException("User not found"));
    Step step =
        stepRepository
            .findById(stepId)
            .orElseThrow(() -> new NoSuchElementException("Step not found"));

    Club club = step.getRecruitment().getClub();

    UserClubRole userClubRole =
        userClubRoleRepository
            .findByClubAndUser(club, user)
            .orElseThrow(() -> new NoSuchElementException("User is not in Club"));

    // 2. 면접 스케줄 조회
    List<Interview> interviews = findAllInterviewList(step);
    if (userClubRole.getClubRole() == ClubRole.MEMBER) {
      interviews = findAssignedInterviewList(interviews, user);
    }

    // 3. 응답값 생성하기
    Map<LocalDate, List<Interview>> interviewsByDate = groupByinterviewDate(interviews);

    List<GetInterviewScheduleResponse> responses = new ArrayList<>();

    for (Map.Entry<LocalDate, List<Interview>> entry : interviewsByDate.entrySet()) {
      LocalDate interviewDate = entry.getKey();
      List<Interview> interviewsOnDate = entry.getValue();

      List<GetInterviewScheduleResponse.InterviewTimeDto> interviewTimes = new ArrayList<>();
      for (Interview interview : interviewsOnDate) {
        GetInterviewScheduleResponse.InterviewTimeDto interviewTimeDto =
            GetInterviewScheduleResponse.InterviewTimeDto.builder()
                .interviewId(interview.getId())
                .interviewTimeNumber(interview.getTimeNumber())
                .build();

        interviewTimes.add(interviewTimeDto);
      }

      GetInterviewScheduleResponse getInterviewScheduleResponse =
          GetInterviewScheduleResponse.builder()
              .interviewDate(interviewDate)
              .interviewTimes(interviewTimes)
              .build();

      responses.add(getInterviewScheduleResponse);
    }

    return responses;
  }

  @Override
  @Transactional
  public GetAllApplicantByInterviewResponse getAllApplicantsByInterview(
      String interviewId, String stepId) {
    if (stepId.equals("none") && interviewId.equals("none"))
      throw new IllegalArgumentException(
          "No valid filter option was provided. Please check your input.");

    // step으로 조회(interviewId 없이 stepId만 있을때)
    List<Interview> interviews = new ArrayList<>();
    if (interviewId.equals("none")) {
      interviews = interviewRepository.findByStepId(stepId);
      if (interviews.isEmpty()) throw new NoSuchElementException("No Interview found");
    } else {
      Interview interview =
          interviewRepository
              .findById(interviewId)
              .orElseThrow(() -> new NoSuchElementException("interview not found"));
      interviews.add(interview);
    }

    List<Interviewee> interviewees = intervieweeRepository.findByInterviewIn(interviews);
    if (interviewees.isEmpty()) throw new NoSuchElementException("interviewee not found");

    List<String> intervieweeIdList = interviewees.stream().map(Interviewee::getId).toList();

    return new GetAllApplicantByInterviewResponse(intervieweeIdList);
  }

  private List<Interview> findAssignedInterviewList(List<Interview> interviews, User user) {
    List<Interview> assignedInterviews = new ArrayList<>();
    for (Interview interview : interviews) {
      interviewerRepository
          .findByInterviewAndUser(interview, user)
          .ifPresent(interviewer -> assignedInterviews.add(interview));
    }
    return assignedInterviews;
  }

  private List<Interview> findAllInterviewList(Step step) {
    List<Interview> interviews = interviewRepository.findByStep(step);
    if (interviews.isEmpty()) throw new NoSuchElementException("interviews not found");

    return interviews;
  }

  private Map<LocalDate, List<Interview>> groupByinterviewDate(List<Interview> interviews) {
    return interviews.stream().collect(Collectors.groupingBy(Interview::getDate));
  }
}
