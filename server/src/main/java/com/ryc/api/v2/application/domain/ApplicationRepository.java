package com.ryc.api.v2.application.domain;

import java.util.List;

public interface ApplicationRepository {
  Application findByApplicantId(String applicantId);

  List<Application> findAllByApplicantIdIn(List<String> applicantIds);
}
