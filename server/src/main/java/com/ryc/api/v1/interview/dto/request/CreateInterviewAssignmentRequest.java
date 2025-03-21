package com.ryc.api.v1.interview.dto.request;

import java.util.List;

import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;

import com.ryc.api.v1.common.dto.ClubRoleSecuredDto;

/** intervieweeId 는 applicant의 id이며, interviewerId는 user의 id이다. */
public record CreateInterviewAssignmentRequest(
    @NotNull(message = "clubRoleSecuredDto shouldn't be null")
        ClubRoleSecuredDto clubRoleSecuredDto,
    @NotEmpty(message = "assignmentDtos shouldn't be empty") List<assignmentDto> assignmentDtos) {

  public record assignmentDto(
      @NotEmpty(message = "interviewId shouldn't be empty") String interviewId,
      @NotEmpty(message = "intervieweeIdList shouldn't be empty") List<String> intervieweeIdList,
      @NotEmpty(message = "interviewerIdList shouldn't be empty") List<String> interviewerIdList) {}
}
