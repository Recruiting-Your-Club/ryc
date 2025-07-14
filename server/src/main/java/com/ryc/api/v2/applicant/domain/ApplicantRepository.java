package com.ryc.api.v2.applicant.domain;

import java.util.List;

public interface ApplicantRepository {

  String findEmailById(String id);

  List<Applicant> findByAnnouncementId(String announcementId);
}
