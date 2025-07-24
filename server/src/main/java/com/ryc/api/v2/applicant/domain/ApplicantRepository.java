package com.ryc.api.v2.applicant.domain;

import java.util.List;
import java.util.Optional;

public interface ApplicantRepository {
    Applicant save(Applicant applicant);
    Optional<Applicant> findById(String id);
    List<Applicant> findAllByAnnouncementId(String announcementId);
}
