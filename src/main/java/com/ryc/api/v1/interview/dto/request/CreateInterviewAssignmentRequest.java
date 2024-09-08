package com.ryc.api.v1.interview.dto.request;

import jakarta.validation.constraints.NotEmpty;
import java.util.List;

/**
 * intervieweeId 는 applicant의 id이며, interviewerId는 user의 id이다.
 */
public record CreateInterviewAssignmentRequest(
        @NotEmpty(message = "assignmentDtos shouldn't be empty") List<assignmentDto> assignmentDtos) {

    public record assignmentDto(@NotEmpty(message = "interviewId shouldn't be empty") String interviewId,
                                @NotEmpty(message = "intervieweeIdList shouldn't be empty") List<String> intervieweeIdList,
                                @NotEmpty(message = "interviewerIdList shouldn't be empty") List<String> interviewerIdList) {
    }
}
