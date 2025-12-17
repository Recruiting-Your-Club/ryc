package com.ryc.api.v2.club.service;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyList;
import static org.mockito.Mockito.when;

import java.util.List;
import java.util.Map;
import java.util.UUID;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import com.ryc.api.v2.announcement.domain.enums.AnnouncementStatus;
import com.ryc.api.v2.announcement.service.AnnouncementService;
import com.ryc.api.v2.club.domain.Club;
import com.ryc.api.v2.club.domain.ClubRepository;
import com.ryc.api.v2.club.domain.enums.Category;
import com.ryc.api.v2.club.presentation.dto.response.DetailClubResponse;
import com.ryc.api.v2.club.presentation.dto.response.MyClubGetResponse;
import com.ryc.api.v2.club.presentation.dto.response.SimpleClubResponse;
import com.ryc.api.v2.club.service.dto.MyClubDTO;
import com.ryc.api.v2.file.domain.FileDomainType;
import com.ryc.api.v2.file.domain.FileMetaData;
import com.ryc.api.v2.file.domain.FileStatus;
import com.ryc.api.v2.file.service.FileService;
import com.ryc.api.v2.role.domain.enums.Role;
import com.ryc.api.v2.role.service.ClubRoleService;

@ExtendWith(MockitoExtension.class)
class ClubQueryServiceTest {

  @InjectMocks ClubQueryService clubQueryService;

  @Mock ClubRepository clubRepository;

  @Mock FileService fileService;

  @Mock ClubRoleService clubRoleService;

  @Mock AnnouncementService announcementService;

  @Test
  @DisplayName("모든 동아리를 공고 상태와 함께 조회한다.")
  void getAllClubWithAnnouncementStatus_success() {
    // given
    Club club1 = createClub("club1", Category.ACADEMIC);
    Club club2 = createClub("club2", Category.SPORTS);
    List<Club> clubs = List.of(club1, club2);
    List<String> clubIds = clubs.stream().map(Club::getId).toList();

    FileMetaData fileMetaData =
        createFileMetaData(club1.getId(), FileDomainType.CLUB_PROFILE, "http://image.url/1");

    when(clubRepository.findAll()).thenReturn(clubs);
    when(announcementService.getStatusesByClubIds(clubIds))
        .thenReturn(
            Map.of(
                club1.getId(),
                AnnouncementStatus.RECRUITING,
                club2.getId(),
                AnnouncementStatus.CLOSED));
    when(fileService.findAllByAssociatedIdIn(clubIds)).thenReturn(List.of(fileMetaData));
    when(fileService.getPublicFileGetUrl(any(FileMetaData.class))).thenReturn("http://image.url/1");

    // when
    List<SimpleClubResponse> responses = clubQueryService.getAllClubWithAnnouncementStatus();

    // then
    assertThat(responses).hasSize(2);
    SimpleClubResponse response1 =
        responses.stream().filter(r -> r.id().equals(club1.getId())).findFirst().orElseThrow();
    assertThat(response1.announcementStatus()).isEqualTo(AnnouncementStatus.RECRUITING);
    assertThat(response1.representativeImage()).isNotNull();
    assertThat(response1.representativeImage().url()).isEqualTo("http://image.url/1");
  }

  @Test
  @DisplayName("동아리 ID로 상세 정보를 조회한다.")
  void getClub_success() {
    // given
    Club club = createClub("test-club", Category.CULTURE);
    String clubId = club.getId();
    FileMetaData profileImage =
        createFileMetaData(clubId, FileDomainType.CLUB_PROFILE, "http://profile.url");
    FileMetaData detailImage =
        createFileMetaData(clubId, FileDomainType.CLUB_IMAGE, "http://detail.url");

    when(clubRepository.findById(clubId)).thenReturn(club);
    when(fileService.findAllByAssociatedId(clubId)).thenReturn(List.of(profileImage, detailImage));
    when(fileService.getPublicFileGetUrl(any(FileMetaData.class)))
        .thenAnswer(
            invocation -> {
              FileMetaData meta = invocation.getArgument(0);
              return meta.getFilePath();
            });

    // when
    DetailClubResponse response = clubQueryService.getClub(clubId);

    // then
    assertThat(response.id()).isEqualTo(clubId);
    assertThat(response.name()).isEqualTo(club.getName());
    assertThat(response.representativeImage().url()).isEqualTo("http://profile.url");
    assertThat(response.clubDetailImages()).hasSize(1);
    assertThat(response.clubDetailImages().get(0).url()).isEqualTo("http://detail.url");
  }

  @Test
  @DisplayName("사용자가 속한 동아리들을 조회한다.")
  void getMyClubs_success() {
    // given
    String adminId = UUID.randomUUID().toString();
    Club club = createClub("my-club", Category.VOLUNTEER);
    MyClubDTO myClubDTO = new MyClubDTO(club, Role.MEMBER);

    FileMetaData profileImage =
        createFileMetaData(club.getId(), FileDomainType.CLUB_PROFILE, "http://myclub.url");

    when(clubRoleService.getMyClubs(adminId)).thenReturn(List.of(myClubDTO));
    when(fileService.findAllByAssociatedIdIn(anyList())).thenReturn(List.of(profileImage));
    when(fileService.getPublicFileGetUrl(profileImage)).thenReturn("http://myclub.url");

    // when
    List<MyClubGetResponse> responses = clubQueryService.getMyClubs(adminId);

    // then
    assertThat(responses).hasSize(1);
    MyClubGetResponse response = responses.get(0);
    assertThat(response.myRole()).isEqualTo(Role.MEMBER);
    assertThat(response.myClubResponse().id()).isEqualTo(club.getId());
    assertThat(response.myClubResponse().representativeImage().url())
        .isEqualTo("http://myclub.url");
  }

  @Test
  @DisplayName("초대 코드로 동아리를 조회한다.")
  void getClubByInviteCode_success() {
    // given
    String inviteCode = UUID.randomUUID().toString();
    Club club = createClub("invited-club", Category.RELIGION);
    FileMetaData profileImage =
        createFileMetaData(club.getId(), FileDomainType.CLUB_PROFILE, "http://invited.url");

    when(clubRoleService.getClubByInviteCode(inviteCode)).thenReturn(club);
    when(fileService.findAllByAssociatedId(club.getId())).thenReturn(List.of(profileImage));
    when(fileService.getPublicFileGetUrl(profileImage)).thenReturn("http://invited.url");

    // when
    SimpleClubResponse response = clubQueryService.getClubByInviteCode(inviteCode);

    // then
    assertThat(response.id()).isEqualTo(club.getId());
    assertThat(response.name()).isEqualTo(club.getName());
    assertThat(response.representativeImage().url()).isEqualTo("http://invited.url");
  }

  private Club createClub(String name, Category category) {
    return Club.builder()
        .id(UUID.randomUUID().toString())
        .name(name)
        .category(category)
        .clubTags(List.of())
        .clubSummaries(List.of())
        .build();
  }

  private FileMetaData createFileMetaData(
      String associatedId, FileDomainType domainType, String url) {
    return FileMetaData.builder()
        .id(UUID.randomUUID().toString())
        .associatedId(associatedId)
        .fileDomainType(domainType)
        .filePath(url)
        .originalFileName("test.jpg")
        .contentType("image/jpeg")
        .status(FileStatus.UPLOAD_COMPLETED)
        .build();
  }
}
