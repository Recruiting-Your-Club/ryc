package com.ryc.api.v1.role.service;

import com.ryc.api.v1.club.domain.Club;
import com.ryc.api.v1.club.repository.ClubRepository;
import com.ryc.api.v1.role.domain.ClubRoleApplication;
import com.ryc.api.v1.role.dto.ClubRoleRequest;
import com.ryc.api.v1.role.dto.ClubRoleResponse;
import com.ryc.api.v1.role.repository.ClubRoleApplicationRepository;
import com.ryc.api.v1.security.dto.CustomUserDetail;
import com.ryc.api.v1.user.domain.User;
import com.ryc.api.v1.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.dao.DuplicateKeyException;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.NoSuchElementException;

@Service
@RequiredArgsConstructor
public class RoleServiceImpl implements RoleService {

    private final UserRepository userRepository;
    private final ClubRepository clubRepository;
    private final ClubRoleApplicationRepository clubRoleApplicationRepository;

    @Override
    @Transactional
    public ClubRoleResponse createClubRoleApplication(ClubRoleRequest body) {
        //1. 요청자 조회
        CustomUserDetail userDetails = (CustomUserDetail) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        String requestUserId = userDetails.getId();
        User requestUser = userRepository.findById(requestUserId)
                .orElseThrow(() -> new NoSuchElementException("User not found"));

        //2.해당 동아리 조회
        Club club = clubRepository.findById(body.clubId())
                .orElseThrow(() -> new NoSuchElementException("Club not found"));

        //3.권한 요청 정보 저장
        ClubRoleApplication clubRoleApplication = body.toClubRoleApplication(requestUser, club);
        try {
            clubRoleApplicationRepository.save(clubRoleApplication);
            clubRoleApplicationRepository.flush();
        } catch (DataIntegrityViolationException e) {
            throw new DuplicateKeyException("Already exists clubRoleApplication");
        }

        return new ClubRoleResponse(clubRoleApplication.getRequestAt());
    }

}
