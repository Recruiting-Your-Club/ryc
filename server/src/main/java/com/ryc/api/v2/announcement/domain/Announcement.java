package com.ryc.api.v2.announcement.domain;

import com.ryc.api.v2.announcement.domain.enums.AnnouncementStatus;
import com.ryc.api.v2.announcement.domain.enums.AnnouncementType;
import com.ryc.api.v2.announcement.domain.vo.AnnouncementPeriodInfo;
import com.ryc.api.v2.announcement.domain.vo.Image;
import com.ryc.api.v2.announcement.domain.vo.Tag;
import com.ryc.api.v2.announcement.presentation.dto.request.AnnouncementCreateRequest;
import com.ryc.api.v2.common.constant.DomainDefaultValues;
import lombok.Builder;
import lombok.Getter;
import java.time.LocalDateTime;
import java.util.List;

@Getter
@Builder
public class Announcement {
    private final String id;
    private final String clubId;
    private final String title;
    private final String numberOfPeople;
    private final String detailDescription;
    private final String summaryDescription;
    private final String target;
    private final List<Tag> tags;
    private final List<Image> images;
    private final AnnouncementStatus announcementStatus;
    private final AnnouncementType announcementType;
    private final Boolean hasInterview;
    private final AnnouncementPeriodInfo announcementPeriodInfo;
    private final AnnouncementApplication announcementApplication;
    private final String activityPeriod;

    /**
     *
     * @param request create request
     * @return Announcement domain
     * @brief 최초 생성시에만 사용하는 정적 팩토리 메서드
     */
    public static Announcement initialize(AnnouncementCreateRequest request) {
        List<Tag> tags = request.tags().stream()
                .map(Tag::initialize)
                .toList();

        List<Image> images = request.images().stream()
                .map(Image::initialize)
                .toList();

        AnnouncementApplication announcementApplication = AnnouncementApplication.initialize(request.application());

        AnnouncementPeriodInfo announcementPeriodInfo = AnnouncementPeriodInfo.initialize(request.periodInfo());
        
        // 현재 시간과 지원 기간을 비교하여 상태 결정
        AnnouncementStatus announcementStatus = getAnnouncementStatus(announcementPeriodInfo);

        if(announcementStatus == AnnouncementStatus.CLOSED){
            throw new IllegalArgumentException("announcement is closed");
        }

        return Announcement.builder()
                .id(DomainDefaultValues.DEFAULT_INITIAL_ID)
                .clubId(request.clubId())
                .announcementPeriodInfo(announcementPeriodInfo)
                .title(request.title())
                .numberOfPeople(request.numberOfPeople())
                .detailDescription(request.detailDescription())
                .summaryDescription(request.summaryDescription())
                .target(request.target())
                .tags(tags)
                .hasInterview(request.hasInterview())
                .images(images)
                .announcementStatus(announcementStatus)
                .announcementType(request.announcementType())
                .announcementApplication(announcementApplication)
                .activityPeriod(request.activityPeriod())
                .build();
    }

    /**
     *
     * @brief 유효 객체 검사
     */
    public boolean isValid(){
        return announcementPeriodInfo.isValid(hasInterview)
                && announcementApplication.isValid();
    }

    /**
     *
     * @param announcementPeriodInfo
     * @brief 불변객체를 유지하며 상태값을 db에 저장하지 않기에 entity를 읽어올때마다 status를 반환하는 메소드
     */
    public static AnnouncementStatus getAnnouncementStatus(AnnouncementPeriodInfo announcementPeriodInfo) {
        LocalDateTime now = LocalDateTime.now();
        if (now.isBefore(announcementPeriodInfo.applicationPeriod().startDate())) {
            return AnnouncementStatus.UPCOMING;
        } else if (now.isBefore(announcementPeriodInfo.applicationPeriod().endDate())) {
            return AnnouncementStatus.RECRUITING;
        } else {
            return AnnouncementStatus.CLOSED;
        }
    }

}
