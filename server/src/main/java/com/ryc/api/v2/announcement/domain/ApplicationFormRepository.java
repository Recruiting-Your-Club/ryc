package com.ryc.api.v2.announcement.domain;

public interface ApplicationFormRepository {
  ApplicationForm findByAnnouncementId(String id);
}
