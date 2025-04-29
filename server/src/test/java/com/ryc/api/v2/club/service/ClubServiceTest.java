package com.ryc.api.v2.club.service;

import static org.assertj.core.api.AssertionsForInterfaceTypes.assertThat;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;

import java.util.List;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import com.ryc.api.v2.club.domain.Category;
import com.ryc.api.v2.club.domain.Club;
import com.ryc.api.v2.club.domain.ClubRepository;
import com.ryc.api.v2.club.presentation.dto.request.ClubCreateRequest;
import com.ryc.api.v2.club.presentation.dto.response.ClubCreateResponse;

@ExtendWith(MockitoExtension.class)
class ClubServiceTest {

  @InjectMocks private ClubService clubService;

  @Mock private ClubRepository clubRepository;

  @Test
  @DisplayName("정상적인 요청일 경우 동아리를 생성하고 clubId를 반환한다.")
  void createClub() {
    // given
    ClubCreateRequest body =
        ClubCreateRequest.builder()
            .name("test")
            .description("테스트입니다.")
            .category(Category.ACADEMIC)
            .tagNames(List.of("test"))
            .build();
    Club response = Club.initialize(body, "MOCK_URL", "MOCK_URL", List.of());

    when(clubRepository.save(any())).thenReturn(response);

    // when
    ClubCreateResponse result = clubService.createClub(body);

    // then
    assertThat(result.clubId()).isEqualTo(response.getId());
  }
}
