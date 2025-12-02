package com.ryc.api.v2.club.domain;

import com.ryc.api.v2.club.presentation.dto.request.ClubSummaryRequest;
import com.ryc.api.v2.util.DataResolveUtil;

import lombok.Builder;
import lombok.EqualsAndHashCode;
import lombok.Getter;

@Getter
@EqualsAndHashCode
public class ClubSummary {

  private final String id;
  private final String title;
  private final String content;

  @Builder
  private ClubSummary(String id, String title, String content) {

    // 정제
    String sanitizedTitle = DataResolveUtil.sanitizeString(title);
    String sanitizedContent = DataResolveUtil.sanitizeString(content);

    // 검증
    ClubSummaryValidator.validate(id, sanitizedTitle, sanitizedContent);

    // 할당
    this.id = id;
    this.title = sanitizedTitle;
    this.content = sanitizedContent;
  }

  public static ClubSummary initialize(ClubSummaryRequest request) {
    return ClubSummary.builder()
        .id(request.id())
        .title(request.title())
        .content(request.content())
        .build();
  }
}
