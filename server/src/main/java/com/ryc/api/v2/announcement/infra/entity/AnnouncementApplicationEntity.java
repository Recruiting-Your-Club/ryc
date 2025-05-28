package com.ryc.api.v2.announcement.infra.entity;

import com.ryc.api.v2.announcement.domain.enums.PersonalInfoQuestionType;
import com.ryc.api.v2.announcement.infra.vo.ApplicationQuestionVO;
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
    @OrderColumn(name = "application_question_order")
    private List<ApplicationQuestionVO> applicationQuestions;

    @ElementCollection
    @CollectionTable(name = "application_personal_info_questions")
    @OrderColumn(name = "personal_info_question_order")
    private List<PersonalInfoQuestionType> personalInfoQuestions;

    @ElementCollection
    @CollectionTable(name = "application_pre_questions")
    @OrderColumn(name = "pre_question_order")
    private List<ApplicationQuestionVO> preQuestions;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "announcement_id")
    private AnnouncementEntity announcementEntity;

}
