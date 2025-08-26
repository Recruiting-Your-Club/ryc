package com.ryc.api.v2.announcement.presentation.dto.request;

import java.util.List;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

import io.swagger.v3.oas.annotations.media.Schema;
import org.hibernate.validator.constraints.UUID;

public record AnnouncementDeletedRequest(
    @NotNull(message = "공고 id 리스트는 null일 수 없습니다.")
        List<@NotBlank @UUID(message = "공고 id는 빈칸일 수 없습니다.") String> announcementIds) {

  @Override
  @Schema(description = "공고 id 리스트")
  public List<String> announcementIds() {
    return List.copyOf(announcementIds);
  }
}
