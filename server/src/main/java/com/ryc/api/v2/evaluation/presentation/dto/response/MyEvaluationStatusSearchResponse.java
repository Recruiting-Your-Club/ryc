package com.ryc.api.v2.evaluation.presentation.dto.response;

import java.util.List;

import io.swagger.v3.oas.annotations.media.Schema;

@Schema(
    description =
        """
            로그인한 평가자가, 해당 공고에서 평가한 지원자id의 리스트를 반환하는 응답 DTO입니다. 
            면접/지원서 평가 상태 조회 API 모두 해당 응답 DTO를 반환합니다.
            - List<String> : 지원자 ID와 평가여부를 담은 객체 리스트
        """)
public record MyEvaluationStatusSearchResponse(
    @Schema(description = "로그인한 평가자가 평가한, 지원자 ID 리스트") List<String> evaluatedApplicantIds) {}
