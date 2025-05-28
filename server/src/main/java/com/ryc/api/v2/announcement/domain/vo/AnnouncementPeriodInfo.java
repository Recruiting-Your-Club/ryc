package com.ryc.api.v2.announcement.domain.vo;

import com.ryc.api.v2.announcement.presentation.dto.request.AnnouncementPeriodInfoRequest;
import lombok.Builder;

/**
 * @param applicationPeriod
 * @param interviewPeriod
 * @param finalResultPeriod
 * @param documentResultPeriod
 * @brief 공고 기간 정보 pojo
 */
@Builder
public record AnnouncementPeriodInfo(
    Period applicationPeriod,
    Period interviewPeriod,
    Period finalResultPeriod,
    Period documentResultPeriod
) {
    public static AnnouncementPeriodInfo initialize(AnnouncementPeriodInfoRequest periodInfo) {
        Period finalResultPeriod = Period.initialize(periodInfo.finalResultPeriod());
        Period documentResultPeriod = Period.initialize(periodInfo.documentResultPeriod());
        Period interviewPeriod = Period.initialize(periodInfo.interviewPeriod());
        Period applicationPeriod = Period.initialize(periodInfo.applicationPeriod());

        return AnnouncementPeriodInfo.builder()
                .applicationPeriod(applicationPeriod)
                .interviewPeriod(interviewPeriod)
                .finalResultPeriod(finalResultPeriod)
                .documentResultPeriod(documentResultPeriod)
                .build();
    }

    public Boolean isValid(boolean hasInterview) {
        //인터뷰가 있을경우 4개의 기간 데이터가 모두 있어야함
        if(hasInterview) {
            return applicationPeriod.isValid()
                    && interviewPeriod.isValid()
                    && finalResultPeriod.isValid()
                    && documentResultPeriod.isValid()
                    && isValidSequence(hasInterview);
        } else {
            //아닐경우 2개값만 유효
            return applicationPeriod.isValid()
                    && finalResultPeriod.isValid()
                    && isValidSequence(hasInterview);
        }

    }

    public Boolean isValidSequence(Boolean hasInterview) {
        if(hasInterview) {
            if(!applicationPeriod.isBefore(interviewPeriod)) {
                throw new IllegalArgumentException("applicationPeriod should be before interviewPeriod");
            }
            if(!interviewPeriod.isBefore(finalResultPeriod)) {
                throw new IllegalArgumentException("interviewPeriod should be before finalResultPeriod");
            }
            if(!finalResultPeriod.isBefore(documentResultPeriod)) {
                throw new IllegalArgumentException("finalResultPeriod should be before documentResultPeriod");
            }
            return true;
        } else {
            if(!applicationPeriod.isBefore(finalResultPeriod)) {
                throw new IllegalArgumentException("applicationPeriod should be before finalResultPeriod");
            }
            return true;
        }
    }
}
