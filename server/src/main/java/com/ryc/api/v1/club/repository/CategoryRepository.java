package com.ryc.api.v1.club.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.ryc.api.v1.club.domain.Category;

@Repository
public interface CategoryRepository extends JpaRepository<Category, String> {
  List<Category> findByNameIn(List<String> categoryNames);

  boolean existsByName(String name);
}
