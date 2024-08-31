package com.ryc.api.v1.evaluation.service;

import com.ryc.api.v1.common.constant.RequestStatus;
import com.ryc.api.v1.evaluation.domain.PermissionApplication;
import com.ryc.api.v1.evaluation.dto.request.PermissionRequest;
import com.ryc.api.v1.evaluation.dto.response.GetPermissionApplicationResponse;
import com.ryc.api.v1.evaluation.dto.response.PermissionResponse;
import com.ryc.api.v1.evaluation.repository.PermissionRequestRepository;
import com.ryc.api.v1.recruitment.domain.Recruitment;
import com.ryc.api.v1.recruitment.repository.RecruitmentRepository;
import com.ryc.api.v1.role.domain.ClubRole;
import com.ryc.api.v1.role.domain.UserClubRole;
import com.ryc.api.v1.role.repository.UserClubRoleRepository;
import com.ryc.api.v1.security.dto.CustomUserDetail;
import com.ryc.api.v1.user.domain.User;
import com.ryc.api.v1.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.dao.DuplicateKeyException;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.NoSuchElementException;

@Service
@RequiredArgsConstructor
public class PermissionRequestServiceImpl implements PermissionRequestService{

    private final UserRepository userRepository;
    private final RecruitmentRepository recruitmentRepository;
    private final UserClubRoleRepository userClubRoleRepository;
    private final PermissionRequestRepository permissionRequestRepository;

    @Override
    @Transactional
    public PermissionResponse requestPermission(PermissionRequest body) {
        //1. 요청자 조회
        CustomUserDetail userDetails = (CustomUserDetail) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        String requestUserId = userDetails.getId();
        User requestUser = userRepository.findById(requestUserId)
                .orElseThrow(() -> new NoSuchElementException("User not found"));

        //2. 전형정보 및 동아리 정보 불러오기
        Recruitment recruitment = recruitmentRepository.findById(body.recruitmentId())
                .orElseThrow(() -> new NoSuchElementException("Recruitment not found"));

        //3. 요청자 동아리 내 권한 조회
        UserClubRole userClubRole = userClubRoleRepository.findByClubAndUser(recruitment.getClub(), requestUser)
                .orElseThrow(() -> new NoSuchElementException("User is not in Club"));

        //3-1. 회장권한이면 요청 금지
        if(userClubRole.getClubRole() == ClubRole.PRESIDENT){
            throw new IllegalStateException("You already have evaluation permissions as the President, so this request is not allowed.");
        }

        //이미 생성된 요청인지 확인
        if(permissionRequestRepository.existsByRecruitmentAndUser(recruitment, requestUser))
            throw new DuplicateKeyException("Already exists requested permission");

        //4. 요청 생성
        PermissionApplication permissionApplication = PermissionApplication.builder()
                .user(requestUser)
                .recruitment(recruitment)
                .requestStatus(RequestStatus.PENDING)
                .build();
        permissionRequestRepository.saveAndFlush(permissionApplication);

        return new PermissionResponse(permissionApplication.getRequestAt());
    }

    @Override
    @Transactional
    public List<GetPermissionApplicationResponse> findPermissionApplications(String recruitmentId, RequestStatus status) {
        List<PermissionApplication> permissionApplications;

        //TODO: 동아리 회장인지 확인하기
        //1. 필터링 조건에 맞게 평가권한 요청 리스트 찾기
        if(status == RequestStatus.ALL)
            permissionApplications = permissionRequestRepository.findByRecruitmentId(recruitmentId);
        else
            permissionApplications = permissionRequestRepository.findByRecruitmentIdAndRequestStatus(recruitmentId, status);

        //2. 요청 리스트 반환
        List<GetPermissionApplicationResponse> responses = new ArrayList<>();
        for(PermissionApplication permissionApplication : permissionApplications){
            GetPermissionApplicationResponse getPermissionApplicationResponse =
                    permissionApplication.toGetPermissionApplicationResponse();

            responses.add(getPermissionApplicationResponse);
        }

        return responses;
    }
}
