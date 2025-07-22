package com.ryc.api.v2.admin.domain;

import static com.ryc.api.v2.common.constant.DomainDefaultValues.DEFAULT_INITIAL_ID;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class Admin {
  private final String id;
  private final String name;
  private final String email;
  private final String
      password; // password는 Domin과 Entity에서 언제나 암호화 된 상태로 존재한다.(암호화와 복호화는 반드시 service 로직에서 진행)
  private final String imageUrl;
  private final String thumbnailUrl;

  @Builder.Default private final AdminDefaultRole adminDefaultRole = AdminDefaultRole.USER;

  @Builder.Default private final Boolean deleted = Boolean.FALSE;

  // TODO: 해당 메소드를 사용하는 경우는 register시 클라이언트에게 받은 값을 Domain으로 변환시에만 사용된다. 따라서, 파라미터로 해당 requestDTO 고려
  public static Admin initialize(String name, String email, String password) {
    return Admin.builder()
        .id(DEFAULT_INITIAL_ID)
        .name(name)
        .email(email)
        .password(password)
        .adminDefaultRole(AdminDefaultRole.USER)
        .deleted(Boolean.FALSE)
        .build();
  }
}
