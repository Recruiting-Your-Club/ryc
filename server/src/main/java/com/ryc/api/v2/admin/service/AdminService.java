package com.ryc.api.v2.admin.service;

import java.util.NoSuchElementException;

import org.springframework.context.ApplicationEventPublisher;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.ryc.api.v2.admin.domain.Admin;
import com.ryc.api.v2.admin.domain.AdminRepository;
import com.ryc.api.v2.admin.domain.event.AdminDeletedEvent;
import com.ryc.api.v2.admin.presentation.response.AdminEmailDuplicatedResponse;
import com.ryc.api.v2.admin.presentation.response.MyInformationGetResponse;
import com.ryc.api.v2.common.dto.response.FileGetResponse;
import com.ryc.api.v2.file.domain.FileDomainType;
import com.ryc.api.v2.file.service.FileService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class AdminService {

  private final AdminRepository adminRepository;
  private final ApplicationEventPublisher eventPublisher;
  private final FileService fileService;

  // TODO:: AdminRepository로 이전 예정
  @Transactional(readOnly = true)
  public Admin getAdminById(String id) {
    return adminRepository
        .findById(id)
        .orElseThrow(() -> new NoSuchElementException("Admin not found with id: " + id));
  }

  @Transactional(readOnly = true)
  public AdminEmailDuplicatedResponse checkEmailDuplicate(String email) {
    boolean isDuplicated = adminRepository.existsByEmail(email);
    return new AdminEmailDuplicatedResponse(isDuplicated);
  }

  @Transactional
  public void deleteAdminById(String adminId) {
    eventPublisher.publishEvent(new AdminDeletedEvent(adminId));
    adminRepository.deleteById(adminId);
  }

  @Transactional(readOnly = true)
  public MyInformationGetResponse getCurrentAdmin(
      String adminId, String adminName, String adminEmail) {
    FileGetResponse adminImageUrl =
        fileService.findAllByAssociatedId(adminId).stream()
            .filter(image -> image.getFileDomainType() == FileDomainType.USER_PROFILE)
            .findFirst()
            .map(image -> FileGetResponse.of(image, fileService.getPrivateFileGetUrl(image)))
            .orElse(null);

    // TODO: adminImageUrl -> null 체크 필요한가

    return MyInformationGetResponse.builder()
        .name(adminName)
        .email(adminEmail)
        .representativeImage(adminImageUrl)
        .build();
  }
}
