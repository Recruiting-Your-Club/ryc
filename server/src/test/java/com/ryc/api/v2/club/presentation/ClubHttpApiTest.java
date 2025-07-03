package com.ryc.api.v2.club.presentation;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;
import static org.springframework.test.web.servlet.setup.MockMvcBuilders.standaloneSetup;

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

import com.fasterxml.jackson.databind.ObjectMapper;
import com.ryc.api.v2.club.service.ClubAnnouncementFacade;
import com.ryc.api.v2.club.service.ClubService;
import com.ryc.api.v2.club.domain.enums.Category;
import com.ryc.api.v2.club.domain.vo.ClubTag;
import com.ryc.api.v2.club.presentation.dto.request.ClubCreateRequest;
import com.ryc.api.v2.club.presentation.dto.response.AllClubGetResponse;
import com.ryc.api.v2.club.presentation.dto.response.ClubCreateResponse;
import com.ryc.api.v2.club.presentation.dto.response.ClubGetResponse;

@ExtendWith(MockitoExtension.class)
class ClubHttpApiTest {

  @Mock private ClubService clubService;
  @Mock private ClubAnnouncementFacade clubAnnouncementFacade;
  @InjectMocks private ClubHttpApi clubHttpApi;

  private MockMvc mockMvc;
  private ObjectMapper objectMapper;
  private List<ClubTag> testTags;
  private String clubId;

  @BeforeEach
  void setUp() {
    mockMvc = standaloneSetup(clubHttpApi).build();
    objectMapper =
        new ObjectMapper().registerModule(new com.fasterxml.jackson.datatype.jdk8.Jdk8Module());

    clubId = "test-id";
    testTags =
        List.of(ClubTag.builder().name("Tag1").build(), ClubTag.builder().name("Tag2").build());
  }

  @Test
  @DisplayName("클럽 생성 API 테스트")
  void givenValidClubCreateRequest_whenCreateClub_thenReturnCreatedResponse() throws Exception {
    // Given
    ClubCreateRequest createRequest =
        ClubCreateRequest.builder()
            .name("Test Club")
            .category(Category.ACADEMIC)
            .imageUrl("http://example.com/image.jpg")
            .build();
    ClubCreateResponse createResponse = ClubCreateResponse.builder().clubId("test-id").build();

    when(clubService.createClub(any(ClubCreateRequest.class))).thenReturn(createResponse);

    // When & Then
    mockMvc
        .perform(
            post("/api/v2/clubs")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(createRequest)))
        .andExpect(status().isCreated())
        .andExpect(jsonPath("$.clubId").value("test-id"));
  }

  @Test
  @DisplayName("ID로 클럽 조회 API 테스트")
  void givenExistingClubId_whenGetClub_thenReturnGetResponse() throws Exception {
    // Given
    ClubGetResponse getResponse =
        ClubGetResponse.builder()
            .name("Test Club")
            .detailDescription("Detailed description")
            .imageUrl("http://example.com/image.jpg")
            .thumbnailUrl("http://example.com/thumbnail.jpg")
            .category(Category.ACADEMIC)
            .clubTags(testTags)
            .clubSummaries(List.of())
            .clubDetailImages(List.of())
            .build();

    when(clubService.getClub(clubId)).thenReturn(getResponse);

    // When & Then
    mockMvc
        .perform(get("/api/v2/clubs/{id}", clubId))
        .andExpect(status().isOk())
        .andExpect(jsonPath("$.name").value("Test Club"))
        .andExpect(jsonPath("$.detailDescription").value("Detailed description"))
        .andExpect(jsonPath("$.imageUrl").value("http://example.com/image.jpg"))
        .andExpect(jsonPath("$.thumbnailUrl").value("http://example.com/thumbnail.jpg"))
        .andExpect(jsonPath("$.category").value("ACADEMIC"))
        .andExpect(jsonPath("$.clubTags[0].name").value("Tag1"))
        .andExpect(jsonPath("$.clubTags[1].name").value("Tag2"));
  }

  @Test
  @DisplayName("모든 클럽 조회 API 테스트")
  void givenMultipleClubExist_whenGetAllClubs_thenReturnAllClubsList() throws Exception {
    // Given
    List<AllClubGetResponse> allClubResponses =
        List.of(
            AllClubGetResponse.builder()
                .id("test-id")
                .name("Test Club")
                .shortDescription("Short description")
                .imageUrl("http://example.com/image.jpg")
                .thumbnailUrl("http://example.com/thumbnail.jpg")
                .category(Category.ACADEMIC)
                .clubTags(testTags)
                .build());

    when(clubAnnouncementFacade.getAllClubWithAnnouncementStatus()).thenReturn(allClubResponses);

    // When & Then
    mockMvc
        .perform(get("/api/v2/clubs"))
        .andExpect(status().isOk())
        .andExpect(jsonPath("$[0].id").value("test-id"))
        .andExpect(jsonPath("$[0].name").value("Test Club"))
        .andExpect(jsonPath("$[0].shortDescription").value("Short description"))
        .andExpect(jsonPath("$[0].imageUrl").value("http://example.com/image.jpg"))
        .andExpect(jsonPath("$[0].thumbnailUrl").value("http://example.com/thumbnail.jpg"))
        .andExpect(jsonPath("$[0].category").value("ACADEMIC"))
        .andExpect(jsonPath("$[0].clubTags[0].name").value("Tag1"))
        .andExpect(jsonPath("$[0].clubTags[1].name").value("Tag2"));
  }

  //  @Test
  //  @DisplayName("클럽 업데이트 API 테스트")
  //  void givenValidClubUpdateRequest_whenUpdateClub_thenReturnUpdatedClubs() throws Exception {
  //    // Given
  //    ClubUpdateRequest updateRequest =
  //        ClubUpdateRequest.builder()
  //            .name(Optional.of("Updated Club"))
  //            .shortDescription(Optional.of("Short description"))
  //            .detailDescription(Optional.of("Detailed description"))
  //            .imageUrl(Optional.of("http://example.com/image.jpg"))
  //            .thumbnailUrl(Optional.of("http://example.com/thumbnail.jpg"))
  //            .category(Optional.of(Category.ACADEMIC.toString()))
  //            .clubTags(testTags)
  //            .clubSummaries(List.of())
  //            .clubDetailImages(List.of())
  //            .build();
  //
  //    ClubUpdateResponse updateResponse =
  //        ClubUpdateResponse.builder()
  //            .name("Updated Club")
  //            .shortDescription("Short description")
  //            .detailDescription("Detailed description")
  //            .imageUrl("http://example.com/image.jpg")
  //            .thumbnailUrl("http://example.com/thumbnail.jpg")
  //            .category(Category.ACADEMIC)
  //            .clubTags(testTags)
  //            .clubSummaries(List.of())
  //            .clubDetailImages(List.of())
  //            .build();
  //
  //        when(clubService.updateClub(any(), eq(clubId), any(ClubUpdateRequest.class)))
  //            .thenReturn(updateResponse);
  //
  //    // When & Then
  //    mockMvc
  //        .perform(
  //            patch("/api/v2/clubs/{id}", clubId)
  //                .contentType(MediaType.APPLICATION_JSON)
  //                .content(objectMapper.writeValueAsString(updateRequest)))
  //        .andExpect(status().isOk())
  //        .andExpect(jsonPath("$.name").value("Updated Club"))
  //        .andExpect(jsonPath("$.shortDescription").value("Short description"))
  //        .andExpect(jsonPath("$.detailDescription").value("Detailed description"))
  //        .andExpect(jsonPath("$.imageUrl").value("http://example.com/image.jpg"))
  //        .andExpect(jsonPath("$.thumbnailUrl").value("http://example.com/thumbnail.jpg"))
  //        .andExpect(jsonPath("$.category").value("ACADEMIC"))
  //        .andExpect(jsonPath("$.clubTags[0].name").value("Tag1"))
  //        .andExpect(jsonPath("$.clubTags[1].name").value("Tag2"));
  //  }
}
