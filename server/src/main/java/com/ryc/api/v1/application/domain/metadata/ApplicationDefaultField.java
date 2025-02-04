package com.ryc.api.v1.application.domain.metadata;

import com.ryc.api.v1.recruitment.domain.Step;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Builder
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class ApplicationDefaultField {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @Column(name = "default_field_id")
    private String id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "step_id")
    private Step step;

    @Enumerated(EnumType.STRING)
    private Field field;

    private boolean isRequired;
}
