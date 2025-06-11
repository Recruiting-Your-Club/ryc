package com.ryc.api.v2.club.presentation.dto.request;

import java.util.List;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

import com.ryc.api.v2.club.domain.Category;

import lombok.Builder;

@Builder
public record ClubCreateRequest(
    @NotBlank(message = "club name shouldn't be blank") String name,
    @NotBlank(message = "club description shouldn't be blank") String shortDescription,
    @NotNull(message = "club category shouldn't be null") Category category,
    @NotNull(message = "club tagNames shouldn't be null")
        List<@NotBlank(message = "Each tagName shouldn't be blank") String> tagNames) {

  // 리스트의 경우 DTO의 값을 사용할 때, 내부 요소값의 불변성을 위해 Getter 재정의
  @Override
  public List<String> tagNames() {
    return List.copyOf(tagNames);
  }
}
