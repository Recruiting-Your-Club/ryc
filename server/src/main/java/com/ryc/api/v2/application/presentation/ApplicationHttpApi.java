package com.ryc.api.v2.application.presentation;

import java.util.List;

import jakarta.validation.Valid;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.ryc.api.v2.application.presentation.dto.request.ApplicationSubmissionRequest;
import com.ryc.api.v2.application.presentation.dto.response.ApplicationGetResponse;
import com.ryc.api.v2.application.presentation.dto.response.ApplicationSubmissionResponse;
import com.ryc.api.v2.application.presentation.dto.response.ApplicationSummaryResponse;
import com.ryc.api.v2.common.exception.response.ErrorResponse;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.headers.Header;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;

@RequestMapping("/api/v2/announcements/{announcement-id}/applications")
@Tag(name = "지원")
public interface ApplicationHttpApi {

  @PostMapping
  @Operation(summary = "공고 지원", operationId = "submitApplication")
  @ApiResponses(
      value = {
        @ApiResponse(
            responseCode = "201",
            description = "Created",
            content =
                @Content(
                    mediaType = "application/json",
                    schema = @Schema(implementation = ApplicationSubmissionResponse.class)),
            headers = {@Header(name = "Location", description = "생성된 리소스의 상세정보 조회 URI")}),
        @ApiResponse(
            responseCode = "400",
            description = "Bad Request",
            content = @Content(schema = @Schema(implementation = ErrorResponse.class))),
        @ApiResponse(
            responseCode = "404",
            description = "존재하지 않는 공고입니다.",
            content = @Content(schema = @Schema(hidden = true))),
        @ApiResponse(
            responseCode = "409",
            description = "비즈니스 로직에 맞지 않는 요청입니다.",
            content = @Content(schema = @Schema(implementation = ErrorResponse.class)))
      })
  ResponseEntity<ApplicationSubmissionResponse> submitApplication(
      @PathVariable("announcement-id") String announcementId,
      @Valid @RequestBody ApplicationSubmissionRequest body);

  @GetMapping
  @Operation(summary = "공고 지원서 목록 조회", operationId = "getApplications")
  @ApiResponses(
      value = {
        @ApiResponse(
            responseCode = "200",
            description = "OK",
            content =
                @Content(
                    mediaType = "application/json",
                    schema = @Schema(implementation = ApplicationSummaryResponse.class))),
        @ApiResponse(
            responseCode = "404",
            description = "존재하지 않는 공고입니다.",
            content = @Content(schema = @Schema(hidden = true)))
      })
  ResponseEntity<List<ApplicationSummaryResponse>> getApplicationsByAnnouncementId(
      @PathVariable("announcement-id") String announcementId,
      @RequestParam(value = "status", required = false) String status);

  @GetMapping("/{applicant-id}")
  @Operation(summary = "지원서 상세 조회", operationId = "getApplicationDetail")
  @ApiResponses(
      value = {
        @ApiResponse(
            responseCode = "200",
            description = "OK",
            content =
                @Content(
                    mediaType = "application/json",
                    schema = @Schema(implementation = ApplicationGetResponse.class))),
        @ApiResponse(
            responseCode = "404",
            description = "존재하지 않는 공고 또는 지원자입니다.",
            content = @Content(schema = @Schema(hidden = true)))
      })
  ResponseEntity<ApplicationGetResponse> getApplicationDetail(
      @PathVariable("announcement-id") String announcementId,
      @PathVariable("applicant-id") String applicantId);
}
