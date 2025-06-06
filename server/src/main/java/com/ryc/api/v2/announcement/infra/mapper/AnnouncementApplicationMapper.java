package com.ryc.api.v2.announcement.infra.mapper;

import java.util.List;

import org.springframework.stereotype.Component;

import com.ryc.api.v2.announcement.domain.AnnouncementApplication;
import com.ryc.api.v2.announcement.domain.vo.ApplicationQuestion;
import com.ryc.api.v2.announcement.infra.entity.AnnouncementApplicationEntity;
import com.ryc.api.v2.announcement.infra.entity.AnnouncementEntity;
import com.ryc.api.v2.announcement.infra.vo.ApplicationQuestionVO;

import lombok.RequiredArgsConstructor;

@Component
@RequiredArgsConstructor
public class AnnouncementApplicationMapper {

  private final ApplicationQuestionMapper applicationQuestionMapper;

  /** entity to Domain */
  public AnnouncementApplication toDomain(AnnouncementApplicationEntity entity) {
    List<ApplicationQuestion> applicationQuestions =
        entity.getApplicationQuestions().stream().map(applicationQuestionMapper::toDomain).toList();
    List<ApplicationQuestion> preQuestions =
        entity.getPreQuestions().stream().map(applicationQuestionMapper::toDomain).toList();

    return AnnouncementApplication.builder()
        .id(entity.getId())
        .applicationQuestions(applicationQuestions)
        .personalInfoQuestionTypes(entity.getPersonalInfoQuestions())
        .preQuestions(preQuestions)
        .build();
  }

  /** Domain to entity */
  public AnnouncementApplicationEntity toEntity(AnnouncementApplication domain) {
    List<ApplicationQuestionVO> applicationQuestions =
        domain.getApplicationQuestions().stream().map(applicationQuestionMapper::toVO).toList();
    List<ApplicationQuestionVO> preQuestions =
        domain.getPreQuestions().stream().map(applicationQuestionMapper::toVO).toList();

    return AnnouncementApplicationEntity.builder()
        .id(domain.getId())
        .applicationQuestions(applicationQuestions)
        .personalInfoQuestions(domain.getPersonalInfoQuestionTypes())
        .preQuestions(preQuestions)
        .build();
  }

  /** save시 announcement 주입 mapping */
  public AnnouncementApplicationEntity toEntity(
      AnnouncementApplication applicationDomain, AnnouncementEntity announcement) {
    List<ApplicationQuestionVO> applicationQuestions =
        applicationDomain.getApplicationQuestions().stream()
            .map(applicationQuestionMapper::toVO)
            .toList();
    List<ApplicationQuestionVO> preQuestions =
        applicationDomain.getPreQuestions().stream().map(applicationQuestionMapper::toVO).toList();

    return AnnouncementApplicationEntity.builder()
        .id(applicationDomain.getId())
        .applicationQuestions(applicationQuestions)
        .personalInfoQuestions(applicationDomain.getPersonalInfoQuestionTypes())
        .preQuestions(preQuestions)
        .announcementEntity(announcement)
        .build();
  }
}
