package com.ryc.api.v2.announcement.presentation.dto.request;

import java.util.List;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

import com.ryc.api.v2.announcement.domain.enums.QuestionType;

import io.swagger.v3.oas.annotations.media.Schema;

/**
 * @param questionType 질문타입
 * @param label 질문
 * @param isRequired 필수사항
 * @param options (optional)선지
 * @brief 지원서 질문 Request Dto
 */
@Schema(
    description =
        """
        지원서 질문 \n
        - 주관식인경우 options 2개 이상 입력 받음
        - 나머지 options null or 명시 x
        """)
public record ApplicationQuestionRequest(
    @NotNull(message = "questionType shouldn't be null")
        @Schema(description = "질문 타입", example = "SINGLE_CHOICE")
        QuestionType questionType,
    @NotBlank(message = "label shouldn't be blank")
        @Schema(description = "질문", example = "동아리 접근 경로를 선택해주세요.")
        String label,
    @NotNull(message = "isRequired shouldn't be null")
        @Schema(description = "응답 필수여부", example = "true")
        boolean isRequired,
    List<@NotBlank(message = "option shouldn't be blank") String> options) {

  // options를 null값을 받으면 빈 리스트로 반환
  public ApplicationQuestionRequest {
    options = options == null ? List.of() : options;
  }

  @Schema(description = "선지", example = "[\"지인\",\"웹 검색\"]", minLength = 2)
  @Override
  public List<String> options() {
    return List.copyOf(options);
  }
}
