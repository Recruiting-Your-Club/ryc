package com.ryc.api.v2.announcement.presentation;

import java.util.List;

import jakarta.validation.Valid;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import com.ryc.api.v2.announcement.common.exception.code.AnnouncementErrorCode;
import com.ryc.api.v2.announcement.presentation.dto.request.AnnouncementCreateRequest;
import com.ryc.api.v2.announcement.presentation.dto.request.AnnouncementUpdateRequest;
import com.ryc.api.v2.announcement.presentation.dto.response.*;
import com.ryc.api.v2.applicationForm.presentation.response.ApplicationFormResponse;
import com.ryc.api.v2.common.aop.annotation.HasRole;
import com.ryc.api.v2.common.exception.annotation.ApiErrorCodeExample;
import com.ryc.api.v2.common.exception.code.ClubErrorCode;
import com.ryc.api.v2.common.exception.code.CommonErrorCode;
import com.ryc.api.v2.common.exception.code.PermissionErrorCode;
import com.ryc.api.v2.role.domain.enums.Role;
import com.ryc.api.v2.security.dto.CustomUserDetail;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;

@RequestMapping("/api/v2")
@Tag(name = "공고")
public interface AnnouncementHttpApi {

  @PostMapping("/clubs/{club-id}/announcements")
  @HasRole(Role.MEMBER)
  @Operation(summary = "클럽 공고 생성", operationId = "createAnnouncement")
  // TODO: EntityNotFoundException 예외 응답 코드 정의 필요
  @ApiErrorCodeExample(
      value = {AnnouncementErrorCode.class, PermissionErrorCode.class, CommonErrorCode.class},
      include = {
        "INVALID_ANNOUNCEMENT_STATUS",
        "INTERVIEW_PERIOD_REQUIRED",
        "DOCUMENT_RESULT_PERIOD_REQUIRED",
        "INTERVIEW_PERIOD_NOT_ALLOWED",
        "DOCUMENT_RESULT_PERIOD_NOT_ALLOWED",
        "DOCUMENT_PERIOD_MUST_BE_AFTER_APPLICATION",
        "INTERVIEW_PERIOD_MUST_BE_AFTER_DOCUMENT",
        "FINAL_RESULT_PERIOD_MUST_BE_AFTER_INTERVIEW",
        "FINAL_RESULT_PERIOD_MUST_BE_AFTER_APPLICATION",
        "MISSING_REQUIRED_PERSONAL_INFO",
        "INVALID_QUESTION_TYPE",
        "QUESTION_OPTION_REQUIRED",
        "QUESTION_OPTION_NOT_ALLOWED",
        "FORBIDDEN_NOT_CLUB_MEMBER",
        "INVALID_PARAMETER"
      })
  ResponseEntity<AnnouncementCreateResponse> create(
      @AuthenticationPrincipal CustomUserDetail userDetail,
      @PathVariable("club-id") String clubId,
      @Valid @RequestBody AnnouncementCreateRequest body);

  @GetMapping("/clubs/{club-id}/announcements")
  @Operation(summary = "클럽 공고 목록 조회")
  ResponseEntity<List<AnnouncementGetAllResponse>> getAnnouncementsByClubId(
      @PathVariable("club-id") String clubId);

  @GetMapping("/announcements/{announcement-id}")
  @Operation(summary = "공고 상세 조회")
  // TODO: EntityNotFoundException 예외 응답 코드 정의 필요
  ResponseEntity<AnnouncementGetDetailResponse> getAnnouncementDetail(
      @PathVariable("announcement-id") String announcementId);

  @PutMapping("/clubs/{club-id}/announcements/{announcement-id}")
  @HasRole(Role.MEMBER)
  @Operation(summary = "공고 수정", operationId = "updateAnnouncement")
  @ApiErrorCodeExample(
      value = {
        AnnouncementErrorCode.class,
        ClubErrorCode.class,
        PermissionErrorCode.class,
        CommonErrorCode.class
      },
      include = {
        "INVALID_ANNOUNCEMENT_STATUS",
        "INTERVIEW_PERIOD_REQUIRED",
        "DOCUMENT_RESULT_PERIOD_REQUIRED",
        "INTERVIEW_PERIOD_NOT_ALLOWED",
        "DOCUMENT_RESULT_PERIOD_NOT_ALLOWED",
        "DOCUMENT_PERIOD_MUST_BE_AFTER_APPLICATION",
        "INTERVIEW_PERIOD_MUST_BE_AFTER_DOCUMENT",
        "FINAL_RESULT_PERIOD_MUST_BE_AFTER_INTERVIEW",
        "FINAL_RESULT_PERIOD_MUST_BE_AFTER_APPLICATION",
        "MISSING_REQUIRED_PERSONAL_INFO",
        "INVALID_QUESTION_TYPE",
        "QUESTION_OPTION_REQUIRED",
        "QUESTION_OPTION_NOT_ALLOWED",
        "CLUB_NOT_FOUND",
        "FORBIDDEN_NOT_CLUB_MEMBER",
        "INVALID_PARAMETER"
      })
  ResponseEntity<AnnouncementUpdateResponse> updateAnnouncementDetail(
      @PathVariable("club-id") String clubId,
      @PathVariable("announcement-id") String announcementId,
      @Valid @RequestBody AnnouncementUpdateRequest body);

  @Operation(summary = "지원폼 조회")
  @GetMapping("/announcements/{announcement-id}/application-form")
  // TODO: EntityNotFoundException 예외 응답 코드 정의 필요
  ResponseEntity<ApplicationFormResponse> getApplicationForm(
      @PathVariable("announcement-id") String announcementId);
}
