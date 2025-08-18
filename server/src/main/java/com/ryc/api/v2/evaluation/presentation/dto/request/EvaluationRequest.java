package com.ryc.api.v2.evaluation.presentation.dto.request;

import java.math.BigDecimal;

public interface EvaluationRequest {
  String applicantId();

  BigDecimal score();

  String comment();
}
