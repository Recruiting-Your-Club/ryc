package com.ryc.api.v2.applicant.domain;

import java.util.List;
import java.util.Map;

import com.ryc.api.v2.applicant.domain.enums.ApplicantStatus;

public interface ApplicantRepository {

  Applicant save(Applicant applicant);

  Applicant findById(String id);

  List<Applicant> findAllByAnnouncementId(String announcementId);

  List<String> findAllIdByAnnouncementId(String announcementId);

  List<Applicant> findAllByAnnouncementIdAndStatus(String announcementId, ApplicantStatus status);

  List<Applicant> findByEmails(List<String> emails);

  Boolean existsByAnnouncementIdAndEmail(String announcementId, String email);

  Map<String, String> findApplicantImageUrlsByIds(List<String> ids);

  void deleteAllByIdIn(List<String> ids);
}
