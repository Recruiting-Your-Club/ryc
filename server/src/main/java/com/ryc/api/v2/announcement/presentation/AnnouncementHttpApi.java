package com.ryc.api.v2.announcement.presentation;

import java.net.URI;
import java.util.List;

import jakarta.validation.Valid;
import jakarta.validation.constraints.NotBlank;

import org.hibernate.validator.constraints.UUID;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import com.ryc.api.v2.announcement.common.exception.code.AnnouncementErrorCode;
import com.ryc.api.v2.announcement.presentation.dto.request.AnnouncementCreateRequest;
import com.ryc.api.v2.announcement.presentation.dto.request.AnnouncementDeletedRequest;
import com.ryc.api.v2.announcement.presentation.dto.request.AnnouncementUpdateRequest;
import com.ryc.api.v2.announcement.presentation.dto.response.*;
import com.ryc.api.v2.announcement.service.AnnouncementService;
import com.ryc.api.v2.applicationForm.presentation.response.ApplicationFormResponse;
import com.ryc.api.v2.applicationForm.service.ApplicationFormService;
import com.ryc.api.v2.common.aop.annotation.HasRole;
import com.ryc.api.v2.common.exception.annotation.ApiErrorCodeExample;
import com.ryc.api.v2.common.exception.code.ClubErrorCode;
import com.ryc.api.v2.common.exception.code.CommonErrorCode;
import com.ryc.api.v2.common.exception.code.PermissionErrorCode;
import com.ryc.api.v2.role.domain.enums.Role;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v2")
@Validated
@Tag(name = "공고")
public class AnnouncementHttpApi {

  private final AnnouncementService announcementService;
  private final ApplicationFormService applicationFormService;

  @PostMapping("/clubs/{club-id}/announcements")
  @HasRole(Role.MEMBER)
  @Operation(summary = "클럽 공고 생성", operationId = "createAnnouncement")
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
  public ResponseEntity<AnnouncementCreateResponse> create(
      @PathVariable("club-id") @NotBlank(message = "동아리 아이디는 공백일 수 없습니다.") @UUID(message = "동아리 아이디는 UUID 포멧이어야 합니다.") String clubId,
      @RequestBody @Valid AnnouncementCreateRequest body) {
    AnnouncementCreateResponse response = announcementService.createAnnouncement(clubId, body);

    URI location =
        ServletUriComponentsBuilder.fromCurrentContextPath()
            .path("/api/v2/clubs/{club-id}/announcements/{announcement-id}")
            .buildAndExpand(clubId, response.announcementId())
            .toUri();

    return ResponseEntity.created(location).body(response);
  }

  @GetMapping("/clubs/{club-id}/announcements")
  @Operation(summary = "클럽 공고 목록 조회")
  public ResponseEntity<List<AnnouncementGetAllResponse>> getAnnouncementsByClubId(
      @PathVariable("club-id") @NotBlank(message = "동아리 아이디는 공백일 수 없습니다.") @UUID(message = "동아리 아이디는 UUID 포멧이어야 합니다.") String clubId) {
    return ResponseEntity.status(HttpStatus.OK).body(announcementService.findAllByClubId(clubId));
  }

  @GetMapping("/announcements/{announcement-id}")
  @Operation(summary = "공고 상세 조회")
  @ApiErrorCodeExample(
      value = {CommonErrorCode.class},
      include = {"RESOURCE_NOT_FOUND"})
  public ResponseEntity<AnnouncementGetDetailResponse> getAnnouncementDetail(
      @PathVariable("announcement-id") @NotBlank(message = "공고 아이디는 공백일 수 없습니다.") @UUID(message = "공고 아이디는 UUID 포멧이어야 합니다.") String announcementId) {
    return ResponseEntity.status(HttpStatus.OK).body(announcementService.findById(announcementId));
  }

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
        "FORBIDDEN_NOT_CLUB_MEMBER",
        "INVALID_PARAMETER",
        "RESOURCE_NOT_FOUND"
      })
  public ResponseEntity<AnnouncementUpdateResponse> updateAnnouncementDetail(
      @PathVariable("club-id") @NotBlank(message = "동아리 아이디는 공백일 수 없습니다.") @UUID(message = "동아리 아이디는 UUID 포멧이어야 합니다.") String clubId,
      @PathVariable("announcement-id") @NotBlank(message = "공고 아이디는 공백일 수 없습니다.") @UUID(message = "공고 아이디는 UUID 포멧이어야 합니다.") String announcementId,
      @Valid @RequestBody AnnouncementUpdateRequest body) {
    return ResponseEntity.status(HttpStatus.OK)
        .body(announcementService.updateAnnouncement(body, announcementId, clubId));
  }

  @Operation(summary = "지원폼 조회")
  @GetMapping("/announcements/{announcement-id}/application-form")
  @ApiErrorCodeExample(
      value = {CommonErrorCode.class},
      include = {"RESOURCE_NOT_FOUND"})
  public ResponseEntity<ApplicationFormResponse> getApplicationForm(
      @PathVariable("announcement-id") @NotBlank(message = "공고 아이디는 공백일 수 없습니다.") @UUID(message = "공고 아이디는 UUID 포멧이어야 합니다.") String announcementId) {
    return ResponseEntity.status(HttpStatus.OK)
        .body(applicationFormService.getApplicationFormByAnnouncementId(announcementId));
  }

  @Operation(summary = "공고 단계(process) 정보")
  @GetMapping("/announcements/{announcement-id}/process")
  @ApiErrorCodeExample(
      value = {CommonErrorCode.class},
      include = {"RESOURCE_NOT_FOUND"})
  public ResponseEntity<AnnouncementProcessGetResponse> getAnnouncementProcess(
      @PathVariable("announcement-id") @NotBlank(message = "공고 아이디는 공백일 수 없습니다.") @UUID(message = "공고 아이디는 UUID 포멧이어야 합니다.") String announcementId) {
    return ResponseEntity.status(HttpStatus.OK)
        .body(announcementService.getAnnouncementProcess(announcementId));
  }

  @DeleteMapping("announcements")
  @HasRole(Role.OWNER)
  @Operation(summary = "공고 삭제", description = "공고들을 삭제합니다.")
  @ApiErrorCodeExample(
      value = {PermissionErrorCode.class},
      include = {"FORBIDDEN_NOT_CLUB_OWNER"})
  public ResponseEntity<Void> deleteAnnouncements(
      @Valid @RequestBody AnnouncementDeletedRequest body) {
    announcementService.deleteAnnouncements(body.announcementIds());
    return ResponseEntity.noContent().build();
  }
}
