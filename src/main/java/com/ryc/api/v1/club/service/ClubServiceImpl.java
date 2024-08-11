package com.ryc.api.v1.club.service;

import com.ryc.api.v1.club.domain.Category;
import com.ryc.api.v1.club.domain.Club;
import com.ryc.api.v1.club.domain.ClubCategory;
import com.ryc.api.v1.club.domain.ClubCategoryId;
import com.ryc.api.v1.club.dto.CreateClubRequestDto;
import com.ryc.api.v1.club.dto.CreateClubResponseDto;
import com.ryc.api.v1.club.repository.CategoryRepository;
import com.ryc.api.v1.club.repository.ClubCategoryRepository;
import com.ryc.api.v1.club.repository.ClubRepository;
import com.ryc.api.v1.security.dto.CustomUserDetail;
import lombok.RequiredArgsConstructor;
import org.springframework.dao.DuplicateKeyException;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class ClubServiceImpl implements ClubService {
    private final ClubRepository clubRepository;
    private final CategoryRepository categoryRepository;
    private final ClubCategoryRepository clubCategoryRepository;

    @Override
    @Transactional
    public CreateClubResponseDto createClub(CreateClubRequestDto body) {

        if (clubRepository.existsByClubName(body.name())) {
            throw new DuplicateKeyException("This club Already Exist");
        }

        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        CustomUserDetail userDetails = (CustomUserDetail) authentication.getPrincipal();

        Club club = Club.builder()
                .clubName(body.name())
                .clubDescription(body.description())
                .clubPresidentId(userDetails.getId())
                .build();

        clubRepository.save(club);

        //카테고리가 기존에 없을 때, Category 새로 생성
        List<String> categoriesFromRequest = body.categories();
        List<Category> newCategories = new ArrayList<>();
        for (String categoryFromRequest : categoriesFromRequest) {
            if (!categoryRepository.existsByName(categoryFromRequest)) {
                Category category = Category.builder()
                        .name(categoryFromRequest)
                        .build();
                newCategories.add(category);
            }
        }
        categoryRepository.saveAll(newCategories);

        List<ClubCategory> clubCategories = new ArrayList<>();
        List<Category> categories = categoryRepository.findByNameIn(body.categories());
        for (Category category : categories) {
            ClubCategoryId clubCategoryId = new ClubCategoryId(club.getId(), category.getId());
            ClubCategory clubCategory = ClubCategory.builder()
                    .id(clubCategoryId)
                    .club(club)
                    .category(category)
                    .build();
            clubCategories.add(clubCategory);
        }

        clubCategoryRepository.saveAll(clubCategories);

        return new CreateClubResponseDto(club.getCreatedAt());
    }
}
