package com.ryc.api.v2.club.presentation;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import java.util.List;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.ResultActions;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.ryc.api.v2.club.domain.Category;
import com.ryc.api.v2.club.presentation.dto.request.ClubCreateRequest;
import com.ryc.api.v2.club.presentation.dto.response.ClubCreateResponse;
import com.ryc.api.v2.club.service.ClubService;
import com.ryc.api.v2.common.exception.GlobalExceptionHandler;

@ExtendWith(MockitoExtension.class)
class ClubHttpApiTest {

  @InjectMocks private ClubHttpApi clubHttpApi;

  @Mock private ClubService clubService;

  private MockMvc mockMvc;

  private final ObjectMapper objectMapper = new ObjectMapper();

  @BeforeEach
  void init() {
    mockMvc =
        MockMvcBuilders.standaloneSetup(clubHttpApi)
            .setControllerAdvice(new GlobalExceptionHandler())
            .build();
  }

  @Test
  @DisplayName("정상적인 동아리 생성 요청 시 201 Created와 clubId를 반환한다.")
  void createClub() throws Exception {
    // given
    ClubCreateRequest request =
        ClubCreateRequest.builder()
            .name("test")
            .shortDescription("테스트입니다.")
            .category(Category.ACADEMIC)
            .tagNames(List.of("test"))
            .build();
    ClubCreateResponse response = ClubCreateResponse.builder().clubId("test").build();

    when(clubService.createClub(any(ClubCreateRequest.class))).thenReturn(response);

    // when
    ResultActions result =
        mockMvc.perform(
            post("/api/v2/club/")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(request)));

    // then
    result.andExpect(status().isCreated()).andExpect(jsonPath("$.clubId").value(response.clubId()));
  }

  @Test
  @DisplayName("동아리 생성 요청이 유효하지 않으면 400 BAD REQUEST 응답을 반환한다.")
  void createClubInvalidRequest() throws Exception {
    // given
    ClubCreateRequest request =
        ClubCreateRequest.builder()
            .name(" ")
            .shortDescription(" ")
            .category(null)
            .tagNames(List.of())
            .build();

    // when
    ResultActions result =
        mockMvc.perform(
            post("/api/v2/club/")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(request)));

    // then
    result
        .andExpect(status().isBadRequest())
        .andExpect(jsonPath("$.code").value("INVALID_PARAMETER"))
        .andExpect(jsonPath("$.errors").isArray());
  }
}
