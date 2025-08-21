package com.ryc.api.v2.club.domain;

import java.util.List;

/*
 * ClubEntity는 Soft Delete를 지원합니다.
 * ClubEntity를 조회할 때는 항상 isDeleted가 false인 것만 조회합니다.
 * ClubEntity를 삭제할 때는 isDeleted를 true로 변경합니다.
 */
public interface ClubRepository {
  Club save(Club club);

  Club findById(String id);

  boolean existsByName(String name);

  List<Club> findAll();

  boolean existsById(String clubId);

  void deleteById(String clubId);
}
