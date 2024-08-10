package com.ryc.api.v1.club.repository;

import com.ryc.api.v1.club.domain.Category;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CategoryRepository extends JpaRepository<Category,String> {
    Category findByName(String name);
    boolean existsByName(String name);
}
