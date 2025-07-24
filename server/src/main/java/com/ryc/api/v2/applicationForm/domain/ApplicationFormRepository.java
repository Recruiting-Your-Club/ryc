package com.ryc.api.v2.applicationForm.domain;

public interface ApplicationFormRepository {
  ApplicationForm findByAnnouncementId(String id);
}
