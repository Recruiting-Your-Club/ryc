package com.ryc.api.v2.club.domain;

import java.util.List;
import java.util.Optional;

public interface ClubRepository {
  Club save(Club club);

  Optional<Club> findById(String id);
}
