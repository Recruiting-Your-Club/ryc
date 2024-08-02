package com.ryc.api.v1.club.repository;

import com.ryc.api.v1.club.domain.ClubCategory;
import com.ryc.api.v1.club.domain.ClubCategoryId;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ClubCategoryRepository extends JpaRepository<ClubCategory, ClubCategoryId> {
}
