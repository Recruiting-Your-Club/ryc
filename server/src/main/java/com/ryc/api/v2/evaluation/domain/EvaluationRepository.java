package com.ryc.api.v2.evaluation.domain;

import java.util.List;

public interface EvaluationRepository {
  Evaluation save(Evaluation evaluation);

  List<Evaluation> findEvaluationsByApplicantIdsAndType(
      List<String> applicantIdList, EvaluationType type);

  List<String> findEvaluatedApplicantIds(
      String evaluatorId, EvaluationType type, List<String> applicantIdList);
}
