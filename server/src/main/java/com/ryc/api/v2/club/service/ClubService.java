package com.ryc.api.v2.club.service;

import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.ryc.api.v2.club.domain.Club;
import com.ryc.api.v2.club.domain.ClubRepository;
import com.ryc.api.v2.club.domain.ClubTag;
import com.ryc.api.v2.club.presentation.dto.request.ClubCreateRequest;
import com.ryc.api.v2.club.presentation.dto.response.ClubCreateResponse;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class ClubService {
  private final ClubRepository clubRepository;

  @Transactional
  public ClubCreateResponse createClub(ClubCreateRequest body) {
    /**
     * 1. 이미지 저장 및 URL 받아오기 2. ClubTag 리스트 생성 및 Club 객체 생성 3. Club 갹채 및 ClubTags DB 저장 4. 생성한 유저,
     * 운영진 권한 부여 및 저장
     */

    // TODO: 클라이언트에서 받은 이미지 파일 S3 저장 후 ImageUrl, ThumnailUrl 받아오는 프로세스 필요. (추후 아래, "MOCK_URL" 삭제)
    final String ImageUrlFromS3 = "MOCK_URL";
    final String ThumbnailUrlFromS3 = "MOCK_URL";

    final List<ClubTag> clubTags = body.tagNames().stream().map(ClubTag::initialize).toList();

    Club club = Club.initialize(body, ImageUrlFromS3, ThumbnailUrlFromS3, clubTags);
    Club savedClub = clubRepository.save(club);

    // TODO: Security Context에서 사용자를 찾고, 해당 사용자에게 MANAGER 권한 부여
    //    final String currentUserId = UserUtil.getCurrentUserId();

    return ClubCreateResponse.builder().clubId(savedClub.getId()).build();
  }
}
