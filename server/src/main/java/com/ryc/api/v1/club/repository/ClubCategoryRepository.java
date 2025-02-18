package com.ryc.api.v1.club.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.ryc.api.v1.club.domain.ClubCategory;
import com.ryc.api.v1.club.domain.ClubCategoryId;

@Repository
public interface ClubCategoryRepository extends JpaRepository<ClubCategory, ClubCategoryId> {}
