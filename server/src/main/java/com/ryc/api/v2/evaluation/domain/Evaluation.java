package com.ryc.api.v2.evaluation.domain;

import java.math.BigDecimal;
import java.time.LocalDateTime;

import com.ryc.api.v2.common.constant.DomainDefaultValues;
import com.ryc.api.v2.evaluation.presentation.dto.request.EvaluationRequest;
import com.ryc.api.v2.evaluation.presentation.dto.request.EvaluationUpdateRequest;
import com.ryc.api.v2.util.DataResolveUtil;

import lombok.Builder;
import lombok.Getter;

@Getter
public class Evaluation {
  private final String id;
  private final String evaluatorId;
  private final String evaluateeId;
  private final BigDecimal score;
  private final String comment;
  private final EvaluationType type;
  private final Boolean deleted;

  private final LocalDateTime createdAt;
  private final LocalDateTime updatedAt;

  @Builder
  private Evaluation(
      String id,
      String evaluatorId,
      String evaluateeId,
      BigDecimal score,
      String comment,
      EvaluationType type,
      Boolean deleted,
      LocalDateTime createdAt,
      LocalDateTime updatedAt) {

    // 1. 정제
    String sanitizedComment = DataResolveUtil.sanitizeString(comment);

    // 2. 선택 멤버 변수 기본값 처리
    Boolean resolvedDeleted = deleted != null ? deleted : Boolean.FALSE;

    // 3. 검증
    EvaluationValidator.validate(
        id,
        evaluatorId,
        evaluateeId,
        score,
        sanitizedComment,
        type,
        resolvedDeleted,
        createdAt,
        updatedAt);

    // 4. 할당
    this.id = id;
    this.evaluatorId = evaluatorId;
    this.evaluateeId = evaluateeId;
    this.score = score;
    this.comment = sanitizedComment;
    this.type = type;
    this.deleted = resolvedDeleted;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }

  /**
   * 평가(Evaluation) 도메인을 생성하기 위한 정적 팩토리 메서드. 최초 생성 시에만 사용되며, 이후 상태 변경이나 업데이트 용도로는 사용하지 않는다.
   *
   * @param request 평가 생성에 필요한 데이터가 담긴 {@link EvaluationRequest}
   * @param adminId 평가를 수행하는 관리자(admin)의 식별자
   * @return {@link Evaluation} 도메인 객체
   */
  public static Evaluation initialize(
      EvaluationRequest request, EvaluationType type, String adminId) {
    Evaluation evaluation =
        Evaluation.builder()
            .id(DomainDefaultValues.DEFAULT_INITIAL_ID)
            .evaluatorId(adminId)
            .evaluateeId(request.applicantId())
            .score(request.score())
            .comment(request.comment())
            .type(type)
            .deleted(false)
            .build();

    return evaluation;
  }


  public Evaluation update(EvaluationUpdateRequest body) {
    Evaluation evaluation =
        Evaluation.builder()
            .id(id)
            .evaluatorId(evaluatorId)
            .evaluateeId(evaluateeId)
            .score(body.score())
            .comment(body.comment())
            .type(type)
            .deleted(deleted)
            .createdAt(createdAt)
            .updatedAt(createdAt)
            .build();

    return evaluation;
  }
}
