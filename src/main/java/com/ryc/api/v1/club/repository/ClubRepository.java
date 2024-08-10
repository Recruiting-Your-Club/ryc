package com.ryc.api.v1.club.repository;

import com.ryc.api.v1.club.domain.Club;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ClubRepository extends JpaRepository<Club, String> {
    boolean existsByClubName(String clubName);
}
