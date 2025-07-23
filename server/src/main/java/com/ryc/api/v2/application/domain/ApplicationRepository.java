package com.ryc.api.v2.application.domain;

import java.util.List;

public interface ApplicationRepository {
  Application save(Application application, String applicantId);

  Application findByApplicantId(String applicantId);

  List<Application> findAllByApplicantIdIn(List<String> applicantIds);
}
