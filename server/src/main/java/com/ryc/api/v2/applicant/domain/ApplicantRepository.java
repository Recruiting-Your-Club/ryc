package com.ryc.api.v2.applicant.domain;

public interface ApplicantRepository {

  String findEmailById(String id);

  Applicant findById(String id);
}
