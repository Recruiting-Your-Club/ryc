package com.ryc.api.v1.club.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.ryc.api.v1.club.domain.Club;

@Repository
public interface ClubRepository extends JpaRepository<Club, String> {
  boolean existsByClubName(String clubName);

  @Query(
      "SELECT c FROM Club c "
          + "LEFT JOIN FETCH c.clubCategories cc "
          + "LEFT JOIN FETCH cc.category")
  List<Club> findAllWithCategories();

  @Query(
      "SELECT c FROM Club c "
          + "LEFT JOIN FETCH c.clubCategories cc "
          + "LEFT JOIN FETCH cc.category "
          + "WHERE c.id = :clubId")
  Optional<Club> findByIdWithCategories(@Param("clubId") String clubId);
}
