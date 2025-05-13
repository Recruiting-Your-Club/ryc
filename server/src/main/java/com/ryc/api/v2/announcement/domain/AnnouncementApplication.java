package com.ryc.api.v2.announcement.domain;

import com.ryc.api.v2.announcement.domain.enums.PersonalInfoQuestionType;
import com.ryc.api.v2.announcement.domain.vo.ApplicationQuestion;
import lombok.Builder;
import lombok.Getter;

import java.util.List;

@Builder
@Getter
public class AnnouncementApplication {
    private final String id;

    private List<ApplicationQuestion> applicationQuestions;
    private List<PersonalInfoQuestionType> personalInfoQuestionTypes;
    private List<ApplicationQuestion> preQuestions;

    public static AnnouncementApplication initialize(){
        return AnnouncementApplication.builder()
                .applicationQuestions(List.of())
                .personalInfoQuestionTypes(List.of())
                .preQuestions(List.of())
                .build();
    }
}
