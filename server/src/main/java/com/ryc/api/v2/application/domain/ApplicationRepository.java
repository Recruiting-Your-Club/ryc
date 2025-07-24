package com.ryc.api.v2.application.domain;

import java.util.List;

public interface ApplicationRepository {
    Application save(Application application);
    Application findByApplicantId(String applicantId);
}
