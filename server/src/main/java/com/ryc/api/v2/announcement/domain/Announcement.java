package com.ryc.api.v2.announcement.domain;

import java.time.LocalDateTime;
import java.util.List;

import com.ryc.api.v2.announcement.common.exception.code.AnnouncementErrorCode;
import com.ryc.api.v2.announcement.domain.enums.AnnouncementStatus;
import com.ryc.api.v2.announcement.domain.enums.AnnouncementType;
import com.ryc.api.v2.announcement.domain.vo.AnnouncementPeriodInfo;
import com.ryc.api.v2.announcement.domain.vo.Tag;
import com.ryc.api.v2.announcement.presentation.dto.request.AnnouncementCreateRequest;
import com.ryc.api.v2.announcement.presentation.dto.request.AnnouncementUpdateRequest;
import com.ryc.api.v2.applicationForm.domain.ApplicationForm;
import com.ryc.api.v2.common.constant.DomainDefaultValues;
import com.ryc.api.v2.common.exception.custom.BusinessRuleException;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class Announcement {
    // Announcement 정보
    private final String id;
    private final String clubId;
    private final String title;
    private final String numberOfPeople;
    private final String detailDescription;
    private final String summaryDescription;
    private final String target;
    private final String field;
    private final List<Tag> tags;
    private final List<AnnouncementImage> images;
    private final AnnouncementStatus announcementStatus;
    private final AnnouncementType announcementType;
    private final Boolean hasInterview;
    private final AnnouncementPeriodInfo announcementPeriodInfo;
    private final String activityPeriod;

    // application form
    private final ApplicationForm applicationForm;

    // soft delete
    private final Boolean isDeleted;

    // timestamp
    private final LocalDateTime createdAt;
    private final LocalDateTime updatedAt;

    /**
     * 최초 생성시에만 사용하는 정적 팩토리 메서드
     *
     * @param request create request
     * @return Announcement domain
     */
    public static Announcement initialize(AnnouncementCreateRequest request, String clubId) {
        List<Tag> tags = request.tags().stream().map(Tag::from).toList();

        List<AnnouncementImage> images =
                request.images().stream().map(AnnouncementImage::initialize).toList();

        ApplicationForm applicationForm = ApplicationForm.initialize(request.applicationForm());

        AnnouncementPeriodInfo announcementPeriodInfo =
                AnnouncementPeriodInfo.from(request.periodInfo());

        // 2. 현재 기간과 지원 기간을 비교하여 상태 반환
        AnnouncementStatus announcementStatus = AnnouncementStatus.from(announcementPeriodInfo);

        // 4. Announcement 생성
        Announcement announcement =
                Announcement.builder()
                        .id(DomainDefaultValues.DEFAULT_INITIAL_ID)
                        .clubId(clubId)
                        .announcementPeriodInfo(announcementPeriodInfo)
                        .title(request.title())
                        .numberOfPeople(request.numberOfPeople())
                        .detailDescription(request.detailDescription())
                        .summaryDescription(request.summaryDescription())
                        .target(request.target())
                        .field(request.field())
                        .tags(tags)
                        .hasInterview(request.hasInterview())
                        .images(images)
                        .announcementStatus(announcementStatus)
                        .announcementType(request.announcementType())
                        .applicationForm(applicationForm)
                        .activityPeriod(request.activityPeriod())
                        .isDeleted(false)
                        .build();

        // 5. 유효성 검사
        announcement.validate();
        return announcement;
    }

    /**
     * update request to announcement domain
     *
     * @param request Update Request
     */
    public static Announcement of(
            AnnouncementUpdateRequest request, String announcementId, String clubId) {

        List<Tag> updatedTags = request.tags().stream().map(Tag::from).toList();
        List<AnnouncementImage> updatedImages =
                request.images().stream().map(AnnouncementImage::from).toList();

        ApplicationForm applicationForm = ApplicationForm.from(request.applicationForm());
        AnnouncementPeriodInfo updatedAnnouncementPeriodInfo =
                AnnouncementPeriodInfo.from(request.periodInfo());
        AnnouncementStatus updatedAnnouncementStatus =
                AnnouncementStatus.from(updatedAnnouncementPeriodInfo);

        // 3. announcement 생성
        Announcement announcement =
                Announcement.builder()
                        .id(announcementId)
                        .applicationForm(applicationForm)
                        .title(request.title())
                        .clubId(clubId)
                        .numberOfPeople(request.numberOfPeople())
                        .detailDescription(request.detailDescription())
                        .summaryDescription(request.summaryDescription())
                        .target(request.target())
                        .field(request.field())
                        .hasInterview(request.hasInterview())
                        .activityPeriod(request.activityPeriod())
                        .tags(updatedTags)
                        .images(updatedImages)
                        .announcementStatus(updatedAnnouncementStatus)
                        .announcementType(request.announcementType())
                        .isDeleted(false)
                        .announcementPeriodInfo(updatedAnnouncementPeriodInfo)
                        .build();

        // 4. 유효성 검사
        announcement.validate();
        return announcement;
    }

    /**
     * status 갱신 메소드
     */
    public Announcement updateStatus() {
        AnnouncementStatus updatedAnnouncementStatus =
                AnnouncementStatus.from(this.announcementPeriodInfo);

        return Announcement.builder()
                .id(this.id)
                .title(this.title)
                .clubId(this.clubId)
                .numberOfPeople(this.numberOfPeople)
                .detailDescription(this.detailDescription)
                .summaryDescription(this.summaryDescription)
                .target(this.target)
                .target(this.field)
                .hasInterview(this.hasInterview)
                .activityPeriod(this.activityPeriod)
                .tags(this.tags)
                .images(this.images)
                .applicationForm(this.applicationForm)
                .announcementStatus(updatedAnnouncementStatus)
                .announcementType(this.announcementType)
                .isDeleted(false)
                .announcementPeriodInfo(this.announcementPeriodInfo)
                .build();
    }

    /**
     * 유효 객체 검사
     *
     * @throws IllegalArgumentException 각 객체가 유효하지 않을 경우
     */
    public void validate() {
        // 생성시에는 모집 예정, 모집 중
        if (id.equals(DomainDefaultValues.DEFAULT_INITIAL_ID)) {
            if (announcementStatus == AnnouncementStatus.CLOSED) {
                throw new BusinessRuleException(AnnouncementErrorCode.INVALID_ANNOUNCEMENT_STATUS);
            }
        }
        // 업데이트시 모집 예정일때만 수정가능
        else {
            if (!(announcementStatus == AnnouncementStatus.UPCOMING)) {
                throw new BusinessRuleException(AnnouncementErrorCode.INVALID_ANNOUNCEMENT_STATUS);
            }
        }

        announcementPeriodInfo.validate(hasInterview);
        applicationForm.checkBusinessRules();
    }
}
