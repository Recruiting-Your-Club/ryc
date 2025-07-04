package com.ryc.api.v2.announcement.domain;

public interface ApplicationFormRepository {
  public ApplicationForm findByAnnouncementId(String id);
}
