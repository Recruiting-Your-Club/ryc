package com.ryc.api.v2.admin.domain;

import static com.ryc.api.v2.common.constant.DomainDefaultValues.DEFAULT_INITIAL_ID;

import com.ryc.api.v2.util.DataResolveUtil;

import lombok.Builder;
import lombok.EqualsAndHashCode;
import lombok.Getter;

@Getter
@EqualsAndHashCode
public class Admin {
  private final String id;
  private final String name;
  private final String email;
  private final String
      password; // password는 Domin과 Entity에서 언제나 암호화 된 상태로 존재한다. (암호화는 반드시 Service에서 진행)
  private final AdminDefaultRole adminDefaultRole;
  private final Boolean isDeleted;

  @Builder
  private Admin(
      String id,
      String name,
      String email,
      String password,
      AdminDefaultRole adminDefaultRole,
      Boolean isDeleted) {

    // 1. 정제
    String sanitizeName = DataResolveUtil.sanitizeString(name);
    String sanitizeEmail = DataResolveUtil.sanitizeEmail(email);

    // 2. 기본값 처리
    AdminDefaultRole resolvedAdminDefaultRole =
        adminDefaultRole != null ? adminDefaultRole : AdminDefaultRole.USER;
    Boolean resolvedIsDeleted = isDeleted != null ? isDeleted : Boolean.FALSE;

    // 3. 검증
    AdminValidator.validate(
        id, sanitizeName, sanitizeEmail, password, resolvedAdminDefaultRole, resolvedIsDeleted);

    // 4. 할당
    this.id = id;
    this.name = sanitizeName;
    this.email = sanitizeEmail;
    this.password = password;
    this.adminDefaultRole = resolvedAdminDefaultRole;
    this.isDeleted = resolvedIsDeleted;
  }

  // TODO: 해당 메소드를 사용하는 경우는 register시 클라이언트에게 받은 값을 Domain으로 변환시에만 사용된다. 따라서, 파라미터로 해당 requestDTO 고려
  public static Admin initialize(String name, String email, String password) {
    return Admin.builder()
        .id(DEFAULT_INITIAL_ID)
        .name(name)
        .email(email)
        .password(password)
        .adminDefaultRole(AdminDefaultRole.USER)
        .isDeleted(Boolean.FALSE)
        .build();
  }
}
