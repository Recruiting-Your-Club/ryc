package com.ryc.api.v2.announcement.service;

import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.ryc.api.v2.announcement.domain.AnnouncementRepository;
import com.ryc.api.v2.announcement.domain.Announcement;
import com.ryc.api.v2.announcement.presentation.dto.request.AnnouncementCreateRequest;
import com.ryc.api.v2.announcement.presentation.dto.response.AnnouncementCreateResponse;
import com.ryc.api.v2.announcement.presentation.dto.response.AnnouncementGetAllResponse;
import com.ryc.api.v2.announcement.presentation.dto.response.AnnouncementGetDetailResponse;
import com.ryc.api.v2.club.service.ClubService;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Service
public class AnnouncementService {
  private final AnnouncementRepository announcementRepository;
  private final ClubService clubService;

  @Transactional
  public AnnouncementCreateResponse createAnnouncement(
      String clubId, AnnouncementCreateRequest request) {
    // 1.Club 찾기

    // 2.Announcement 생성
    Announcement announcement = Announcement.initialize(request, clubId);

    // 3. 비즈니스 규칙 검사
    announcement.validate();

    Announcement savedAnnouncement = announcementRepository.save(announcement);

    return new AnnouncementCreateResponse(savedAnnouncement.getId());
  }

  @Transactional(readOnly = true)
  public List<AnnouncementGetAllResponse> findAllByClubId(String clubId) {
    // 1. todo club 조회

    // 2. 클럽 ID에 해당하는 모든 공고 조회
    List<Announcement> announcements = announcementRepository.findAllByClubId(clubId);

    // 3. 도메인 객체 목록을 응답 DTO 목록으로 변환
    return announcements.stream().map(AnnouncementGetAllResponse::from).toList();
  }

  @Transactional(readOnly = true)
  public AnnouncementGetDetailResponse findById(String announcementId) {
    // 1. todo club 조회

    // 공고 ID로 공고 조회
    Announcement announcement = announcementRepository.findByIdWithApplication(announcementId);

    // 도메인 객체를 상세 응답 DTO로 변환
    return AnnouncementGetDetailResponse.from(announcement);
  }

  /**
   * club의 announcement조회 후 status반환
   */
  public String getAnnouncementStatus(String clubId) {
      //1. club조회

      //2. announcement조회
      List<Announcement> announcements = announcementRepository.findAllByClubId(clubId);

      //3. status반환
    return "";
  }
}
