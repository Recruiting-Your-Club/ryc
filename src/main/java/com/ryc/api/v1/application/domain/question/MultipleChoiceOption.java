package com.ryc.api.v1.application.domain.question;

import com.ryc.api.v1.application.dto.internal.OptionDto;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.NoArgsConstructor;

@Entity
@Builder
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

    public OptionDto toOptionDto(){
        return OptionDto.builder()
                .optionId(this.id)
                .optionOrder(this.optionOrder)
                .optionText(this.optionText)
                .build();
    }
}
