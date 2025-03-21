package com.ryc.api.v1.role.service;

import java.util.ArrayList;
import java.util.List;
import java.util.NoSuchElementException;

import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.dao.DuplicateKeyException;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.ryc.api.v1.club.domain.Club;
import com.ryc.api.v1.club.repository.ClubRepository;
import com.ryc.api.v1.common.constant.RequestStatus;
import com.ryc.api.v1.role.domain.ClubRole;
import com.ryc.api.v1.role.domain.ClubRoleApplication;
import com.ryc.api.v1.role.domain.UserClubRole;
import com.ryc.api.v1.role.dto.internal.UpdateStatusInformation;
import com.ryc.api.v1.role.dto.request.ClubRoleRequest;
import com.ryc.api.v1.role.dto.request.UpdateStatusRequest;
import com.ryc.api.v1.role.dto.response.ClubRoleResponse;
import com.ryc.api.v1.role.dto.response.GetClubRoleApplicationResponse;
import com.ryc.api.v1.role.dto.response.UpdateStatusResponse;
import com.ryc.api.v1.role.repository.ClubRoleApplicationRepository;
import com.ryc.api.v1.role.repository.UserClubRoleRepository;
import com.ryc.api.v1.security.dto.CustomUserDetail;
import com.ryc.api.v1.user.domain.User;
import com.ryc.api.v1.user.repository.UserRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class RoleServiceImpl implements RoleService {

  private final UserRepository userRepository;
  private final ClubRepository clubRepository;
  private final ClubRoleApplicationRepository clubRoleApplicationRepository;
  private final UserClubRoleRepository userClubRoleRepository;

  @Override
  @Transactional
  public ClubRoleResponse createClubRoleApplication(ClubRoleRequest body) {
    // 1. 요청자 조회
    CustomUserDetail userDetails =
        (CustomUserDetail) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
    String requestUserId = userDetails.getId();
    User requestUser =
        userRepository
            .findById(requestUserId)
            .orElseThrow(() -> new NoSuchElementException("User not found"));

    // 2.해당 동아리 조회
    Club club =
        clubRepository
            .findById(body.clubId())
            .orElseThrow(() -> new NoSuchElementException("Club not found"));

    // 3.권한 요청 정보 저장
    ClubRoleApplication clubRoleApplication = body.toClubRoleApplication(requestUser, club);
    try {
      clubRoleApplicationRepository.save(clubRoleApplication);
      clubRoleApplicationRepository.flush();
    } catch (DataIntegrityViolationException e) {
      throw new DuplicateKeyException("Already exists clubRoleApplication");
    }

    return new ClubRoleResponse(clubRoleApplication.getRequestAt());
  }

  @Override
  @Transactional
  public List<GetClubRoleApplicationResponse> findClubRoleApplications(
      String clubId, ClubRole clubRole, RequestStatus status) {
    List<ClubRoleApplication> clubRoleApplications;

    // 1. 필터링 조건에 맞게 권한요청 리스트 찾기
    if (clubRole != ClubRole.ALL && status != RequestStatus.ALL) {
      clubRoleApplications =
          clubRoleApplicationRepository.findByClubIdAndRequestedRoleAndRequestStatus(
              clubId, clubRole, status);
    } else if (clubRole == ClubRole.ALL && status != RequestStatus.ALL) {
      clubRoleApplications =
          clubRoleApplicationRepository.findByClubIdAndRequestStatus(clubId, status);
    } else if (clubRole != ClubRole.ALL && status == RequestStatus.ALL) {
      clubRoleApplications =
          clubRoleApplicationRepository.findByClubIdAndRequestedRole(clubId, clubRole);
    } else {
      clubRoleApplications = clubRoleApplicationRepository.findByClubId(clubId);
    }

    List<GetClubRoleApplicationResponse> responses = new ArrayList<>();
    for (ClubRoleApplication clubRoleApplication : clubRoleApplications) {
      String requestUsername = clubRoleApplication.getUser().getUsername();
      GetClubRoleApplicationResponse getClubRoleApplicationResponse =
          clubRoleApplication.toGetClubRoleApplicationResponse(requestUsername);

      responses.add(getClubRoleApplicationResponse);
    }
    return responses;
  }

  @Override
  @Transactional
  public UpdateStatusResponse updateClubRoleApplicationStatus(UpdateStatusRequest body) {
    // 1. 권한 request 찾기
    ClubRoleApplication clubRoleApplication =
        clubRoleApplicationRepository.findClubRoleApplicationById(body.clubRoleApplicationId());

    // 2. 변경 전 request 상태와 동일한지 check
    RequestStatus requestStatusBeforeUpdate = clubRoleApplication.getRequestStatus();
    if (requestStatusBeforeUpdate == body.requestStatus())
      throw new IllegalArgumentException(
          "Requested status is the same as the current status. No update is necessary.");

    // 3. 요청상태 수정하는 현재 사용자 정보 불러오기
    CustomUserDetail userDetails =
        (CustomUserDetail) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
    String reviewedBy = userDetails.getId();

    // 4. 권한 request 상태 변경하기
    UpdateStatusInformation updateStatusInformation =
        UpdateStatusInformation.builder()
            .reviewedBy(reviewedBy)
            .requestStatus(body.requestStatus())
            .build();
    clubRoleApplication.updateRequestStatus(updateStatusInformation);

    // 5.요청 수락 시, 동아리 내 권한 부여
    if (clubRoleApplication.getRequestStatus() == RequestStatus.APPROVED) {
      UserClubRole userClubRole =
          UserClubRole.builder()
              .club(clubRoleApplication.getClub())
              .user(clubRoleApplication.getUser())
              .clubRole(clubRoleApplication.getRequestedRole())
              .deleted(false)
              .build();
      try {
        userClubRoleRepository.save(userClubRole);
        userClubRoleRepository.flush();
      } catch (DataIntegrityViolationException e) {
        // 중복 키 제약 조건 위반 시, 사용자 정의 예외 던지기
        throw new DuplicateKeyException(
            "Duplicate entry detected: The user,club,role combination already exists.");
      }
    }

    // 6. 응답
    return UpdateStatusResponse.builder()
        .reviewedAt(clubRoleApplication.getReviewedAt())
        .requestStatus(clubRoleApplication.getRequestStatus())
        .reviewedBy(clubRoleApplication.getReviewedBy())
        .build();
  }
}
