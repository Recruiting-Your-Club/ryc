package com.ryc.api.v2.announcement.infra.mapper;

import com.ryc.api.v2.announcement.domain.AnnouncementApplication;
import com.ryc.api.v2.announcement.domain.vo.ApplicationQuestion;
import com.ryc.api.v2.announcement.infra.entity.AnnouncementApplicationEntity;
import com.ryc.api.v2.announcement.infra.entity.AnnouncementEntity;
import com.ryc.api.v2.announcement.infra.vo.ApplicationQuestionVO;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.stream.Collectors;

@Component
@RequiredArgsConstructor
public class AnnouncementApplicationMapper {

    private final ApplicationQuestionMapper applicationQuestionMapper;

    public AnnouncementApplication toDomain(AnnouncementApplicationEntity entity) {
        List<ApplicationQuestion> applicationQuestions = entity.getApplicationQuestions().stream().map(applicationQuestionMapper::toDomain).toList();
        List<ApplicationQuestion> preQuestions = entity.getPreQuestions().stream().map(applicationQuestionMapper::toDomain).toList();

        return AnnouncementApplication.builder()
                .id(entity.getId())
                .applicationQuestions(applicationQuestions)
                .personalInfoQuestionTypes(entity.getPersonalInfoQuestions())
                .preQuestions(preQuestions)
                .build();
    }

    public AnnouncementApplicationEntity toEntity(AnnouncementApplication domain) {
        List<ApplicationQuestionVO> applicationQuestions = domain.getApplicationQuestions().stream().map(applicationQuestionMapper::toVO).toList();
        List<ApplicationQuestionVO> preQuestions = domain.getPreQuestions().stream().map(applicationQuestionMapper::toVO).toList();

        return AnnouncementApplicationEntity.builder()
                .id(domain.getId())
                .applicationQuestions(applicationQuestions)
                .personalInfoQuestions(domain.getPersonalInfoQuestionTypes())
                .preQuestions(preQuestions)
                .build();
    }
}
