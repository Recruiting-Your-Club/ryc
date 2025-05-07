package com.ryc.api.v2.announcement.infra.entity;

import com.ryc.api.v2.announcement.domain.question.PersonalInfoQuestionType;
import com.ryc.api.v2.common.entity.BaseEntity;
import jakarta.persistence.*;
import lombok.*;

import java.util.List;

@Table(name = "announcement_application")
@Entity
@Getter
@Builder
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor(access = AccessLevel.PRIVATE)
public class AnnouncementApplicationEntity extends BaseEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String id;

    @ElementCollection
    @CollectionTable(name = "application_questions")
    private List<ApplicationQuestion> applicationQuestions;

    @ElementCollection
    @CollectionTable(name = "application_personal_info_questions")
    private List<PersonalInfoQuestionType> personalInfoQuestions;

    @ElementCollection
    @CollectionTable(name = "application_pre_questions")
    private List<ApplicationQuestion> preQuestions;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "announcement_id")
    private AnnouncementEntity announcementEntity;
}
