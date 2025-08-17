package com.ryc.api.v2.applicant.service.event;

import java.util.List;

public record ApplicantDeletedEvent(List<String> applicantIds) {}
