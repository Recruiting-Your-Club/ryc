package com.ryc.api.v2.club.presentation;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.BDDMockito.willDoNothing;
import static org.mockito.Mockito.when;
import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.csrf;
import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.user;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.delete;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.put;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import java.util.Collections;
import java.util.UUID;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.ValueSource;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.ryc.api.v2.club.domain.enums.Category;
import com.ryc.api.v2.club.presentation.dto.request.ClubCreateRequest;
import com.ryc.api.v2.club.presentation.dto.request.ClubUpdateRequest;
import com.ryc.api.v2.club.presentation.dto.response.ClubCreateResponse;
import com.ryc.api.v2.club.presentation.dto.response.DetailClubResponse;
import com.ryc.api.v2.club.service.ClubCommandService;
import com.ryc.api.v2.club.service.ClubQueryService;
import com.ryc.api.v2.common.exception.code.CommonErrorCode;
import com.ryc.api.v2.security.dto.CustomUserDetail;
import com.ryc.api.v2.security.jwt.JwtTokenManager;
import com.ryc.api.v2.security.service.CustomUserDetailService;

@WebMvcTest(ClubHttpApi.class)
class ClubHttpApiTest {

  @Autowired MockMvc mockMvc;

  @Autowired ObjectMapper objectMapper;

  @MockBean ClubCommandService clubCommandService;

  @MockBean ClubQueryService clubQueryService;

  @MockBean JwtTokenManager jwtTokenManager;

  @MockBean CustomUserDetailService customUserDetailService;

  @Test
  @DisplayName("동아리를 생성한다.")
  void createClub_success() throws Exception {
    // given
    CustomUserDetail user = createCustomUserDetail();

    ClubCreateRequest clubCreateRequest =
        ClubCreateRequest.builder()
            .name("test-club")
            .category(Category.ACADEMIC.toString())
            .build();

    String newClubId = UUID.randomUUID().toString();
    ClubCreateResponse clubCreateResponse = new ClubCreateResponse(newClubId);
    when(clubCommandService.createClub(any(String.class), any(ClubCreateRequest.class)))
        .thenReturn(clubCreateResponse);

    // when // then
    mockMvc
        .perform(
            post("/api/v2/clubs")
                .with(user(user))
                .with(csrf())
                .content(objectMapper.writeValueAsString(clubCreateRequest))
                .contentType(MediaType.APPLICATION_JSON))
        .andExpect(status().isCreated())
        .andExpect(jsonPath("$.clubId").value(newClubId));
  }

  @DisplayName("동아리 생성 시 유효하지 않은 이름이면 실패한다.")
  @ParameterizedTest
  @ValueSource(strings = {"", "   ", "a", "123456789012345678901234567890123456789012345678901"})
  void createClub_givenInvalidName_throwException(String invalidName) throws Exception {
    // given
    CustomUserDetail user = createCustomUserDetail();

    ClubCreateRequest clubCreateRequest =
        ClubCreateRequest.builder()
            .name(invalidName)
            .category(Category.ACADEMIC.toString())
            .build();

    // when // then
    mockMvc
        .perform(
            post("/api/v2/clubs")
                .with(user(user))
                .with(csrf())
                .content(objectMapper.writeValueAsString(clubCreateRequest))
                .contentType(MediaType.APPLICATION_JSON))
        .andExpect(status().isBadRequest())
        .andExpect(jsonPath("$.errors[0].code").value(CommonErrorCode.INVALID_PARAMETER.name()));
  }

  @Test
  @DisplayName("동아리를 생성할 때 카테고리는 비워둘 수 없다.")
  void createClub_givenBlankCategory_throwException() throws Exception {
    // given
    CustomUserDetail user = createCustomUserDetail();

    ClubCreateRequest clubCreateRequest =
        ClubCreateRequest.builder().name("test-club").category("   ").build();

    // when // then
    mockMvc
        .perform(
            post("/api/v2/clubs")
                .with(user(user))
                .with(csrf())
                .content(objectMapper.writeValueAsString(clubCreateRequest))
                .contentType(MediaType.APPLICATION_JSON))
        .andExpect(status().isBadRequest())
        .andExpect(jsonPath("$.errors[0].code").value(CommonErrorCode.INVALID_PARAMETER.name()))
        .andExpect(jsonPath("$.errors[0].message").value("동아리 카테고리는 비워둘 수 없습니다."));
  }

  @Test
  @DisplayName("동아리를 수정한다.")
  void updateClub_success() throws Exception {
    // given
    CustomUserDetail user = createCustomUserDetail();

    String clubId = UUID.randomUUID().toString();
    ClubUpdateRequest updateRequest =
        ClubUpdateRequest.builder()
            .name("updated club name")
            .shortDescription("updated short desc")
            .detailDescription("updated detail desc")
            .category(Category.ACADEMIC.toString())
            .build();

    DetailClubResponse detailClubResponse =
        DetailClubResponse.builder()
            .id(clubId)
            .name(updateRequest.name())
            .shortDescription(updateRequest.shortDescription())
            .detailDescription(updateRequest.detailDescription())
            .category(Category.ACADEMIC)
            .clubTags(Collections.emptyList())
            .clubSummaries(Collections.emptyList())
            .clubDetailImages(Collections.emptyList())
            .build();

    when(clubCommandService.updateClub(any(String.class), any(ClubUpdateRequest.class)))
        .thenReturn(detailClubResponse);

    // when // then
    mockMvc
        .perform(
            put("/api/v2/clubs/{id}", clubId)
                .with(user(user))
                .with(csrf())
                .content(objectMapper.writeValueAsString(updateRequest))
                .contentType(MediaType.APPLICATION_JSON))
        .andExpect(status().isOk())
        .andExpect(jsonPath("$.id").value(clubId))
        .andExpect(jsonPath("$.name").value(updateRequest.name()))
        .andExpect(jsonPath("$.shortDescription").value(updateRequest.shortDescription()));
  }

  @Test
  @DisplayName("동아리 수정 시 유효하지 않은 ID이면 실패한다.")
  void updateClub_givenInvalidId_throwException() throws Exception {
    // given
    CustomUserDetail user = createCustomUserDetail();

    ClubUpdateRequest updateRequest =
        ClubUpdateRequest.builder()
            .name("updated club name")
            .category(Category.ACADEMIC.toString())
            .build();

    // when // then
    mockMvc
        .perform(
            put("/api/v2/clubs/{id}", "not-uuid")
                .with(user(user))
                .with(csrf())
                .content(objectMapper.writeValueAsString(updateRequest))
                .contentType(MediaType.APPLICATION_JSON))
        .andExpect(status().isBadRequest())
        .andExpect(jsonPath("$.errors[0].code").value(CommonErrorCode.INVALID_PARAMETER.name()))
        .andExpect(jsonPath("$.errors[0].message").value("동아리 아이디는 UUID 포멧이어야 합니다."));
  }

  @DisplayName("동아리 수정 시 본문의 이름이 유효하지 않으면 실패한다.")
  @ParameterizedTest
  @ValueSource(strings = {"", "   ", "a", "123456789012345678901234567890123456789012345678901"})
  void updateClub_givenInvalidName_throwException(String invalidName) throws Exception {
    // given
    CustomUserDetail user = createCustomUserDetail();

    String clubId = UUID.randomUUID().toString();
    ClubUpdateRequest updateRequest =
        ClubUpdateRequest.builder()
            .name(invalidName)
            .category(Category.ACADEMIC.toString())
            .build();

    // when // then
    mockMvc
        .perform(
            put("/api/v2/clubs/{id}", clubId)
                .with(user(user))
                .with(csrf())
                .content(objectMapper.writeValueAsString(updateRequest))
                .contentType(MediaType.APPLICATION_JSON))
        .andExpect(status().isBadRequest())
        .andExpect(jsonPath("$.errors[0].code").value(CommonErrorCode.INVALID_PARAMETER.name()));
  }

  @Test
  @DisplayName("동아리를 삭제한다.")
  void deleteClub_success() throws Exception {
    // given
    CustomUserDetail user = createCustomUserDetail();
    String clubId = UUID.randomUUID().toString();

    willDoNothing().given(clubCommandService).deleteClub(clubId);

    // when // then
    mockMvc
        .perform(delete("/api/v2/clubs/{id}", clubId).with(user(user)).with(csrf()))
        .andExpect(status().isNoContent());
  }

  @Test
  @DisplayName("동아리 삭제 시 유효하지 않은 ID이면 실패한다.")
  void deleteClub_givenInvalidId_throwException() throws Exception {
    // given
    CustomUserDetail user = createCustomUserDetail();

    // when // then
    mockMvc
        .perform(delete("/api/v2/clubs/{id}", "not-uuid").with(user(user)).with(csrf()))
        .andExpect(status().isBadRequest())
        .andExpect(jsonPath("$.errors[0].code").value(CommonErrorCode.INVALID_PARAMETER.name()))
        .andExpect(jsonPath("$.errors[0].message").value("동아리 아이디는 UUID 포멧이어야 합니다."));
  }

  CustomUserDetail createCustomUserDetail() {
    String userId = UUID.randomUUID().toString();
    return new CustomUserDetail(
        userId, "testuser", "test@email.com", "password", Collections.emptyList());
  }
}
