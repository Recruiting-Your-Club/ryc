package com.ryc.api.v2.club.domain;

import java.util.List;

public interface ClubRepository {
  Club save(Club club);

  Club findById(String id);

  List<Club> findAll();
}
