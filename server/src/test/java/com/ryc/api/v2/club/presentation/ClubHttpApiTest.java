package com.ryc.api.v2.club.presentation;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;
import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.csrf;
import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.user;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import java.util.Collections;
import java.util.UUID;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.CsvSource;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.ryc.api.v2.club.domain.enums.Category;
import com.ryc.api.v2.club.presentation.dto.request.ClubCreateRequest;
import com.ryc.api.v2.club.presentation.dto.response.ClubCreateResponse;
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
  void createClub_givenClubCreateRequest_returnCreated() throws Exception {
    // given
    ClubCreateRequest clubCreateRequest =
        ClubCreateRequest.builder()
            .name("test-club")
            .category(Category.ACADEMIC.toString())
            .build();

    CustomUserDetail user = creteCustomUserDetail();

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
  @CsvSource(
      value = {
        "'', '동아리 이름은 비워둘 수 없습니다.'",
        "'  ', '동아리 이름은 비워둘 수 없습니다.'",
        "a, '동아리 이름은 2자 이상, 50자 이하여야 합니다.'",
        "123456789012345678901234567890123456789012345678901, '동아리 이름은 2자 이상, 50자 이하여야 합니다.'"
      })
  void createClub_givenInvalidName_throwException(String invalidName, String expectedMessage)
      throws Exception {
    // given
    ClubCreateRequest clubCreateRequest =
        ClubCreateRequest.builder()
            .name(invalidName)
            .category(Category.ACADEMIC.toString())
            .build();

    CustomUserDetail user = creteCustomUserDetail();

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
        .andExpect(jsonPath("$.errors[0].message").value(expectedMessage));
  }

  @Test
  @DisplayName("동아리를 생성할 때 카테고리는 비워둘 수 없다.")
  void createClub_givenBlankCategory_throwException() throws Exception {
    // given
    ClubCreateRequest clubCreateRequest =
        ClubCreateRequest.builder().name("test-club").category("   ").build();

    CustomUserDetail user = creteCustomUserDetail();

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

  CustomUserDetail creteCustomUserDetail() {
    String userId = UUID.randomUUID().toString();
    return new CustomUserDetail(
        userId, "testuser", "test@email.com", "password", Collections.emptyList());
  }
}
