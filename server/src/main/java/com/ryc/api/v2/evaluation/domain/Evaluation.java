package com.ryc.api.v2.evaluation.domain;

import java.math.BigDecimal;
import java.time.LocalDateTime;

import com.ryc.api.v2.common.constant.DomainDefaultValues;
import com.ryc.api.v2.evaluation.presentation.dto.request.EvaluationRequest;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class Evaluation {
  private final String id;
  private final String evaluatorId;
  private final String evaluateeId;
  private final BigDecimal score;
  private final String comment;

  private final Boolean deleted;
  private final LocalDateTime createdAt;
  private final LocalDateTime updatedAt;

  /**
   * 평가(Evaluation) 도메인을 생성하기 위한 정적 팩토리 메서드. 최초 생성 시에만 사용되며, 이후 상태 변경이나 업데이트 용도로는 사용하지 않는다.
   *
   * @param request 평가 생성에 필요한 데이터가 담긴 {@link EvaluationRequest}
   * @param adminId 평가를 수행하는 관리자(admin)의 식별자
   * @return {@link Evaluation} 도메인 객체
   */
  public static Evaluation initialize(EvaluationRequest request, String adminId) {
    Evaluation evaluation =
        Evaluation.builder()
            .id(DomainDefaultValues.DEFAULT_INITIAL_ID)
            .evaluatorId(adminId)
            .evaluateeId(request.applicantId())
            .score(request.score())
            .comment(request.comment())
            .build();

    evaluation.validate();
    return evaluation;
  }

  /**
   * 유효 객체 검사
   *
   * @throws IllegalArgumentException 각 객체가 유효하지 않을 경우
   */
  public void validate() {
    // TODO: score 검증
  }
}
