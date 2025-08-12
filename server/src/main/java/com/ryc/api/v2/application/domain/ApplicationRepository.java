package com.ryc.api.v2.application.domain;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;

public interface ApplicationRepository {
  Application save(Application application, String applicantId);

  Application findByApplicantId(String applicantId);

  Map<String, LocalDateTime> findCreatedAtByApplicantIds(List<String> applicantIds);
}
