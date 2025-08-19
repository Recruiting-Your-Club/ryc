package com.ryc.api.v2.file.presentation;

import jakarta.validation.Valid;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.ryc.api.v2.common.dto.response.FileGetResponse;
import com.ryc.api.v2.file.presentation.dto.request.AccessPresignedUrlGetRequest;
import com.ryc.api.v2.file.presentation.dto.request.UploadConfirmRequest;
import com.ryc.api.v2.file.presentation.dto.request.UploadUrlRequest;
import com.ryc.api.v2.file.presentation.dto.response.UploadUrlResponse;
import com.ryc.api.v2.file.service.FileService;

import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("api/v2/files")
@RequiredArgsConstructor
@Tag(name = "파일")
public class FileHttpApi {
  private final FileService fileService;

  @PostMapping("/presigned-url")
  public ResponseEntity<UploadUrlResponse> getUploadPresignedUrl(
      @RequestBody @Valid UploadUrlRequest request) {
    UploadUrlResponse response = fileService.getUploadPresignedUrl(request);
    return ResponseEntity.ok(response);
  }

  @PostMapping("/confirm-upload")
  public ResponseEntity<Void> confirmUpload(@RequestBody @Valid UploadConfirmRequest request) {
    fileService.confirmUpload(request);
    return ResponseEntity.ok().build();
  }

  @PostMapping("/access-presigned-url")
  public ResponseEntity<FileGetResponse> getAccessPresignedUrl(
      @RequestBody @Valid AccessPresignedUrlGetRequest request) {
    return ResponseEntity.ok(fileService.getAccessPresignedUrl(request));
  }
}
