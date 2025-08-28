package com.ryc.api.v2.role.domain;

import static com.ryc.api.v2.common.exception.code.InvalidFormatErrorCode.*;

import java.time.LocalDateTime;
import java.util.regex.Pattern;

import com.ryc.api.v2.admin.domain.Admin;
import com.ryc.api.v2.club.domain.Club;
import com.ryc.api.v2.common.validator.DomainValidator;
import com.ryc.api.v2.role.domain.enums.Role;

final class ClubRoleValidator extends DomainValidator {

  private ClubRoleValidator() {}

  private static final Pattern UUID_PATTERN =
      Pattern.compile(
          "^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$");

  static void validate(String id, Role role, Club club, Admin admin, LocalDateTime joinedAt) {

    validateId(id);
    validateRole(role);
    validateClub(club);
    validateAdmin(admin);
    validateJoinedAt(id, joinedAt);
  }

  private static void validateId(String id) {
    validateNotNullOrEmpty(id, CLUB_ROLE_ID_NULL_OR_EMPTY);
    validatePattern(id, UUID_PATTERN, CLUB_ROLE_INVALID_ID_FORMAT);
  }

  private static void validateRole(Role role) {
    validateNotNull(role, CLUB_ROLE_ROLE_NULL);
  }

  private static void validateClub(Club club) {
    validateNotNull(club, CLUB_ROLE_CLUB_NULL);
  }

  private static void validateAdmin(Admin admin) {
    validateNotNull(admin, CLUB_ROLE_ADMIN_NULL);
  }

  private static void validateJoinedAt(String id, LocalDateTime joinedAt) {}
}
