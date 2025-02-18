package com.ryc.api.v1.application.domain.question;

import jakarta.persistence.*;

import com.ryc.api.v1.application.dto.internal.OptionDto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Builder
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class MultipleChoiceOption {
  @Id
  @GeneratedValue(strategy = GenerationType.UUID)
  @Column(name = "option_id")
  private String id;

  @ManyToOne(fetch = FetchType.LAZY)
  @JoinColumn(name = "question_id")
  private Question question;

  private Integer optionOrder;

  @Column(columnDefinition = "TEXT")
  private String optionText;

  public OptionDto toOptionDto() {
    return OptionDto.builder()
        .optionId(this.id)
        .optionOrder(this.optionOrder)
        .optionText(this.optionText)
        .build();
  }
}
