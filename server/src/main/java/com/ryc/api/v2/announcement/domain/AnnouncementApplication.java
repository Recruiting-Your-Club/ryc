package com.ryc.api.v2.announcement.domain;

import com.ryc.api.v2.announcement.domain.enums.PersonalInfoQuestionType;
import com.ryc.api.v2.announcement.domain.vo.ApplicationQuestion;
import com.ryc.api.v2.announcement.presentation.dto.request.AnnouncementApplicationRequest;
import lombok.Builder;
import lombok.Getter;

import java.util.List;
import java.util.stream.IntStream;

@Builder
@Getter
public class AnnouncementApplication {
    private final String id;

    private List<ApplicationQuestion> applicationQuestions;
    private List<PersonalInfoQuestionType> personalInfoQuestionTypes;
    private List<ApplicationQuestion> preQuestions;

    /**
     *
     * @param announcementApplicationRequest create request
     * @return AnnouncementApplication domain
     * @brief 최초 생성시에만 사용되는 정적 팩토리 메소드
     */
    public static AnnouncementApplication initialize(AnnouncementApplicationRequest announcementApplicationRequest){
        List<ApplicationQuestion> applicationQuestions = announcementApplicationRequest.applicationQuestions().stream()
                .map(ApplicationQuestion::initialize)
                .toList();

        List<ApplicationQuestion> preQuestions = announcementApplicationRequest.preQuestions().stream()
                .map(ApplicationQuestion::initialize)
                .toList();

        return AnnouncementApplication.builder()
                .applicationQuestions(List.copyOf(applicationQuestions))
                .personalInfoQuestionTypes(announcementApplicationRequest.personalInfoQuestionTypes())
                .preQuestions(List.copyOf(preQuestions))
                .build();
    }

    /**
     * @brief 유효 객체 검사
     */
    public Boolean isValid(){
        return applicationQuestions.stream().allMatch(ApplicationQuestion::isValid)
                && preQuestions.stream().allMatch(ApplicationQuestion::isValid)
                && personalInfoQuestionTypes.containsAll(List.of(
                        PersonalInfoQuestionType.NAME,
                        PersonalInfoQuestionType.EMAIL
        ));
    }
}
