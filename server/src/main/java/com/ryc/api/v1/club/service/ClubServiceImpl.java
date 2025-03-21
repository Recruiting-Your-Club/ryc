package com.ryc.api.v1.club.service;

import java.util.ArrayList;
import java.util.List;
import java.util.NoSuchElementException;

import jakarta.persistence.EntityNotFoundException;

import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.dao.DuplicateKeyException;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.ryc.api.v1.club.domain.Category;
import com.ryc.api.v1.club.domain.Club;
import com.ryc.api.v1.club.domain.ClubCategory;
import com.ryc.api.v1.club.domain.ClubCategoryId;
import com.ryc.api.v1.club.dto.request.CreateClubRequest;
import com.ryc.api.v1.club.dto.response.ClubOverviewResponse;
import com.ryc.api.v1.club.dto.response.ClubResponse;
import com.ryc.api.v1.club.dto.response.CreateClubResponse;
import com.ryc.api.v1.club.repository.CategoryRepository;
import com.ryc.api.v1.club.repository.ClubCategoryRepository;
import com.ryc.api.v1.club.repository.ClubRepository;
import com.ryc.api.v1.role.domain.ClubRole;
import com.ryc.api.v1.role.domain.UserClubRole;
import com.ryc.api.v1.role.repository.UserClubRoleRepository;
import com.ryc.api.v1.security.dto.CustomUserDetail;
import com.ryc.api.v1.user.domain.User;
import com.ryc.api.v1.user.repository.UserRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class ClubServiceImpl implements ClubService {
  private final ClubRepository clubRepository;
  private final CategoryRepository categoryRepository;
  private final ClubCategoryRepository clubCategoryRepository;

  private final UserRepository userRepository;
  private final UserClubRoleRepository userClubRoleRepository;

  @Override
  @Transactional
  public CreateClubResponse createClub(CreateClubRequest body) {

    if (clubRepository.existsByClubName(body.name())) {
      throw new DuplicateKeyException("This club Already Exist");
    }

    Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
    CustomUserDetail userDetails = (CustomUserDetail) authentication.getPrincipal();

    Club club =
        Club.builder()
            .clubName(body.name())
            .clubDescription(body.description())
            .clubPresidentId(userDetails.getId())
            .build();

    clubRepository.save(club);

    // club 생성자 -> 자동 회장 배정
    User user =
        userRepository
            .findById(userDetails.getId())
            .orElseThrow(() -> new NoSuchElementException("Club not found"));

    UserClubRole userClubRole =
        UserClubRole.builder()
            .club(club)
            .user(user)
            .clubRole(ClubRole.PRESIDENT)
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

    // 카테고리가 기존에 없을 때, Category 새로 생성
    List<String> categoriesFromRequest = body.categories();
    List<Category> newCategories = new ArrayList<>();
    for (String categoryFromRequest : categoriesFromRequest) {
      if (!categoryRepository.existsByName(categoryFromRequest)) {
        Category category = Category.builder().name(categoryFromRequest).build();
        newCategories.add(category);
      }
    }
    categoryRepository.saveAll(newCategories);

    List<ClubCategory> clubCategories = new ArrayList<>();
    List<Category> categories = categoryRepository.findByNameIn(body.categories());
    for (Category category : categories) {
      ClubCategoryId clubCategoryId = new ClubCategoryId(club.getId(), category.getId());
      ClubCategory clubCategory =
          ClubCategory.builder().id(clubCategoryId).club(club).category(category).build();
      clubCategories.add(clubCategory);
    }

    clubCategoryRepository.saveAll(clubCategories);

    return new CreateClubResponse(club.getCreatedAt());
  }

  @Override
  @Transactional
  public List<ClubOverviewResponse> findAllClubsOverview() {
    List<Club> clubs = clubRepository.findAllWithCategories();

    if (clubs.isEmpty()) throw new EntityNotFoundException("Club not found");

    List<ClubOverviewResponse> responses = new ArrayList<>();
    for (Club club : clubs) {
      List<String> categoryNames = findCategoryNames(club);

      ClubOverviewResponse clubOverview =
          ClubOverviewResponse.builder()
              .clubId(club.getId())
              .thumbnailUrl(club.getClubThumbnailImageUrl())
              .categories(categoryNames)
              .build();

      responses.add(clubOverview);
    }

    return responses;
  }

  @Override
  @Transactional
  public ClubResponse findClubById(String clubId) {
    Club club =
        clubRepository
            .findByIdWithCategories(clubId)
            .orElseThrow(() -> new NoSuchElementException("Club not found"));

    List<String> categoryNames = findCategoryNames(club);

    return club.toClubResponse(categoryNames);
  }

  private List<String> findCategoryNames(Club club) {
    List<ClubCategory> clubCategories = club.getClubCategories();

    List<String> categoryNames = new ArrayList<>();
    for (ClubCategory clubCategory : clubCategories) {
      categoryNames.add(clubCategory.getCategory().getName());
    }
    return categoryNames;
  }
}
