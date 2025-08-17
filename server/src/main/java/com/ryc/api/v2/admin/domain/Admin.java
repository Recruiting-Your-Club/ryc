package com.ryc.api.v2.admin.domain;

import static com.ryc.api.v2.common.constant.DomainDefaultValues.DEFAULT_INITIAL_ID;

import lombok.Builder;
import lombok.Getter;

@Getter
public class Admin {
  private final String id;
  private final String name;
  private final String email;
  private final String
      password; // password는 Domin과 Entity에서 언제나 암호화 된 상태로 존재한다. (암호화는 반드시 Service에서 진행)
  private final String imageUrl;
  private final String thumbnailUrl;
  private final AdminDefaultRole adminDefaultRole;
  private final Boolean isDeleted;

  @Builder
  private Admin(
      String id,
      String name,
      String email,
      String password,
      String imageUrl,
      String thumbnailUrl,
      AdminDefaultRole adminDefaultRole,
      Boolean isDeleted) {

    AdminValidator.ValidatedAdmin validated =
        AdminValidator.validateAndSanitize(
            id, name, email, password, imageUrl, thumbnailUrl, adminDefaultRole, isDeleted);

    this.id = validated.id();
    this.name = validated.name();
    this.email = validated.email();
    this.password = validated.password();
    this.imageUrl = validated.imageUrl();
    this.thumbnailUrl = validated.thumbnailUrl();
    this.adminDefaultRole = validated.adminDefaultRole();
    this.isDeleted = validated.isDeleted();
  }

  // TODO: 해당 메소드를 사용하는 경우는 register시 클라이언트에게 받은 값을 Domain으로 변환시에만 사용된다. 따라서, 파라미터로 해당 requestDTO 고려
  public static Admin initialize(String name, String email, String password) {
    return Admin.builder()
        .id(DEFAULT_INITIAL_ID)
        .name(name)
        .email(email)
        .password(password)
        // TODO: 관리자 프로필 이미지 입력시점 아직 미정. 회원가입시가 아닌 경우,
        //  imageUrl, thumbnailUrl 초기화 로직 제거 예정
        .imageUrl("MOCK_PROFILE_IMAGE_URL")
        .thumbnailUrl("MOCK_PROFILE_THUMBNAIL_URL")
        .adminDefaultRole(AdminDefaultRole.USER)
        .isDeleted(Boolean.FALSE)
        .build();
  }
}
