package com.ryc.api.v2.announcement.infra.vo;

import java.util.List;

import jakarta.persistence.*;

import com.ryc.api.v2.announcement.domain.enums.QuestionType;
import com.ryc.api.v2.announcement.infra.converter.StringListConverter;

import lombok.*;

@Embeddable
@Getter
@Builder
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor(access = AccessLevel.PRIVATE)
public class ApplicationQuestionVO {
  @Enumerated(value = EnumType.STRING)
  private QuestionType questionType;

  private String label;
  private boolean isRequired;

  @Convert(converter = StringListConverter.class)
  @Column(columnDefinition = "json")
  private List<String> options;
}
