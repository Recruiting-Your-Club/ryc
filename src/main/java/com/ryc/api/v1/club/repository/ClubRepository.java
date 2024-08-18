package com.ryc.api.v1.club.repository;

import com.ryc.api.v1.club.domain.Club;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ClubRepository extends JpaRepository<Club, String> {
    boolean existsByClubName(String clubName);

    @Query("SELECT c FROM Club c " +
            "LEFT JOIN FETCH c.clubCategories cc " +
            "LEFT JOIN FETCH cc.category")
    List<Club> findAllWithCategories();
}
