package com.ryc.api.v2.club.domain;

import java.util.List;
import java.util.Optional;

import com.ryc.api.v2.auth.domain.Admin;

public interface ClubRepository {
  Club save(Club club);

  Optional<Club> findById(String id);

  boolean existsByName(String name);

  List<Club> findAll();

  Role assignOwner(Club club, Admin admin);
}
