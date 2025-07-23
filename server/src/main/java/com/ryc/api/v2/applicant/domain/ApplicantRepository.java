package com.ryc.api.v2.applicant.domain;

import java.util.List;

import com.ryc.api.v2.applicant.domain.enums.ApplicantStatus;

public interface ApplicantRepository {
  Applicant save(Applicant applicant);

  Applicant findById(String id);

  List<Applicant> findAllByAnnouncementId(String announcementId);

  List<Applicant> findAllByAnnouncementIdAndStatus(String announcementId, ApplicantStatus status);
}
