package com.ryc.api.v2.evaluation.presentation.dto.response;

import java.math.BigDecimal;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Builder;

@Schema(
    description =
        """
                    평가 수정 API의 응답 값
                    수정 완료 후, 완료된 항목을 UI에 그리기 위해 수정완료된 데이터 응답 값으로 설정
                """)
@Builder
public record EvaluationUpdateResponse(
    @Schema(description = "평가 ID", example = "evaluation-123")
        @NotBlank(message = "evaluationId shouldn't be blank")
        String evaluationId,
    @Schema(description = "수정 완료된 점수", example = "5") @NotNull(message = "score shouldn't be null")
        BigDecimal score,
    @Schema(description = "수정 완료된 코멘트", example = "훌륭하십니다")
        @NotBlank(message = "comment shouldn't be blank")
        String comment) {}
