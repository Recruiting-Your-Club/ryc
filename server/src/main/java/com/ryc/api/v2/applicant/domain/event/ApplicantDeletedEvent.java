package com.ryc.api.v2.applicant.domain.event;

import java.util.List;

public record ApplicantDeletedEvent(List<String> applicantIds) {}
