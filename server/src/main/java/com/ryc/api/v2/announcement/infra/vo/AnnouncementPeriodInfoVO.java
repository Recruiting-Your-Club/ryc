package com.ryc.api.v2.announcement.infra.vo;

import jakarta.persistence.Embeddable;
import lombok.*;

@Embeddable
@Getter
@Builder
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor(access = AccessLevel.PRIVATE)
public class AnnouncementPeriodInfoVO {
    private PeriodVO applicationPeriodVO;
    private PeriodVO interviewPeriodVO;
    private PeriodVO resultAnnouncementPeriodVO;
    private PeriodVO applicationResultPeriodVO;
}
